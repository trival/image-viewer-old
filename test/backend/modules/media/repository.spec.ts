import { Connection } from 'typeorm'
import { createMediaDBRepository } from '@/backend/modules/media/repository'
import {
	IMediaEntity,
	EMediaType,
	mediaDefaultValues,
} from '@/backend/modules/media/entities/media'
import {
	createLibraryDBRepository,
	ILibraryRepository,
} from '@/backend/modules/libraries/repository'
import { ILibraryEntity } from '@/backend/modules/libraries/entities/library'
import { createAlbumDBRepository } from '@/backend/modules/albums/repository'
import { testConnection } from 'test/fixtures/basic'

const libId = 'lib_id'
const libRootPath = '/home'
const defaultDirectory = '/foo/bar'
const defaultFileName = 'img.png'

function createFullPath(
	fileName = defaultFileName,
	directory = defaultDirectory,
	rootPath = libRootPath,
) {
	return rootPath + directory + '/' + fileName
}

function createTestMedia(
	id: string,
	props: Partial<IMediaEntity & { filename: string }> = {},
): IMediaEntity {
	const {
		type = EMediaType.IMAGE,
		libraryId = libId,
		directory = defaultDirectory,
		filename = defaultFileName,
		fullPath: defaultFullPath,
	} = props
	const fullPath =
		defaultFullPath ?? createFullPath(filename, directory, libRootPath)
	return {
		...mediaDefaultValues,
		id,
		type,
		directory,
		fullPath,
		libraryId,
	}
}

describe('backend/modules/media/repository', () => {
	let conn: Connection
	let lib: ILibraryEntity
	let libRepo: ILibraryRepository

	beforeEach(async () => {
		conn = await testConnection()
		libRepo = createLibraryDBRepository(conn)
		lib = await libRepo.saveLibrary({
			id: libId,
			ignorePaths: [],
			rootPath: '/home',
			name: 'test lib',
		})
	})

	afterEach(async () => {
		await conn.close()
	})

	it('crud media', async () => {
		const repo = createMediaDBRepository(conn)

		const media1 = createTestMedia('media1')
		const media2 = createTestMedia('media2', { filename: 'img2.png' })

		let items = await repo.getMediaOfLibrary(libId)
		expect(items).toEqual([])

		const saved = await repo.saveMedia([media1, media2])
		expect(saved).toMatchObject([media1, media2])

		items = await repo.getMediaOfLibrary(libId)
		expect(items).toMatchObject([media1, media2])

		const newThumb = { thumbPath: '/thumbs/thumb1.png' }

		await repo.saveMedia([{ ...media1, ...newThumb }])

		items = await repo.getMediaOfLibrary(libId)
		expect(items).toMatchObject([{ ...media1, ...newThumb }, media2])

		await repo.deleteMedia([media1.id, media2.id])

		items = await repo.getMediaOfLibrary(libId)
		expect(items).toEqual([])
	})

	it('handles albums', async () => {
		const repo = createMediaDBRepository(conn)
		const albumRepo = createAlbumDBRepository(conn)
		const albumId1 = 'foo'
		const albumId2 = 'bar'
		await albumRepo.saveAlbum({ id: albumId1, name: 'Foo', color: '' })
		await albumRepo.saveAlbum({ id: albumId2, name: 'Bar', color: '' })

		const m1 = createTestMedia('media1')
		const m2 = createTestMedia('media2', { filename: 'img2.png' })
		await repo.saveMedia([m1, m2])

		const m1_1 = await repo.getMediaById(m1.id)
		expect(m1_1.albums).toEqual([])

		const [m1_2] = await repo.addMediaToAlbum([m1.id], albumId1)
		const [m1_3, m2_1] = await repo.addMediaToAlbum([m1.id, m2.id], albumId2)

		expect(m1_2.albums).toEqual([albumId1])
		expect(m1_3.albums).toEqual([albumId1, albumId2])
		expect(m2_1.albums).toEqual([albumId2])

		const m1_4 = await repo.getMediaById(m1.id)
		expect(m1_4.albums).toEqual([albumId1, albumId2])

		const [m1_5, m2_2] = await repo.getMediaOfLibrary(libId)
		expect(m1_5.albums).toEqual([albumId2, albumId1])
		expect(m2_2.albums).toEqual([albumId2])

		const [m1_6, m2_3] = await repo.getMediaOfAlbum(albumId2)
		expect(m1_6.id).toEqual(m1.id)
		expect(m2_3.id).toEqual(m2.id)
		expect(m1_6.albums).toEqual([albumId1, albumId2])
		expect(m2_3.albums).toEqual([albumId2])

		const [m1_7] = await repo.removeMediaFromAlbum([m1.id], albumId2)
		expect(m1_7.albums).toEqual([albumId1])

		const m1_8 = await repo.getMediaById(m1.id)
		expect(m1_8.albums).toEqual([albumId1])
	})
})

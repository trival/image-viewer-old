import { Connection } from 'typeorm'
import { testConnection } from 'test/db/fixtures'
import { createMediaDBRepository } from '@/backend/modules/media/repository'
import {
	IMediaEntity,
	EMediaType,
} from '@/backend/modules/media/entities/media'
import {
	createLibraryDBRepository,
	ILibraryRepository,
} from '@/backend/modules/libraries/repository'
import { ILibraryEntity } from '@/backend/modules/libraries/entities/library'

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

		await repo.saveMedia([media1, media2])

		items = await repo.getMediaOfLibrary(libId)
		expect(items).toEqual([media1, media2])

		const newThumb = { thumbPath: '/thumbs/thumb1.png' }

		await repo.saveMedia([{ ...media1, ...newThumb }])

		items = await repo.getMediaOfLibrary(libId)
		expect(items).toEqual([{ ...items, ...newThumb }, media2])

		await repo.deleteMedia([media1.id, media2.id])

		items = await repo.getMediaOfLibrary(libId)
		expect(items).toEqual([])
	})
})

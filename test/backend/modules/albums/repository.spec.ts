import { Connection } from 'typeorm'
import { createAlbumDBRepository } from '@/backend/modules/albums/repository'
import { IAlbumEntity } from '@/backend/modules/albums/entities/album'
import { testConnection } from 'test/fixtures/basic'

describe('backend/modules/albums/repository', () => {
	let conn: Connection
	beforeEach(async () => {
		conn = await testConnection()
	})
	afterEach(async () => {
		await conn.close()
	})

	it('crud albums', async () => {
		const repo = createAlbumDBRepository(conn)

		const album: IAlbumEntity = {
			color: '',
			id: '1234',
			name: 'test',
		}

		const newName = { name: 'test2' }

		let albums = await repo.getAlbums()
		expect(albums).toEqual([])

		await repo.saveAlbum(album)

		albums = await repo.getAlbums()
		expect(albums).toEqual([album])

		await repo.saveAlbum({ ...album, ...newName })

		albums = await repo.getAlbums()
		expect(albums).toEqual([{ ...album, ...newName }])

		await repo.deleteAlbum(album.id)

		albums = await repo.getAlbums()
		expect(albums).toEqual([])
	})
})

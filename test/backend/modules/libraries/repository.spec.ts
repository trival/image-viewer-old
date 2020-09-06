import { Connection } from 'typeorm'
import { testConnection } from 'test/db/fixtures'
import { createLibraryDBRepository } from '@/backend/modules/libraries/repository'
import { ILibraryEntity } from '@/backend/modules/libraries/entities/library'

describe('backend/modules/librarys/repository', () => {
	let conn: Connection
	beforeEach(async () => {
		conn = await testConnection()
	})
	afterEach(async () => {
		await conn.close()
	})

	it('crud librarys', async () => {
		const repo = createLibraryDBRepository(conn)

		const library: ILibraryEntity = {
			id: '1234',
			name: 'test',
			ignorePaths: ['/foo', '/bar'],
			rootPath: '/foo/bar',
		}

		const newName = { name: 'test2' }

		let librarys = await repo.getLibraries()
		expect(librarys).toEqual([])

		await repo.saveLibrary(library)

		librarys = await repo.getLibraries()
		expect(librarys).toEqual([library])

		await repo.saveLibrary({ ...library, ...newName })

		librarys = await repo.getLibraries()
		expect(librarys).toEqual([{ ...library, ...newName }])

		await repo.deleteLibrary(library.id)

		librarys = await repo.getLibraries()
		expect(librarys).toEqual([])
	})
})

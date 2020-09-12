import { Connection } from 'typeorm'
import { createLibraryDBRepository } from '@/backend/modules/libraries/repository'
import { ILibraryEntity } from '@/backend/modules/libraries/entities/library'
import { testConnection } from 'test/fixtures/basic'

describe('backend/modules/libraries/repository', () => {
	let conn: Connection
	beforeEach(async () => {
		conn = await testConnection()
	})
	afterEach(async () => {
		await conn.close()
	})

	it('crud libraries', async () => {
		const repo = createLibraryDBRepository(conn)

		const library: ILibraryEntity = {
			id: '1234',
			name: 'test',
			ignorePaths: ['/foo', '/bar'],
			rootPath: '/foo/bar',
		}

		const newName = { name: 'test2' }

		let libraries = await repo.getLibraries()
		expect(libraries).toEqual([])

		await repo.saveLibrary(library)

		libraries = await repo.getLibraries()
		expect(libraries).toEqual([library])

		await repo.saveLibrary({ ...library, ...newName })

		libraries = await repo.getLibraries()
		expect(libraries).toEqual([{ ...library, ...newName }])

		await repo.deleteLibrary(library.id)

		libraries = await repo.getLibraries()
		expect(libraries).toEqual([])
	})
})

import { testConnection } from './fixtures'
import { Library } from '@/backend/db/entities/library'
import { Connection } from 'typeorm'

describe('backend/db/connection', () => {
	let conn: Connection
	beforeEach(async () => {
		conn = await testConnection()
	})
	afterEach(async () => {
		await conn.close()
	})

	it('works', async () => {
		const repo = conn.getRepository(Library)
		const lib = new Library()
		lib.name = 'test'
		lib.id = '1234'
		await repo.save(lib)
		const [results, count] = await repo.findAndCount()
		expect(count).toBe(1)
		expect(results).toMatchInlineSnapshot(`
		Array [
		  Library {
		    "id": "1234",
		    "ignorePaths": null,
		    "name": "test",
		    "rootPath": null,
		  },
		]
	`)
	})
})

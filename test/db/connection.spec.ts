import { testConnection } from './fixtures'
import { Library } from '@/backend/db/entities/library'

describe('backend/db/connection', () => {
	it('works', async () => {
		const conn = await testConnection()
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

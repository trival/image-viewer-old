import { createConnection } from 'typeorm'
import { Library } from './entities/library'

export function getDBConnection(
	dbLocation: string,
	opts: { isTest: boolean } = { isTest: false },
) {
	const { isTest } = opts
	return createConnection({
		type: 'sqlite',
		database: dbLocation,
		synchronize: isTest,
		dropSchema: isTest,
		migrationsRun: !isTest,
		entities: [Library],
	})
}

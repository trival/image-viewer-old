import { createConnection } from 'typeorm'
import { Library } from './entities/library'
import { Album } from './entities/album'
import { AlbumMedia } from './entities/albumMedia'
import { Media } from './entities/media'

export function getDBConnection(
	dbLocation: string,
	opts: { isTest: boolean } = { isTest: false },
) {
	const { isTest } = opts
	return createConnection({
		type: 'better-sqlite3',
		database: dbLocation,
		synchronize: isTest,
		dropSchema: isTest,
		migrationsRun: false,
		entities: [Library, Album, Media, AlbumMedia],
	})
}

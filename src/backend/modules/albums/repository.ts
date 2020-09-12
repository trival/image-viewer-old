import { ID } from '@/backend/types'
import { IAlbumEntity } from './entities/album'
import { Connection } from 'typeorm'
import { Album } from '@/backend/db/entities/album'

export interface IAlbumRepository {
	// Queries
	getAlbums(): Promise<IAlbumEntity[]>

	// Commands
	saveAlbum(entity: IAlbumEntity): Promise<IAlbumEntity>
	deleteAlbum(id: ID): Promise<ID>
}

export function createAlbumDBRepository(conn: Connection): IAlbumRepository {
	const db = conn.getRepository(Album)
	const repo = {} as IAlbumRepository

	repo.getAlbums = () =>
		db.find().then((vals) =>
			vals.map((v) => ({
				...v,
				color: v.color ?? undefined,
			})),
		)

	repo.saveAlbum = (album) => db.save(album)

	repo.deleteAlbum = (id) => db.delete(id).then(() => id)

	return repo
}

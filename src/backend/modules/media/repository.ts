import { ID } from '@/backend/types'
import { IMediaEntity } from './entities/media'
import { Connection } from 'typeorm'
import { Library } from '@/backend/db/entities/library'
import { Media } from '@/backend/db/entities/media'
import { AlbumMedia } from '@/backend/db/entities/albumMedia'
import { mediaDbToEntity, mediaEntityToDb } from './repositoryMappers'

export interface IMediaRepository {
	// Queries
	getMediaById(id: ID): Promise<IMediaEntity>
	getMediaOfLibrary(libraryId: ID): Promise<IMediaEntity[]>
	getMediaOfAlbum(albumId: ID): Promise<IMediaEntity[]>

	// Commands
	saveMedia(entities: IMediaEntity[]): Promise<IMediaEntity[]>
	deleteMedia(ids: ID[]): Promise<ID[]>
	addMediaToAlbum(ids: ID[], albumID: ID): Promise<IMediaEntity[]>
	removeMediaFromAlbum(ids: ID[], albumID: ID): Promise<IMediaEntity[]>
}

export function createMediaDBRepository(conn: Connection): IMediaRepository {
	const libDb = conn.getRepository(Library)
	const mediaDb = conn.getRepository(Media)
	const mediaAlbumDb = conn.getRepository(AlbumMedia)

	const repo = {} as IMediaRepository

	repo.getMediaOfLibrary = (libId) =>
		mediaDb.find({ libraryId: libId }).then((res) => res.map(mediaDbToEntity))

	repo.saveMedia = (media) =>
		mediaDb
			.save(media.map(mediaEntityToDb))
			.then((res) => res.map(mediaDbToEntity))

	repo.deleteMedia = (ids) => mediaDb.delete(ids).then(() => ids)

	return repo
}

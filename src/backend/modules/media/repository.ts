import { ID } from '@/backend/types'
import { IMediaEntity } from './entities/media'
import { Connection } from 'typeorm'
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
	const mediaDb = conn.getRepository(Media)
	const mediaAlbumDb = conn.getRepository(AlbumMedia)

	const repo = {} as IMediaRepository

	repo.getMediaById = (id) =>
		mediaDb.findOne(id, { relations: ['albums'] }).then((v) => {
			if (!v) throw new Error('Media not found for id: ' + id)
			return mediaDbToEntity(v)
		})

	repo.getMediaOfAlbum = (albumId) =>
		mediaAlbumDb
			.find({ where: { albumId }, relations: ['media', 'media.albums'] })
			.then((res) => res.map((rel) => mediaDbToEntity(rel.media)))

	repo.getMediaOfLibrary = (libId) =>
		mediaDb
			.find({ where: { libraryId: libId }, relations: ['albums'] })
			.then((res) => res.map(mediaDbToEntity))

	repo.saveMedia = (media) =>
		mediaDb
			.save(media.map(mediaEntityToDb))
			.then((res) => res.map(mediaDbToEntity))

	repo.deleteMedia = (ids) => mediaDb.delete(ids).then(() => ids)

	repo.addMediaToAlbum = (ids, albumId) =>
		mediaAlbumDb
			.save(ids.map((id) => ({ albumId, mediaId: id })))
			.then(() => mediaDb.findByIds(ids, { relations: ['albums'] }))
			.then((vals) => vals.map(mediaDbToEntity))

	repo.removeMediaFromAlbum = (ids, albumId) =>
		mediaAlbumDb
			.remove(ids.map((id) => ({ albumId, mediaId: id } as AlbumMedia)))
			.then(() => mediaDb.findByIds(ids, { relations: ['albums'] }))
			.then((vals) => vals.map(mediaDbToEntity))

	return repo
}

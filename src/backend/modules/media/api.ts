import { ID } from '@/backend/types'
import { IMediaEntity } from './entities/media'
import { IMediaRepository } from './repository'
import { IFileService } from './services/fileService'

export interface IMediaApi {
	// Queries
	getMediaOfLibrary(libraryId: ID): Promise<IMediaEntity[]>
	getMediaOfAlbum(albumId: ID): Promise<IMediaEntity[]>

	// Commands
	refreshMedia(id: ID): Promise<IMediaEntity>
	refreshMediaOfLibrary(libraryId: ID): Promise<IMediaEntity[]>
	addMediaToAlbum(ids: ID[], albumID: ID): Promise<IMediaEntity>
	removeMediaFromAlbum(ids: ID[], albumID: ID): Promise<IMediaEntity>
}

export function createMediaApi(
	repo: IMediaRepository,
	fileService: IFileService,
) {
	const api = {} as IMediaApi

	api.getMediaOfAlbum = repo.getMediaOfAlbum
	api.getMediaOfLibrary = repo.getMediaOfLibrary
	api.refreshMedia = (id) => {}

	return api
}

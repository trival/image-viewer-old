import { ID } from '@/backend/types'
import { IMediaEntity } from './entities/media'

export interface IMediaApi {
	// Queries
	getMediaOfLibrary(libraryId: ID): Promise<IMediaEntity[]>
	getMediaOfAlbum(albumId: ID): Promise<IMediaEntity[]>

	// Commands
	refreshMedia(id: ID): Promise<IMediaEntity>
	refreshMediaOfLibrary(libraryId: ID): Promise<IMediaEntity[]>
	addMediaToAlbum(id: ID, albumID: ID): Promise<IMediaEntity>
	removeMediaFromAlbum(id: ID, albumID: ID): Promise<IMediaEntity>
}

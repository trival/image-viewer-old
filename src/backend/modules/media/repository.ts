import { ID } from '@/backend/types'
import { IMediaEntity } from './entities/media'

export interface IEntityRepository {
	getMediaOfLibrary(libraryId: ID): Promise<IMediaEntity[]>
	getMediaOfAlbum(albumId: ID): Promise<IMediaEntity[]>

	saveMedia(entities: IMediaEntity[]): Promise<IMediaEntity[]>
	deleteMedia(ids: ID[]): Promise<ID[]>
}

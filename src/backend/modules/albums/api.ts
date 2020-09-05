import { ID } from '@/backend/types'
import { IAlbumEntity } from './entities/album'

export interface IAlbumInput {
	name?: string
	color?: string
}

export interface IAlbumApi {
	// Queries
	getAlbums(): Promise<IAlbumEntity[]>

	// Commands
	createAlbum(props: IAlbumInput): Promise<IAlbumEntity>
	updateAlbum(id: ID, props: IAlbumInput): Promise<IAlbumEntity>
	deleteAlbum(id: ID): Promise<ID>
}

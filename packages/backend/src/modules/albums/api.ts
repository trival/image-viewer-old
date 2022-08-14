import { ID } from '@/backend/types'
import { IAlbumEntity } from './entities/album'
import { IAlbumRepository } from './repository'
import * as uuid from 'uuid'

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

export function createAlbumApi(repo: IAlbumRepository) {
	const api = {} as IAlbumApi

	api.getAlbums = repo.getAlbums

	api.createAlbum = (props) =>
		repo.saveAlbum({
			id: uuid.v4(),
			...props,
		} as IAlbumEntity)

	api.updateAlbum = (id, props) =>
		repo.saveAlbum({ id, ...props } as IAlbumEntity)

	api.deleteAlbum = repo.deleteAlbum

	return api
}

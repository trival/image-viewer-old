import { ID } from '@/backend/types'
import { createLibrary, ILibraryEntity } from './entities/library'
import { ILibraryRepository } from './repository'

export interface ILibraryApi {
	// Queries
	getLibraries(): Promise<ILibraryEntity[]>

	// Commands
	createLibrary(props: {
		name?: string
		rootPath: string
	}): Promise<ILibraryEntity>
	updateLibrary(
		id: ID,
		props: Partial<{ name: string; rootPath: string; ignorePaths: string[] }>,
	): Promise<ILibraryEntity>
	deleteLibrary(id: ID): Promise<ID>
}

export function createLibraryApi(repo: ILibraryRepository) {
	const api = {} as ILibraryApi

	api.getLibraries = repo.getLibraries

	api.createLibrary = (props) =>
		repo.saveLibrary(createLibrary(props.rootPath, props.name))

	api.updateLibrary = (id, props) =>
		repo.saveLibrary({ id, ...props } as ILibraryEntity)

	api.deleteLibrary = repo.deleteLibrary

	return api
}

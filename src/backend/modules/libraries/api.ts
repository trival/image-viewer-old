import { ID } from '@/backend/types'
import { ILibraryEntity } from './entities/library'

export interface ILibraryApi {
	// Queries
	getLibraryById(id: ID): Promise<ILibraryEntity>
	getLibraries(): Promise<ILibraryEntity[]>

	// Commands
	createLibrary(props: { name?: string; path: string }): Promise<ID>
	deleteLibrary(id: ID): Promise<ID>
	updateLibrary(
		id: ID,
		props: Partial<{ name: string; rootPath: string; ignorePaths: string[] }>,
	): Promise<ID>

	readMediaPaths(id: ID): Promise<string[]>
}

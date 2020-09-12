import { ID } from '@/backend/types'
import { ILibraryEntity } from './entities/library'

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

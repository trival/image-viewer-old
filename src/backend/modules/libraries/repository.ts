import { ID } from '@/backend/types'
import { ILibraryEntity } from './entities/library'
import { Connection } from 'typeorm'
import { Library } from '@/backend/db/entities/library'
import { libraryDbToEntity, libraryEntityToDb } from './repositoryMappers'

export interface ILibraryRepository {
	// Queries
	getLibraries(): Promise<ILibraryEntity[]>

	// Commands
	saveLibrary(entity: ILibraryEntity): Promise<ILibraryEntity>
	deleteLibrary(id: ID): Promise<ID>
}

export function createLibraryDBRepository(
	conn: Connection,
): ILibraryRepository {
	const db = conn.getRepository(Library)
	const repo = {} as ILibraryRepository

	repo.getLibraries = () => db.find().then((res) => res.map(libraryDbToEntity))

	repo.saveLibrary = (library) =>
		db.save(libraryEntityToDb(library)).then(libraryDbToEntity)

	repo.deleteLibrary = (id) => db.delete(id).then(() => id)

	return repo
}

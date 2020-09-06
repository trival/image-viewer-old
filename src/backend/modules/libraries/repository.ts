import { ID } from '@/backend/types'
import { ILibraryEntity } from './entities/library'
import { Connection } from 'typeorm'
import { Library } from '@/backend/db/entities/library'
import { dbToEntity, entityToDb } from './repositoryMappers'

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

	repo.getLibraries = () => db.find().then((res) => res.map(dbToEntity))

	repo.saveLibrary = (library) => db.save(entityToDb(library)).then(dbToEntity)

	repo.deleteLibrary = (id) => db.delete(id).then(() => id)

	return repo
}

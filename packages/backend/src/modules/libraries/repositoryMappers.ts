import { ILibraryEntity } from './entities/library'
import { Library } from '@/backend/db/entities/library'

export function libraryEntityToDb(entity: ILibraryEntity): Library {
	const library = new Library()

	library.id = entity.id
	library.name = entity.name
	library.rootPath = entity.rootPath
	library.ignorePaths = entity.ignorePaths.join('\n')

	return library
}

export function libraryDbToEntity(library: Library): ILibraryEntity {
	return {
		id: library.id,
		name: library.name,
		rootPath: library.rootPath,
		ignorePaths: library.ignorePaths.split('\n'),
	}
}

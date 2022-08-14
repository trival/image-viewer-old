import { ID } from '@/backend/types'
import * as uuid from 'uuid'

export type ILibraryEntity = Readonly<{
	id: ID
	name: string
	rootPath: string
	ignorePaths: string[]
}>

export function createLibrary(rootPath: string, name = '') {
	return {
		id: uuid.v4(),
		rootPath,
		name,
		ignorePaths: [],
	}
}

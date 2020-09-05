import { ID } from '@/backend/types'

export type ILibraryEntity = Readonly<{
	id: ID
	name: string
	rootPath: string
	ignorePaths: string[]
}>

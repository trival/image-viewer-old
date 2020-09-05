import { ID } from '@/backend/types'

export type IAlbumEntity = Readonly<{
	id: ID
	name: string
	color: string
}>

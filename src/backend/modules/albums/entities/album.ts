import { ID } from '@/backend/types'

export type IEntity = Readonly<{
	id: ID
	name: string
	color: string
}>

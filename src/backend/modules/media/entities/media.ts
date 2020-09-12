import { ID } from '@/backend/types'
import { IFileMeta } from './fileMeta'
import { IMediaMeta } from './mediaMeta'

export enum EMediaType {
	IMAGE = 'IMAGE',
	VIDEO = 'VIDEO',
}

export type IMediaEntity = Readonly<{
	id: ID
	libraryId: ID
	type: EMediaType
	directory: string
	fullPath: string
	thumbPath?: string
	albums?: ID[]
	fileMeta?: IFileMeta
	mediaMeta?: IMediaMeta
}>

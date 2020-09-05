import { ID } from '@/backend/types'
import { IFileMeta } from './fileMeta'
import { IImageMeta, IVideoMeta } from './mediaMeta'

export enum EMediaType {
	IMAGE = 'IMAGE',
	VIDEO = 'VIDEO',
}

export type IMediaEntity = Readonly<{
	id: ID
	libraryId: ID
	type: EMediaType
	path: string
	albums: ID[]
	fileMeta: IFileMeta
	mediaMeta: IImageMeta | IVideoMeta
}>

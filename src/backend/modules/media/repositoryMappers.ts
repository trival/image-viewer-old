import { Media } from '@/backend/db/entities/media'
import { IMediaEntity } from './entities/media'

export function mediaEntityToDb(e: IMediaEntity): Media {
	const m = new Media()

	m.id = e.id
	m.libraryId = e.libraryId
	m.type = e.type
	m.directory = e.directory
	m.fullPath = e.fullPath
	m.thumbPath = e.thumbPath
	if (e.fileMeta) {
		m.fileName = e.fileMeta.filename
		m.fileSize = e.fileMeta.size
		m.fileCreatedAt = e.fileMeta.createdAt
		m.fileUpdatedAt = e.fileMeta.updatedAt
	}
	if (e.mediaMeta) {
		m.metaDate = e.mediaMeta.date
		m.metaWidth = e.mediaMeta.width
		m.metaHeight = e.mediaMeta.height
		m.metaLength = e.mediaMeta.length
	}

	return m
}

export function mediaDbToEntity(m: Media): IMediaEntity {
	const e = {
		id: m.id,
		libraryId: m.libraryId,
		type: m.type,
		directory: m.directory,
		fullPath: m.fullPath,
		thumbPath: m.thumbPath,
		albums: [],
		fileMeta:
			m.fileCreatedAt || m.fileName || m.fileSize || m.fileUpdatedAt
				? {
						filename: m.fileName,
						size: m.fileSize,
						createdAt: m.fileCreatedAt,
						updatedAt: m.fileUpdatedAt,
				  }
				: undefined,
		mediaMeta:
			m.metaDate || m.metaHeight || m.metaWidth || m.metaLength
				? {
						date: m.metaDate,
						width: m.metaWidth,
						height: m.metaHeight,
						length: m.metaLength,
				  }
				: undefined,
	} as IMediaEntity
	return e
}

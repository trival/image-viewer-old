import { EMediaType, IMediaEntity } from '../entities/media'
import { IMediaMeta } from '../entities/mediaMeta'
import * as path from 'path'
import * as fs from 'fs'
import * as crypto from 'crypto'
import isImage from 'is-image'
import { IFileMeta } from '../entities/fileMeta'

export interface IFileService {
	getMediaDataForRootPath(rootPath: string): Promise<IMediaEntity[]>
	getMediaDataForPath(
		rootPath: string,
		relativePath: string,
		opts?: Partial<{ withMediaMeta: boolean }>,
	): Promise<IMediaEntity>
	getMediaMetaForPath(path: string): Promise<IMediaMeta>
}

export function createFileService(): IFileService {
	const service = {} as IFileService

	service.getMediaDataForPath = async (rootPath, relativePath, opts) => {
		rootPath = rootPath.trim()
		relativePath = relativePath.trim()
		const fullPath = path.resolve(rootPath, relativePath)

		const stats = await fs.promises.stat(fullPath)

		if (!stats.isFile) {
			throw new Error('file does not exitst: ' + fullPath)
		}
		let type: EMediaType | undefined
		if (isImage(fullPath)) {
			type = EMediaType.IMAGE
		}
		if (!type) {
			throw new Error('file is not a media file: ' + fullPath)
		}

		const fileMeta: IFileMeta = {
			filename: path.basename(relativePath),
			size: stats.size,
			createdAt: stats.birthtimeMs,
			updatedAt: stats.mtimeMs,
		}

		const m = {
			id: getPathHash(fullPath, fileMeta.createdAt, fileMeta.size),
			type,
			fullPath,
			directory: getDirectory(fullPath, rootPath),
			fileMeta,
		} as IMediaEntity

		return m
	}

	return service
}

function getDirectory(fullPath: string, rootPath: string) {
	return path.dirname(fullPath).replace(rootPath, '').replace(/^\//, '')
}

function getPathHash(fullPath: string, createdAt: number, size = 0) {
	return crypto
		.createHash('sha1')
		.update(size + fullPath + createdAt)
		.digest('hex')
}

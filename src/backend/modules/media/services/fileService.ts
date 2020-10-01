import { EMediaType, IMediaEntity } from '../entities/media'
import * as path from 'path'
import * as fs from 'fs'
import * as crypto from 'crypto'
import isImage from 'is-image'
import { IFileMeta } from '../entities/fileMeta'
import sharp from 'sharp'
import { ExifDateTime, exiftool } from 'exiftool-vendored'
import { getImagePathsInDir } from '@/lib/files'

export interface IFileService {
	getMediaDataForRootPath(rootPath: string): Promise<IMediaEntity[]>
	getMediaDataForPath(
		rootPath: string,
		fullPath: string,
		opts?: Partial<{ withMediaMeta: boolean }>,
	): Promise<IMediaEntity>
}

export function createFileService(): IFileService {
	const service = {} as IFileService

	service.getMediaDataForRootPath = async (rootPath) => {
		const paths = await getImagePathsInDir(rootPath)
		return Promise.all(
			[...paths].map((path) => service.getMediaDataForPath(rootPath, path)),
		)
	}

	service.getMediaDataForPath = async (rootPath, fullPath, opts) => {
		rootPath = rootPath.trim()
		fullPath = fullPath.trim()

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
			filename: path.basename(fullPath),
			size: stats.size,
			createdAt: stats.birthtimeMs,
			updatedAt: stats.mtimeMs,
		}

		let m = {
			id: getPathHash(fullPath, fileMeta.size),
			type,
			fullPath,
			directory: getDirectory(fullPath, rootPath),
			fileMeta,
		} as IMediaEntity

		if (opts?.withMediaMeta) {
			if (m.type === EMediaType.IMAGE) {
				const meta = await sharp(fullPath).metadata()
				const exif = await exiftool.read(fullPath).catch((e) => {
					console.log('error reading exif data of ' + fullPath, e)
					return null
				})
				const maybeDate =
					exif && (exif.CreateDate || exif.DateCreated || exif.DateTimeCreated)
				const date = maybeDate
					? typeof maybeDate === 'string'
						? ExifDateTime.fromExifLoose(maybeDate)?.toDate().getTime()
						: maybeDate.toDate().getTime()
					: 0
				// console.log(meta, exif)
				m = {
					...m,
					mediaMeta: {
						date: date || 0,
						width: meta.width || 0,
						height: meta.height || 0,
						length: 0,
					},
				}
			}
		}

		return m
	}

	return service
}

function getDirectory(fullPath: string, rootPath: string) {
	return path.dirname(fullPath).replace(rootPath, '').replace(/^\//, '')
}

function getPathHash(fullPath: string, size = 0) {
	return crypto
		.createHash('sha1')
		.update(size + fullPath)
		.digest('hex')
}

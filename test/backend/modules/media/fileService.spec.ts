import {
	EMediaType,
	IMediaEntity,
} from '@/backend/modules/media/entities/media'
import {
	createFileService,
	IFileService,
} from '@/backend/modules/media/services/fileService'
import * as path from 'path'
import { localTestRootPath } from 'test/fixtures/basic'

describe('backend/modules/media/fileService', () => {
	const service: IFileService = createFileService()

	describe('getMediaDataForRootPath', () => {
		it('gets image data in path', async () => {
			const data = await service.getMediaDataForRootPath(localTestRootPath)

			data
				.sort((a, b) => a.fullPath.localeCompare(b.fullPath))
				.forEach((e) => {
					expect(e).toMatchSnapshot({
						id: expect.any(String),
						fullPath: expect.any(String),
						fileMeta: {
							createdAt: expect.any(Number),
							updatedAt: expect.any(Number),
						},
					})
				})
		})
	})

	describe('getMediaDataForPath', () => {
		it('gets media data for file', async () => {
			const fullPath = path.resolve(
				localTestRootPath,
				'dir1/test_image_square.png',
			)
			const m = await service.getMediaDataForPath(localTestRootPath, fullPath)
			expect(m).toMatchObject({
				fullPath,
				directory: 'dir1',
				type: EMediaType.IMAGE,
				fileMeta: {
					filename: 'test_image_square.png',
				},
			} as IMediaEntity)

			expect(m).toMatchInlineSnapshot(
				{
					fullPath: expect.any(String),
					id: expect.any(String),
					fileMeta: {
						createdAt: expect.any(Number),
						updatedAt: expect.any(Number),
					},
				},
				`
			Object {
			  "directory": "dir1",
			  "fileMeta": Object {
			    "createdAt": Any<Number>,
			    "filename": "test_image_square.png",
			    "size": 56816,
			    "updatedAt": Any<Number>,
			  },
			  "fullPath": Any<String>,
			  "id": Any<String>,
			  "type": "IMAGE",
			}
		`,
			)

			const m2 = await service.getMediaDataForPath(localTestRootPath, fullPath)

			expect(m2.id).toEqual(m.id)
		})

		it('gets the image meta', async () => {
			const fullPath = path.resolve(
				localTestRootPath,
				'dir1/test_landscape.jpg',
			)
			const m = await service.getMediaDataForPath(localTestRootPath, fullPath, {
				withMediaMeta: true,
			})
			expect(m).toMatchObject({
				mediaMeta: {
					date: 1510930096000,
					width: 3024,
					height: 4032,
					length: 0,
				},
			} as Partial<IMediaEntity>)
		})
	})
})

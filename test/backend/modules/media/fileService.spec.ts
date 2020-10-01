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

			expect(
				data
					.map((d) => ({ ...d, fileMeta: { filename: d.fileMeta?.filename } }))
					.sort((a, b) => a.fullPath.localeCompare(b.fullPath)),
			).toMatchInlineSnapshot(`
			Array [
			  Object {
			    "directory": "dir1",
			    "fileMeta": Object {
			      "filename": "test_image_square.jpg",
			    },
			    "fullPath": "/home/trival/projects/image-viewer/test/localTestFs/testDir/dir1/test_image_square.jpg",
			    "id": "a263afeb65771243156c614274785a219dc1788e",
			    "type": "IMAGE",
			  },
			  Object {
			    "directory": "dir1",
			    "fileMeta": Object {
			      "filename": "test_image_square.png",
			    },
			    "fullPath": "/home/trival/projects/image-viewer/test/localTestFs/testDir/dir1/test_image_square.png",
			    "id": "0c70c2b1c604e621efac09c8a942ef037e314437",
			    "type": "IMAGE",
			  },
			  Object {
			    "directory": "dir1",
			    "fileMeta": Object {
			      "filename": "test_landscape.jpg",
			    },
			    "fullPath": "/home/trival/projects/image-viewer/test/localTestFs/testDir/dir1/test_landscape.jpg",
			    "id": "3208996b87ce183b4ffd24cf504875adf29fd7d2",
			    "type": "IMAGE",
			  },
			  Object {
			    "directory": "dir2",
			    "fileMeta": Object {
			      "filename": "test_image_horizontal.png",
			    },
			    "fullPath": "/home/trival/projects/image-viewer/test/localTestFs/testDir/dir2/test_image_horizontal.png",
			    "id": "9d62cc73b56290f30f80030cfaf6f875db9cfe2e",
			    "type": "IMAGE",
			  },
			  Object {
			    "directory": "dir2",
			    "fileMeta": Object {
			      "filename": "test_image_vertical.png",
			    },
			    "fullPath": "/home/trival/projects/image-viewer/test/localTestFs/testDir/dir2/test_image_vertical.png",
			    "id": "4e2571ea1e232574297f7786da1536103b4a8b8a",
			    "type": "IMAGE",
			  },
			]
		`)
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
			  "id": "0c70c2b1c604e621efac09c8a942ef037e314437",
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

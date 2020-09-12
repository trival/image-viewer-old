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
	describe('getMediaDataForPath', () => {
		it('gets media data for file', async () => {
			const m = await service.getMediaDataForPath(
				localTestRootPath,
				'dir1/test_image_square.png ',
			)
			expect(m).toMatchObject({
				fullPath: path.resolve(localTestRootPath, 'dir1/test_image_square.png'),
				directory: 'dir1',
				type: EMediaType.IMAGE,
				fileMeta: {
					filename: 'test_image_square.png',
				},
			} as IMediaEntity)

			expect(m).toMatchInlineSnapshot(
				{ fullPath: expect.any(String) },
				`
			Object {
			  "directory": "dir1",
			  "fileMeta": Object {
			    "createdAt": 1595415312636.625,
			    "filename": "test_image_square.png",
			    "size": 56816,
			    "updatedAt": 1595415312637.6023,
			  },
			  "fullPath": Any<String>,
			  "id": "b389b5d02e52c07a8780e501205404cac1407055",
			  "type": "IMAGE",
			}
		`,
			)
		})
	})
})

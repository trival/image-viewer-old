/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { createFileService } from '@/backend/modules/media/services/fileService'
import { diffMedia } from '@/backend/modules/media/services/mediaLibs'
import { localTestRootPath } from 'test/fixtures/basic'

describe('backend/modules/media/mediaLibs', () => {
	describe('diffMedia', () => {
		it('deletes old media', async () => {
			const service = createFileService()
			const oldData = await service.getMediaDataForRootPath(localTestRootPath)
			const [deleted, ...newData] = oldData
			const diff = diffMedia(oldData, newData)
			expect(diff.delete).toEqual([deleted.id])
			expect(diff.update).toEqual([])
		})

		it('updates changed media', async () => {
			const service = createFileService()
			const oldData = await service.getMediaDataForRootPath(localTestRootPath)
			let [changed, ...newData] = oldData
			changed = { ...changed, fileMeta: { ...changed.fileMeta!, size: 1234 } }
			newData = [...newData, changed]
			const diff = diffMedia(oldData, newData)
			expect(diff.delete).toEqual([])
			expect(diff.update).toEqual([changed])
		})

		it('does nothing if nothing is changed', async () => {
			const service = createFileService()
			const oldData = await service.getMediaDataForRootPath(localTestRootPath)
			const diff = diffMedia(oldData, oldData)
			expect(diff.delete).toEqual([])
			expect(diff.update).toEqual([])
		})
	})
})

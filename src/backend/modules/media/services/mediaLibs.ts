import { ID } from '@/backend/types'
import { isEqual } from 'lodash'
import { IMediaEntity } from '../entities/media'

export function diffMedia(oldMedia: IMediaEntity[], newMedia: IMediaEntity[]) {
	const res: { update: IMediaEntity[]; delete: ID[] } = {
		update: [],
		delete: [],
	}

	const oldMs = oldMedia.reduce((ids, m) => {
		ids[m.id] = m
		return ids
	}, {} as { [id: string]: IMediaEntity })

	const newMs = newMedia.reduce((ids, m) => {
		ids[m.id] = m
		return ids
	}, {} as { [id: string]: IMediaEntity })

	Object.keys(oldMs).forEach((id) => {
		const newM = newMs[id]
		if (!newM) {
			res.delete.push(id)
		} else if (
			!isEqual({ ...oldMs[id], mediaMeta: null }, { ...newM, mediaMeta: null })
		) {
			res.update.push({ ...oldMs[id], ...newM })
		}
	})

	return res
}

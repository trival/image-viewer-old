import { IMediaApi } from '@/backend/modules/media/api'
import { IMediaEntity } from '@/backend/modules/media/entities/media'
import { ref, computed, watchEffect } from 'vue'
import { ICollectionState } from './collections'

export default function create(
	mediaApi: IMediaApi,
	collectionState: ICollectionState,
) {
	const media = ref<IMediaEntity[]>([])

	watchEffect(async () => {
		const currentCollectionId = collectionState.currentCollection.value
		if (currentCollectionId) {
			if (collectionState.isLibrary.value) {
				media.value = await mediaApi.getMediaOfLibrary(currentCollectionId)
			}
			if (collectionState.isAlbum.value) {
				media.value = await mediaApi.getMediaOfAlbum(currentCollectionId)
			}
		} else {
			media.value = []
		}
	})

	const directories = computed(() => {
		const dirs: { [dir: string]: IMediaEntity[] } = {}
		media.value.forEach((m) => {
			;(dirs[m.directory] ??= []).push(m)
		})
		return dirs
	})

	return {
		media,
		directories,
	}
}

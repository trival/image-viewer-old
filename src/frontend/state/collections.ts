import { IAlbumApi } from '@/backend/modules/albums/api'
import { IAlbumEntity } from '@/backend/modules/albums/entities/album'
import { ILibraryApi } from '@/backend/modules/libraries/api'
import { ILibraryEntity } from '@/backend/modules/libraries/entities/library'
import { ID } from '@/backend/types'
import { ref, computed } from 'vue'

export type ICollectionState = ReturnType<typeof createCollectionsState>
export function createCollectionsState(
	libApi: ILibraryApi,
	albumApi: IAlbumApi,
) {
	const libraries = ref<ILibraryEntity[]>([])
	const albums = ref<IAlbumEntity[]>([])

	const currentCollection = ref<string | null>(null)

	const isLibrary = ref(false)
	const isAlbum = computed(
		() => !!(currentCollection.value && !isLibrary.value),
	)

	libApi.getLibraries().then((libs) => (libraries.value = libs))
	albumApi.getAlbums().then((as) => (albums.value = as))

	function setCurrentLibrary(id: ID) {
		currentCollection.value = id
		isLibrary.value = true
	}

	function setCurrentAlbum(id: ID) {
		currentCollection.value = id
		isLibrary.value = false
	}

	async function createLibrary(rootPath: string, name?: string) {
		await libApi.createLibrary({ name, rootPath })
		libraries.value = await libApi.getLibraries()
	}

	async function createAlbum(name: string, color?: string) {
		await albumApi.createAlbum({ name, color })
		albums.value = await albumApi.getAlbums()
	}

	return {
		libraries,
		albums,
		currentCollection,
		isLibrary,
		isAlbum,
		setCurrentAlbum,
		setCurrentLibrary,
		createLibrary,
		createAlbum,
	}
}

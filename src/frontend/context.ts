import { getDBConnection } from '@/backend/db/connection'
import { createAlbumApi } from '@/backend/modules/albums/api'
import { createLibraryApi } from '@/backend/modules/libraries/api'
import { createMediaApi } from '@/backend/modules/media/api'
import { createMediaDBRepository } from '@/backend/modules/media/repository'
import { createCollectionsState } from './state/collections'
import { createMediaState } from './state/media'
import * as config from '../config'
import { createLibraryDBRepository } from '@/backend/modules/libraries/repository'
import { createAlbumDBRepository } from '@/backend/modules/albums/repository'
import {
	createFileService,
	IFileService,
} from '@/backend/modules/media/services/fileService'
import { Await } from '@/lib/types'
import { wrapServiceRender } from '@/lib/electron'
import { InjectionKey } from 'vue'
import { createAppState } from './state/app'

export type Context = Await<ReturnType<typeof createContext>>

export const ctxKey: InjectionKey<Context> = Symbol()

export async function createContext() {
	const url = await config.getDbUrl()
	console.log('creating context', url)
	const connection = await getDBConnection(url, { isTest: true })
	console.log('got connection!', connection)

	const mediaRepository = createMediaDBRepository(connection)
	const libraryRepository = createLibraryDBRepository(connection)
	const albumRepository = createAlbumDBRepository(connection)

	const mediaFileService = createFileService()

	const mediaApi = createMediaApi(
		mediaRepository,
		libraryRepository,
		mediaFileService,
	)
	const libApi = createLibraryApi(libraryRepository)
	const albumApi = createAlbumApi(albumRepository)

	const collectionState = createCollectionsState(libApi, albumApi)
	const mediaState = createMediaState(mediaApi, collectionState)

	const appState = createAppState()

	return {
		state: {
			collections: collectionState,
			media: mediaState,
			app: appState,
		},
	}
}

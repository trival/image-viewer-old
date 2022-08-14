import { ipcRenderer } from 'electron'
import * as path from 'path'

// see https://www.electronjs.org/docs/api/app#appgetpathname
let appDataPath: string
export const getAppDataPath = async () => {
	if (!appDataPath) {
		appDataPath = await ipcRenderer.invoke('appDataPath')
	}
	return appDataPath
}

export const getDbUrl = async () =>
	path.resolve(await getAppDataPath(), 'image-db.sqlite')

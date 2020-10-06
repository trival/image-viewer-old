import { app } from 'electron'
import * as path from 'path'

// see https://www.electronjs.org/docs/api/app#appgetpathname
export const appDataPath = app.getPath('userData')

export const dbUrl = path.resolve(appDataPath, 'image-db.sqlite')

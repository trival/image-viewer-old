import { app, BrowserWindow, ipcMain } from 'electron'
const { readdir } = require('fs').promises
import * as path from 'path'
import isImage from 'is-image'
const http = require('http')
const express = require('express')
const expressApp = express()
const cors = require('cors')
const router = express.Router()

/**
 * Set `__statics` path to static files in production;
 * The reason we are setting it here is that the path needs to be evaluated at runtime
 */
if (process.env.PROD) {
	// @ts-ignore
	global.__statics = require('path')
		.join(__dirname, 'statics')
		.replace(/\\/g, '\\\\')
}

let mainWindow

function createWindow() {
	/**
	 * Initial window options
	 */
	mainWindow = new BrowserWindow({
		width: 1000,
		height: 600,
		useContentSize: true,
		webPreferences: {
			nodeIntegration: true,
			webSecurity: false,
		},
	})

	mainWindow.loadURL(process.env.APP_URL)

	mainWindow.on('closed', () => {
		mainWindow = null
	})
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit()
	}
})

app.on('activate', () => {
	if (mainWindow === null) {
		createWindow()
	}
})

// listen for files event by browser process
ipcMain.on('path', async (event, pathName) => {
	getFiles(pathName)
		.then(files => mainWindow.webContents.send('images', files))
		.catch(error => mainWindow.webContents.send('images:error', error))
})

async function getFiles(dir) {
	const dirs = {
		[dir]: [],
	}
	const dirents = await readdir(dir, { withFileTypes: true })
	await Promise.all(
		dirents.map(async dirent => {
			const res = path.resolve(dir, dirent.name)
			if (dirent.isDirectory()) {
				const files = await getFiles(res)
				Object.assign(dirs, files)
			} else if (isImage(res)) {
				dirs[dir].push(res)
			}
		}),
	)

	if (!dirs[dir].length) {
		delete dirs[dir]
	}
	return dirs
}

expressApp.use(cors())

router.get('/file', function(req, res) {
	const file = path.sep + req.query.name
	console.log('serving file', file)
	res.sendFile(file)
})

expressApp.use('/', router)

http.createServer(expressApp).listen(8889)

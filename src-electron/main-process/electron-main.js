import { app, BrowserWindow } from 'electron'
import * as http from 'http'
import * as express from 'express'
import * as cors from 'cors'

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

// === serve local files ===

const expressApp = express()
const router = express.Router()

expressApp.use(cors())

router.get('/file', function(req, res) {
	res.sendFile(decodeURIComponent(req.query.name))
})

expressApp.use('/', router)

http.createServer(expressApp).listen(8889)

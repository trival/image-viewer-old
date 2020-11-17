module.exports = {
	lintOnSave: false,
	pluginOptions: {
		electronBuilder: {
			nodeIntegration: true,
			externals: [
				'typeorm',
				'sqlite3',
				'better-sqlite3',
				'sharp',
				'exiftool-vendored',
			],
			builderOptions: {
				// options placed here will be merged with default configuration and passed to electron-builder
				// asar: { asarUnpack: 'node_modules/exiftool-vendored.*/**/*' },
				asar: { externalAllowed: true },
			},
		},
	},
}

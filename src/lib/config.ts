interface Config {
	libraries: {
		[id: string]: {
			rootPath: string
			ignoredPaths: string[]
		}
	}
}

export default function create() {
	function loadConfig() {}

	function saveConfig() {}

	function createLibrary(path: string) {}

	function deleteLibrary(libraryId: string) {}

	function ignorePathInLibrary(libraryId: string, path: string) {}

	function resetIgnoredPathInLibrary(libraryId: string, path: string) {}

	function refreshDirectory(libraryId: string, path: string) {}

	return {
		loadConfig,
		saveConfig,
		createLibrary,
		deleteLibrary,
		ignorePathInLibrary,
		resetIgnoredPathInLibrary,
		refreshDirectory,
	}
}

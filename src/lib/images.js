import { ref, computed } from '@vue/composition-api'
import { ipcRenderer } from 'electron'

export default function create() {
	const path = ref('')

	const data = ref({})

	const directories = computed(() =>
		Object.keys(data.value)
			.sort()
			.map(directory => ({
				directory: directory.replace(path.value, ''),
				images: data.value[directory].sort(),
			})),
	)

	const shortDirectories = computed(() =>
		directories.value.map(d => d.directory),
	)

	function setPath(newPath) {
		console.log(newPath)
		ipcRenderer.send('path', newPath)
		path.value = newPath
	}

	// metadata from the main process
	ipcRenderer.on('images', (event, newData) => {
		data.value = newData
		console.log(data.value)
	})

	// error event from catch block in main process
	ipcRenderer.on('images:error', (event, error) => {
		console.error(error)
	})

	return {
		path,
		directories,
		shortDirectories,
		setPath,
	}
}

import { ref, computed } from '@vue/composition-api'
import { getImagesInDir } from './files'

export default function create() {
	const path = ref('')

	const data = ref<{ [id: string]: string[] }>({})

	const directories = computed(() =>
		Object.keys(data.value)
			.sort()
			.map(directory => ({
				directory: directory.replace(path.value, ''),
				images: data.value[directory].map(encodeURIComponent).sort(),
			})),
	)

	const shortDirectories = computed(() =>
		directories.value.map(d => d.directory),
	)

	function setPath(newPath: string) {
		console.log(newPath)
		path.value = newPath
		getImagesInDir(newPath)
			.then(images => {
				data.value = images
			})
			.catch(e => console.log(e))
	}

	return {
		path,
		directories,
		shortDirectories,
		setPath,
	}
}

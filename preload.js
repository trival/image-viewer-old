// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener('DOMContentLoaded', () => {
	for (const type of ['chrome', 'node', 'electron']) {
		console.log(`${type}-version`, process.versions[type])
	}
})

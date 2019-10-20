// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.
const { ipcRenderer } = require('electron')

// listen for the form to be submitted
const submitListener = document
	.querySelector('form')
	.addEventListener('submit', event => {
		// prevent default behavior that causes page refresh
		event.preventDefault()

		// an array of files with some metadata
		const path = document.getElementById('imagepath').value

		// send the data to the main process
		ipcRenderer.send('files', path)
	})

// metadata from the main process
ipcRenderer.on('metadata', (event, data) => {
	const images = document.getElementById('images')

	images.innerHTML = ''

	for (const path in data) {
		const section = document.createElement('section')
		const header = document.createElement('h3')
		header.innerText = path
		section.appendChild(header)
		for (const image of data[path]) {
			console.log(path, image)
			const img = new Image()
			img.dataset.src = 'file://' + image
			img.classList.add('lzy_img')
			section.appendChild(img)
		}
		images.appendChild(section)
	}

	const imageObserver = new IntersectionObserver((entries, imgObserver) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				const lazyImage = entry.target
				console.log('lazy loading ', lazyImage)
				// @ts-ignore
				lazyImage.src = lazyImage.dataset.src
				lazyImage.classList.remove('lzy_img')
				imgObserver.unobserve(lazyImage)
			}
		})
	})
	const arr = document.querySelectorAll('img.lzy_img')
	arr.forEach(v => {
		imageObserver.observe(v)
	})
})

// error event from catch block in main process
ipcRenderer.on('metadata:error', (event, error) => {
	console.error(error)
})

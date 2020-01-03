import createImages from './images'

export const modules = {
	images: createImages(),
}

// @ts-ignore
window.modules = modules

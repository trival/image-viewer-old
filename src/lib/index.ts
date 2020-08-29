import createImages from './images'

export const modules = {
	images: createImages(),
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
window.modules = modules

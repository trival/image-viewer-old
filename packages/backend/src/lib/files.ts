import * as fs from 'fs'
import isImage from 'is-image'
import * as path from 'path'

export async function getImagePathsInDir(dir: string) {
	let paths = new Set<string>()
	const dirents = await fs.promises.readdir(dir, { withFileTypes: true })
	await Promise.all(
		dirents.map(async (dirent) => {
			const res = path.resolve(dir, dirent.name)
			if (dirent.isDirectory()) {
				const files = await getImagePathsInDir(res)
				paths = new Set([...files, ...paths])
			} else if (isImage(res)) {
				paths.add(res)
			}
		}),
	)

	return paths
}

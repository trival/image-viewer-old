import * as fs from 'fs'
import isImage from 'is-image'
import * as path from 'path'

export async function getImagesInDir(dir: string) {
	const dirs = {
		[dir]: [] as string[],
	}
	const dirents = await fs.promises.readdir(dir, { withFileTypes: true })
	await Promise.all(
		dirents.map(async (dirent) => {
			const res = path.resolve(dir, dirent.name)
			if (dirent.isDirectory()) {
				const files = await getImagesInDir(res)
				Object.assign(dirs, files)
			} else if (isImage(res)) {
				dirs[dir].push(res)
			}
		}),
	)

	if (!dirs[dir].length) {
		delete dirs[dir]
	}
	return dirs
}

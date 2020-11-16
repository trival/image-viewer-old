import { ipcMain, ipcRenderer } from 'electron'

export function wrapServiceMain(service: any, namespace = '') {
	for (const key in service) {
		ipcMain.handle(namespace + ':' + key, async (e, ...args) => {
			console.log(`called main service "${namespace}:${key}" with args: `, args)
			const result = await (service[key] as any)(...args)
			console.log(`sending main service "${namespace}:${key}" result: `, result)

			return result
		})
	}
}

export function wrapServiceRender<T>(
	fnNames: Array<keyof T>,
	namespace = '',
): T {
	const newService = {} as T

	for (const name of fnNames) {
		;(newService as any)[name] = (...args: any[]) =>
			ipcRenderer.invoke(namespace + ':' + name, ...args)
	}

	return newService
}

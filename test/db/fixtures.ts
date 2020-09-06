import { getDBConnection } from '@/backend/db/connection'
import * as path from 'path'

export const testConnection = () =>
	getDBConnection(path.resolve(__dirname, './database.sqlite'), {
		isTest: true,
	})

import { getDBConnection } from '@/backend/db/connection'
import * as path from 'path'

export const localConfigDir = path.resolve(
	__dirname,
	'../localTestFs/localTestConfig',
)

export const localTestRootPath = path.resolve(
	__dirname,
	'../localTestFs/testDir',
)

export const testConnection = () =>
	getDBConnection(path.resolve(localConfigDir, 'database.sqlite'), {
		isTest: true,
	})

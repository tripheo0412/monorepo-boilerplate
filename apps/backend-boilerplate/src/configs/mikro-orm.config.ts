import {
	Options,
	PostgreSqlDriver,
	EntityCaseNamingStrategy,
} from '@mikro-orm/postgresql'
import {Migrator} from '@mikro-orm/migrations'
import {env} from './env.config'
import {entities} from '@/entities'

const isDevMode = env.APP.ENV === 'local'
const shouldSSL = env.DATABASE.POSTGRES.SHOULD_SSL === 'TRUE'

/**
 * Determine folder for migration files depending on environment.
 */
const getMigrationFolder = (isTs: boolean): string => {
	if (isTs) {
		return 'src/migrations'
	}
	return isDevMode ? 'dist/migrations' : (
			'./apps/backend-boilerplate/dist/migrations'
		)
}

/**
 * MikroORM configuration object.
 */
const config: Options = {
	allowGlobalContext: true,
	debug: env.DATABASE.POSTGRES.DEBUG === 'TRUE',
	migrations: {
		path: getMigrationFolder(false),
		pathTs: getMigrationFolder(true),
		transactional: true,
		disableForeignKeys: false,
	},
	baseDir: process.cwd(),
	entities,
	driver: PostgreSqlDriver,
	extensions: [Migrator],
	dbName: env.DATABASE.POSTGRES.NAME,
	user: env.DATABASE.POSTGRES.USER,
	password: env.DATABASE.POSTGRES.PASSWORD,
	port: env.DATABASE.POSTGRES.PORT,
	host: env.DATABASE.POSTGRES.HOST,
	namingStrategy: EntityCaseNamingStrategy,
	driverOptions: {
		client: 'postgresql',
		connection: {
			client: 'postgresql',
			ssl:
				shouldSSL ?
					{
						require: true,
						rejectUnauthorized: false,
					}
				:	false,
		},
	},
}

export default config

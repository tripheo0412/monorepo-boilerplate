import {MikroORM} from '@mikro-orm/postgresql'
import config from './configs/mikro-orm.config'

/**
 * Initiates the database migration process using MikroORM.
 *
 * @returns {Promise<void>} - A promise that resolves when the migration process is complete.
 */
export const migrate = async (): Promise<void> => {
	const orm = await MikroORM.init(config)
	const migrator = orm.getMigrator()
	await migrator.up()
	await orm.close(true)
}

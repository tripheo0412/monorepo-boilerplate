import WithSoftDelete from '@/decorators/with-soft-delete.decorator'
import {PrimaryKey, Property} from '@mikro-orm/core'
/**
 * Abstract base entity with common properties.
 * @class BaseEntity
 * @property {string} id - The UUID of the entity.
 * @property {Date} createdAt - The date and time when the entity was created.
 * @property {Date} lastUpdatedAt - The date and time when the entity was last updated.
 * @property {Date} deletedAt - The date and time when the entity was deleted. If null, the entity is not deleted.
 */
@WithSoftDelete()
export abstract class BaseEntity {
	@PrimaryKey({type: 'uuid', defaultRaw: 'uuid_generate_v4()'})
	id: string

	@Property({type: 'timestamptz', onCreate: () => new Date()})
	createdAt = new Date()

	@Property({
		type: 'timestamptz',
		onUpdate: () => {
			return new Date()
		},
	})
	lastUpdatedAt = new Date()

	@Property({nullable: true, type: 'timestamptz'})
	deletedAt?: Date
}

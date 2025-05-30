import {Entity, Property} from '@mikro-orm/core'
import {BaseEntity} from './base.entity'

/**
 * MikroORM entity representing application user.
 */
@Entity({tableName: 'users'})
export class UserEntity extends BaseEntity {
	/** User's email address */
	@Property({unique: true})
	email!: string

	/** User's first name */
	@Property()
	firstname!: string

	/** User's last name */
	@Property()
	lastname!: string

	/** Bcrypt hashed password */
	@Property()
	password!: string

	/** Whether user agreed to terms and conditions */
	@Property({default: false})
	agreedToTerms: boolean = false
}

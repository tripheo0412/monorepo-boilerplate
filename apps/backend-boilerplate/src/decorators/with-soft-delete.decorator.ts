import {Filter} from '@mikro-orm/core'

/**
 * Interface for the arguments of the filter.
 * @interface FilterArguments
 * @property {boolean} [getAll] - If true, get all entities, including the deleted ones.
 * @property {boolean} [getOnlyDeleted] - If true, get only the deleted entities.
 */
interface FilterArguments {
	getAll?: boolean
	getOnlyDeleted?: boolean
}

/**
 * Class decorator that adds a soft delete filter to the entity.
 * @function WithSoftDelete
 * @returns {ClassDecorator} The class decorator that adds the soft delete filter.
 */
const WithSoftDelete = (): ClassDecorator => {
	return Filter({
		name: 'softDelete',
		cond: ({getAll, getOnlyDeleted}: FilterArguments = {}) => {
			if (getAll) {
				return {}
			}
			if (getOnlyDeleted) {
				return {
					deletedAt: {
						$ne: null,
					},
				}
			}
			return {
				deletedAt: null,
			}
		},
		default: true,
	})
}

export default WithSoftDelete

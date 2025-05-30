/**
 * Base entity DTO with common properties.
 */

/**
 * Base DTO for all entities.
 */
export interface BaseEntityDto {
	id: string
	createdAt: Date
	lastUpdatedAt: Date
	deletedAt?: Date | null
}

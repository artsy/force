import { ActionName, OwnerType } from "./Values"

/**
 * The base interface for either a successful or failure event.
 */
interface Result {
  /**
   * The action name that will be used to tie this back to an interaction.
   */
  action_name: ActionName

  /**
   * The type of the entity that owns this result.
   */
  owner_type: OwnerType

  /**
   * The database ID of the entity. E.g. in the case of an entity that comes out
   * of Gravity this should be its Mongo ID.
   */
  owner_id: string

  /**
   * The slug of the entity, if it has one.
   */
  owner_slug?: string
}

/**
 * A successful result.
 */
export interface Success extends Result {
  /**
   * Used to identify the event as a success one.
   */
  result: "Success"
}

/**
 * A failure result.
 */
export interface Failure extends Result {
  /**
   * Used to identify the event as a failure one.
   */
  result: "Failure"

  /**
   * The reason for the failure.
   */
  error: string
}

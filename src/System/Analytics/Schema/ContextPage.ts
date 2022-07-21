import { OwnerType, PageName } from "./Values"

/**
 * The current page.
 */
export interface ContextPage {
  context_page: PageName

  /**
   * The type of the entity that this page represents.
   */
  context_page_owner_type?: OwnerType

  /**
   * The database ID of the owner. E.g. in the case of an entity that comes out
   * of Gravity this should be its Mongo ID.
   */
  context_page_owner_id?: string

  /**
   * The slug of the entity, if it has one.
   */
  context_page_owner_slug?: string
}

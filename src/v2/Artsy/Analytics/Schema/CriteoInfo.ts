/** CriteoInfo models the information needed for Segment to meaningfully communicate
 * with Criteo to represent (at least bids) as a "product". Important for
 * retargetting.
 *
 * Relevant Force context: https://github.com/artsy/force/pull/4041
 */
export interface CriteoInfo {
  /** Primary key used by Criteo to represent an "order" */
  order_id: string

  /** list of "products" associated with the order */
  products: CriteoProduct[]
}

interface CriteoProduct {
  /**
   * The identifier of the product in Criteo
   *
   * When used in the context on an auction lot, the product_id should be the
   * database ID of the artwork (not sale artwork), being bid on.
   */
  product_id: string

  /**
   * The number of items considered to be within the "product"
   *
   * When used in the context of an auction lot, the quantity should be 1 for
   * each bid.
   */
  quantity: number

  /** Price of the product in minor units (cents for USD, for example). */
  price: number
}

export interface AuctionInfo {
  /**
   * database id of a Bidder record (instance of user registered for an auction)
   */
  bidder_id: string

  /**
   * database id of a Bidder Position record
   *
   * Bidder position is the term used in Gravity to track the intent of a Bidder
   * to bid on a lot. Typically this is a "max bid" (they could win at a lower value),
   * but occasionally it is a fixed bid amount.
   */
  bidder_position_id: string

  /**
   * List of reasons why there's a failure event
   *
   *  Used by the auction registration flow.
   */
  error_messages: string[]

  /**
   * The amount of max bid the user selected in cents. For example, if the user
   * selected $5,000.00, it will be reported as 500000.
   *
   *  Used by the auction confirm bid flow.
   */
  selected_max_bid_minor: string

  /**
   * Internal ID of the SaleArtwork.
   *
   *  Used by the request condition report flow.
   */
  sale_artwork_id: string
}

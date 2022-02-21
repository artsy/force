import { Contact_artwork$data } from "v2/__generated__/Contact_artwork.graphql"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { get } from "v2/Utils/get"
import TextLink from "../TextLink"

export interface ContactProps extends React.HTMLProps<Contact> {
  artwork: Contact_artwork$data
}

export class Contact extends React.Component<ContactProps, null> {
  contactLine() {
    const { artwork } = this.props
    if (artwork.sale && artwork.sale.is_auction) {
      return this.auctionLine()
    } else if (artwork.is_inquireable) {
      return this.contactPartnerLine()
    }
  }

  auctionLine() {
    const { artwork } = this.props
    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
    const isLiveOpen = get(artwork, p => p.sale.is_live_open)
    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
    const isOpen = get(artwork, p => p.sale.is_open)
    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
    const isClosed = get(artwork, p => p.sale.is_closed)

    if (isLiveOpen) {
      return (
        // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
        <TextLink href={artwork.href} underline>
          Enter Live Auction
        </TextLink>
      )
    } else if (isOpen) {
      const sa = get(artwork, p => p.sale_artwork)
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      const bidderPositions = get(sa, p => p.counts.bidder_positions)
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      const highestBidDisplay = get(sa, p => p.highest_bid.display)
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      const openingBidDisplay = get(sa, p => p.opening_bid.display)

      if (bidderPositions && bidderPositions > 0) {
        const s = bidderPositions > 1 ? "s" : ""
        return (
          <span>
            {highestBidDisplay} ({bidderPositions} bid
            {s})
          </span>
        )
      } else {
        return <span>{openingBidDisplay}</span>
      }
    } else if (isClosed) {
      return <span>Auction closed</span>
    } else {
      return <span />
    }
  }

  contactPartnerLine() {
    const partner = get(this.props, p =>
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      p.artwork.partner.type.toLocaleLowerCase()
    )

    if (partner) {
      return (
        // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
        <TextLink href={this.props.artwork.href} underline>
          Contact {partner}
        </TextLink>
      )
    } else {
      return null
    }
  }

  render() {
    return <div>{this.contactLine()}</div>
  }
}

// @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
export default createFragmentContainer(Contact, {
  artwork: graphql`
    fragment Contact_artwork on Artwork {
      href
      is_inquireable: isInquireable
      sale {
        is_auction: isAuction
        is_live_open: isLiveOpen
        is_open: isOpen
        is_closed: isClosed
      }
      partner(shallow: true) {
        type
      }
      sale_artwork: saleArtwork {
        highest_bid: highestBid {
          display
        }
        opening_bid: openingBid {
          display
        }
        counts {
          bidder_positions: bidderPositions
        }
      }
    }
  `,
})

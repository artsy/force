import { Flex, Link, Sans, Spacer, color } from "@artsy/palette"
import { Details_artwork } from "v2/__generated__/Details_artwork.graphql"
import { SystemContextConsumer } from "v2/Artsy"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import styled from "styled-components"
import { get } from "v2/Utils/get"

const TruncatedLine = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`

export interface Props extends React.HTMLProps<Details> {
  showSaleLine: boolean
  includeLinks: boolean
  artwork: Details_artwork
  hideArtistName?: boolean
  hidePartnerName?: boolean
  useLighterFont?: boolean
}

export class Details extends React.Component<Props, null> {
  static defaultProps = {
    showSaleLine: true,
    includeLinks: true,
  }

  artistLine() {
    const { cultural_maker, artists } = this.props.artwork
    const { includeLinks, hideArtistName } = this.props

    if (hideArtistName) {
      return
    }

    if (cultural_maker) {
      return (
        <TruncatedLine>
          <Sans size="3t" color="black100" weight="medium">
            {cultural_maker}
          </Sans>
        </TruncatedLine>
      )
    } else if (artists && artists.length) {
      const artistLine = artists
        .reduce((acc, artist, index) => {
          return acc.concat([
            ", ",
            includeLinks
              ? this.link(artist.name, artist.href, artist.id + "-" + index)
              : artist.name,
          ])
        }, [])
        .slice(1)
      return (
        <TruncatedLine>
          <Sans size="3t" color="black100" weight="medium">
            {artistLine}
          </Sans>
        </TruncatedLine>
      )
    }
  }

  titleLine() {
    const { includeLinks, artwork } = this.props
    const { title, date, href } = artwork

    const artworkText = (
      <TruncatedLine>
        <Sans size="3t" color="black60">
          {date ? title + ", " + date : title}
        </Sans>
      </TruncatedLine>
    )
    const artworkTextWithLink = <Link href={href}>{artworkText}</Link>

    return includeLinks ? artworkTextWithLink : artworkText
  }

  line(text) {
    return (
      <TruncatedLine>
        <Sans size="3t" color="black60">
          {text}
        </Sans>
      </TruncatedLine>
    )
  }

  link(text, href, key) {
    return (
      <Link href={href} key={key}>
        <Sans size="3t" color="black60">
          {text}
        </Sans>
      </Link>
    )
  }

  partnerLine() {
    const { hidePartnerName, artwork, includeLinks } = this.props
    const { collecting_institution, partner } = artwork
    const { href, name } = partner

    if (hidePartnerName) {
      return
    }

    if (collecting_institution) {
      return this.line(collecting_institution)
    } else if (partner) {
      // TODO: We wrap the entire Metadata comp in an anchor tag linking to the artwork page, so why is there a link here?
      if (includeLinks) {
        return (
          <TruncatedLine>
            <Link href={href}>
              <Sans size="3t" color="black60">
                {name}
              </Sans>
            </Link>
          </TruncatedLine>
        )
      } else {
        return this.line(name)
      }
    }
  }

  saleLine() {
    const artwork = this.props.artwork
    const hasSaleMessage =
      artwork.sale_message && artwork.sale_message !== "Contact For Price"
    const notInAuction = !(artwork.sale && artwork.sale.is_auction)
    if (hasSaleMessage && notInAuction) {
      return <div>{artwork.sale_message}</div>
    }
  }

  saleInfoLine() {
    const { useLighterFont } = this.props

    return (
      <Flex flexDirection="column">
        <Sans
          color={useLighterFont ? color("black60") : color("black100")}
          weight="regular"
          size="3t"
        >
          {this.saleMessage()}{" "}
        </Sans>
        <Sans
          size="3t"
          color={useLighterFont ? color("black60") : color("black100")}
          weight={"regular"}
        >
          {this.bidInfo()}
        </Sans>
        <Spacer mb={0.3} />
      </Flex>
    )
  }

  bidInfo() {
    const { artwork } = this.props
    const { sale } = this.props.artwork

    const inRunningAuction = sale && sale.is_auction && !sale.is_closed
    if (!inRunningAuction) {
      return undefined
    }

    const bidderPositionCounts = get(
      artwork,
      a => a.sale_artwork.counts.bidder_positions,
      0
    )

    if (bidderPositionCounts === 0) {
      return undefined
    }

    const s = bidderPositionCounts > 1 ? "s" : ""
    return `(${bidderPositionCounts} bid${s})`
  }

  saleMessage() {
    const { artwork } = this.props
    const { sale } = artwork
    const isAuction = sale && sale.is_auction

    if (isAuction) {
      const showBiddingClosed = sale.is_closed
      if (showBiddingClosed) {
        return "Bidding closed"
      } else {
        const highestBidDisplay = get(
          artwork,
          p => p.sale_artwork.highest_bid.display
        )
        const openingBidDisplay = get(
          artwork,
          p => p.sale_artwork.opening_bid.display
        )

        return highestBidDisplay || openingBidDisplay || ""
      }
    }

    // TODO: Extract this sentence-cased version and apply everywhere.
    if (artwork.sale_message === "Contact For Price") {
      return "Contact for price"
    }

    return artwork.sale_message
  }

  render() {
    return (
      <SystemContextConsumer>
        {({ user }) => {
          return (
            <div>
              {this.artistLine()}
              {this.titleLine()}
              {this.partnerLine()}
              {this.saleInfoLine()}
            </div>
          )
        }}
      </SystemContextConsumer>
    )
  }
}

export const DetailsFragmentContainer = createFragmentContainer(Details, {
  artwork: graphql`
    fragment Details_artwork on Artwork {
      href
      title
      date
      sale_message: saleMessage
      cultural_maker: culturalMaker
      artists(shallow: true) {
        id
        href
        name
      }
      collecting_institution: collectingInstitution
      partner(shallow: true) {
        name
        href
      }
      sale {
        is_auction: isAuction
        is_closed: isClosed
      }
      sale_artwork: saleArtwork {
        counts {
          bidder_positions: bidderPositions
        }
        highest_bid: highestBid {
          display
        }
        opening_bid: openingBid {
          display
        }
      }
    }
  `,
})

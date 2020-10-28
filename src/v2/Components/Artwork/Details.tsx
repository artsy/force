import { Flex, Link, Text } from "@artsy/palette"
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
  includeLinks: boolean
  artwork: Details_artwork
  hideSaleInfo?: boolean
  hideArtistName?: boolean
  hidePartnerName?: boolean
}

export class Details extends React.Component<Props, null> {
  static defaultProps = {
    includeLinks: true,
    hideSaleInfo: false,
  }

  artistLine() {
    const cultural_maker = this.props.artwork?.cultural_maker
    const artists = this.props.artwork?.artists
    const { includeLinks, hideArtistName } = this.props

    if (hideArtistName) {
      return
    }

    if (cultural_maker) {
      return (
        <TruncatedLine>
          <Text variant="mediumText">{cultural_maker}</Text>
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
          <Text variant="mediumText">{artistLine}</Text>
        </TruncatedLine>
      )
    }
  }

  titleLine() {
    const { includeLinks } = this.props
    const title = this.props?.artwork?.title
    const date = this.props?.artwork?.date
    const href = this.props?.artwork?.href

    const artworkText = (
      <TruncatedLine>
        <Text variant="text" color="black60">
          {date ? title + ", " + date : title}
        </Text>
      </TruncatedLine>
    )
    const artworkTextWithLink = <Link href={href}>{artworkText}</Link>

    return includeLinks ? artworkTextWithLink : artworkText
  }

  line(text) {
    return (
      <TruncatedLine>
        <Text variant="text" color="black60">
          {text}
        </Text>
      </TruncatedLine>
    )
  }

  link(text, href, key) {
    return (
      <Link href={href} key={key}>
        <Text variant="text" color="black60">
          {text}
        </Text>
      </Link>
    )
  }

  partnerLine() {
    const { hidePartnerName, includeLinks } = this.props
    const collecting_institution = this.props?.artwork?.collecting_institution
    const partner = this.props?.artwork?.partner
    const href = partner?.href
    const name = partner?.name

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
              <Text variant="text" color="black60">
                {name}
              </Text>
            </Link>
          </TruncatedLine>
        )
      } else {
        return this.line(name)
      }
    }
  }

  saleInfoLine() {
    const { hideSaleInfo } = this.props
    if (hideSaleInfo) {
      return null
    }
    return (
      <Flex>
        <TruncatedLine>
          <Text variant="text" color="black60">
            {this.saleMessage()} {this.bidInfo()}
          </Text>
        </TruncatedLine>
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

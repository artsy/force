import { Sans, Spacer, color } from "@artsy/palette"
import { Details_artwork } from "v2/__generated__/Details_artwork.graphql"
import { SystemContextConsumer } from "v2/Artsy"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import styled from "styled-components"
import { get } from "v2/Utils/get"
import TextLink from "../TextLink"

const TruncatedLine = styled.div`
  display: block;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`

const LightFontRegular = styled.span`
  color: ${color("black60")};
  font-size: 14px;
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
    const { includeLinks } = this.props
    const artworkText = (
      <>
        <LightFontRegular>{this.props.artwork.title}</LightFontRegular>
        {this.props.artwork.date && `, ${this.props.artwork.date}`}
      </>
    )
    const artworkTextWithLink = includeLinks ? (
      <TextLink href={this.props.artwork.href}>{artworkText}</TextLink>
    ) : (
      artworkText
    )
    return <TruncatedLine>{artworkTextWithLink}</TruncatedLine>
  }

  line(text) {
    return <TruncatedLine>{text}</TruncatedLine>
  }

  link(text, href, key) {
    return (
      <TextLink href={href} key={key}>
        {text}
      </TextLink>
    )
  }

  partnerLine() {
    if (this.props.hidePartnerName) {
      return
    }

    if (this.props.artwork.collecting_institution) {
      return this.line(this.props.artwork.collecting_institution)
    } else if (this.props.artwork.partner) {
      if (this.props.includeLinks) {
        return (
          <TruncatedLine>
            <TextLink href={this.props.artwork.partner.href}>
              {this.props.artwork.partner.name}
            </TextLink>
          </TruncatedLine>
        )
      } else {
        return this.line(this.props.artwork.partner.name)
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
      <>
        <Sans
          style={{ display: "inline" }}
          color={useLighterFont ? color("black60") : color("black100")}
          weight="regular"
          size="3t"
        >
          {this.saleMessage()}{" "}
        </Sans>
        <Sans
          style={{ display: "inline" }}
          size="3t"
          color={useLighterFont ? color("black60") : color("black100")}
          weight={"regular"}
        >
          {this.bidInfo()}
        </Sans>
        <Spacer mb={0.3} />
      </>
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
      (a) => a.sale_artwork.counts.bidder_positions,
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
          (p) => p.sale_artwork.highest_bid.display
        )
        const openingBidDisplay = get(
          artwork,
          (p) => p.sale_artwork.opening_bid.display
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

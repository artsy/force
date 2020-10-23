// FIXME -- Remove this lint disable
/* eslint-disable jsx-a11y/anchor-is-valid */
import { Box, Link, Separator, Spacer, Text } from "@artsy/palette"
import { SystemContext } from "v2/Artsy"
import { track } from "v2/Artsy/Analytics"
import * as Schema from "v2/Artsy/Analytics/Schema"
import React, { SFC, useContext } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { data as sd } from "sharify"

import { ArtworkSidebarExtraLinks_artwork } from "v2/__generated__/ArtworkSidebarExtraLinks_artwork.graphql"
import { Mediator } from "lib/mediator"

export interface ArtworkSidebarExtraLinksProps {
  artwork: ArtworkSidebarExtraLinks_artwork
}

export interface ArtworkSidebarExtraLinksContainerProps
  extends ArtworkSidebarExtraLinksProps {
  mediator: Mediator
}

const Container = ({ children }) => (
  <Text variant="caption" color="black60">
    {children}
  </Text>
)

@track({
  context_module: Schema.ContextModule.Sidebar,
})
class ArtworkSidebarExtraLinksContainer extends React.Component<
  ArtworkSidebarExtraLinksContainerProps
> {
  @track(() => ({
    action_type: Schema.ActionType.Click,
    subject: Schema.Subject.AuctionConditionsOfSale,
    type: Schema.Type.Link,
  }))
  onClickConditionsOfSale() {
    window.open(sd.APP_URL + "/conditions-of-sale", "_blank")
  }

  @track(() => ({
    action_type: Schema.ActionType.Click,
    subject: Schema.Subject.AuctionFAQ,
    type: Schema.Type.Link,
  }))
  onClickAuctionFAQ() {
    this.props.mediator &&
      this.props.mediator.trigger &&
      this.props.mediator.trigger("openAuctionFAQModal")
  }

  @track(() => ({
    action_type: Schema.ActionType.Click,
    subject: Schema.Subject.BNMOReadFAQ,
    type: Schema.Type.Link,
  }))
  onClickBuyNowFAQ() {
    window.open(
      "https://support.artsy.net/hc/en-us/sections/360008203114-Buy-Now-and-Make-Offer",
      "_blank"
    )
  }

  @track(() => ({
    action_type: Schema.ActionType.Click,
    subject: Schema.Subject.CollectorFAQ,
    type: Schema.Type.Link,
  }))
  onClickCollectorFAQ() {
    window.open(
      "https://support.artsy.net/hc/en-us/sections/360008203054-Contact-a-gallery",
      "_blank"
    )
  }

  @track(() => ({
    action_type: Schema.ActionType.Click,
    subject: Schema.Subject.AuctionAskSpecialist,
    type: Schema.Type.Link,
  }))
  onClickAuctionAskSpecialist() {
    this.props.mediator &&
      this.props.mediator.trigger &&
      this.props.mediator.trigger("openAuctionAskSpecialistModal", {
        artworkId: this.props.artwork.internalID,
      })
  }

  @track(() => ({
    action_type: Schema.ActionType.Click,
    subject: Schema.Subject.BNMOAskSpecialist,
    type: Schema.Type.Link,
  }))
  onClickBuyNowAskSpecialist() {
    this.props.mediator &&
      this.props.mediator.trigger &&
      this.props.mediator.trigger("openBuyNowAskSpecialistModal", {
        artworkId: this.props.artwork.internalID,
      })
  }

  @track(() => ({
    action_type: Schema.ActionType.Click,
    subject: Schema.Subject.ConsignLearnMore,
    type: Schema.Type.Link,
  }))
  onClickConsign() {
    window.open(sd.APP_URL + "/consign", "_blank")
  }

  conditionsOfSaleText() {
    const first = "By placing your bid you agree to Artsy's "
    if (
      !this.props.artwork.sale.isBenefit &&
      !!this.props.artwork.sale.partner
    ) {
      const partnerName = this.props.artwork.sale.partner.name
      const possessivePartnerName = partnerName.endsWith("'s")
        ? partnerName
        : partnerName + "'s"
      return first + "and " + possessivePartnerName + " "
    } else {
      return first
    }
  }

  renderAuctionTerms() {
    return (
      <Container>
        {this.conditionsOfSaleText()}
        <Link onClick={this.onClickConditionsOfSale.bind(this)}>
          Conditions of Sale
        </Link>
        .<Spacer mb={1} />
      </Container>
    )
  }
  renderAuctionQuestionsLine() {
    return (
      <Container>
        Have a question? Read our{" "}
        <Link onClick={this.onClickAuctionFAQ.bind(this)}>auction FAQs</Link> or{" "}
        <Link onClick={this.onClickAuctionAskSpecialist.bind(this)}>
          ask a specialist
        </Link>
        .
      </Container>
    )
  }
  renderForSaleQuestionsLine() {
    const { is_acquireable, is_inquireable } = this.props.artwork

    if (is_acquireable)
      return (
        <Container>
          Have a question?{" "}
          <Link onClick={this.onClickBuyNowFAQ.bind(this)}>
            Visit our help center
          </Link>{" "}
          or{" "}
          <Link onClick={this.onClickBuyNowAskSpecialist.bind(this)}>
            ask a specialist
          </Link>
          .
        </Container>
      )

    if (is_inquireable)
      return (
        <Container>
          Have a question?{" "}
          <Link onClick={this.onClickCollectorFAQ.bind(this)}>
            Visit our help center
          </Link>
          .
        </Container>
      )
  }

  renderConsignmentsLine(artistsCount) {
    return (
      <Container>
        Want to sell a work by{" "}
        {artistsCount === 1 ? "this artist" : "these artists"}?{" "}
        <Link onClick={this.onClickConsign.bind(this)}>Consign with Artsy</Link>
        .
      </Container>
    )
  }

  render() {
    const { artwork } = this.props
    const consignableArtistsCount = artwork.artists.filter(
      artist => artist.is_consignable
    ).length
    const isInOpenAuction =
      artwork.is_in_auction && artwork.sale && !artwork.sale.is_closed
    const renderQuestionsLine = artwork.is_for_sale || isInOpenAuction
    if (!renderQuestionsLine && !!!consignableArtistsCount) return null

    return (
      <Box>
        <Separator mb={3} />
        {isInOpenAuction && this.renderAuctionTerms()}
        {renderQuestionsLine &&
          (artwork.is_in_auction
            ? this.renderAuctionQuestionsLine()
            : this.renderForSaleQuestionsLine())}
        {!!consignableArtistsCount &&
          this.renderConsignmentsLine(consignableArtistsCount)}
      </Box>
    )
  }
}

export const ArtworkSidebarExtraLinks: SFC<ArtworkSidebarExtraLinksProps> = props => {
  const { mediator } = useContext(SystemContext)
  return <ArtworkSidebarExtraLinksContainer {...props} mediator={mediator} />
}

export const ArtworkSidebarExtraLinksFragmentContainer = createFragmentContainer(
  ArtworkSidebarExtraLinks,
  {
    artwork: graphql`
      fragment ArtworkSidebarExtraLinks_artwork on Artwork {
        internalID
        is_in_auction: isInAuction
        is_for_sale: isForSale
        is_acquireable: isAcquireable
        is_inquireable: isInquireable
        artists {
          is_consignable: isConsignable
        }
        sale {
          is_closed: isClosed
          isBenefit
          partner {
            name
          }
        }
      }
    `,
  }
)

import { Clickable, Link, Separator, Spacer, Text } from "@artsy/palette"
import { track } from "v2/System/Analytics"
import * as Schema from "v2/System/Analytics/Schema"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ArtworkSidebarExtraLinks_artwork } from "v2/__generated__/ArtworkSidebarExtraLinks_artwork.graphql"
import { useInquiry, WithInquiryProps } from "v2/Components/Inquiry/useInquiry"
import { useDialog } from "v2/Utils/Hooks/useDialog"
import { AuctionFAQsDialogQueryRenderer } from "v2/Components/AuctionFAQsDialog"

export interface ArtworkSidebarExtraLinksProps {
  artwork: ArtworkSidebarExtraLinks_artwork
}

export interface ArtworkSidebarExtraLinksContainerProps
  extends ArtworkSidebarExtraLinksProps,
    WithInquiryProps {
  auctionFAQsDialog: {
    showDialog(): void
    dialogComponent: JSX.Element
  }
}

const Container = ({ children }) => (
  <Text variant="xs" color="black60">
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
    // Tracking
  }

  @track(() => ({
    action_type: Schema.ActionType.Click,
    subject: Schema.Subject.AuctionFAQ,
    type: Schema.Type.Link,
  }))
  onClickAuctionFAQ() {
    this.props.auctionFAQsDialog.showDialog()
  }

  @track(() => ({
    action_type: Schema.ActionType.Click,
    subject: Schema.Subject.BNMOReadFAQ,
    type: Schema.Type.Link,
  }))
  onClickBuyNowFAQ() {
    // Tracking
  }

  @track(() => ({
    action_type: Schema.ActionType.Click,
    subject: Schema.Subject.CollectorFAQ,
    type: Schema.Type.Link,
  }))
  onClickCollectorFAQ() {
    // Tracking
  }

  @track(() => ({
    action_type: Schema.ActionType.Click,
    subject: Schema.Subject.AuctionAskSpecialist,
    type: Schema.Type.Link,
  }))
  onClickAuctionAskSpecialist() {
    this.props.showInquiry({ askSpecialist: true })
  }

  @track(() => ({
    action_type: Schema.ActionType.Click,
    subject: Schema.Subject.BNMOAskSpecialist,
    type: Schema.Type.Link,
  }))
  onClickBuyNowAskSpecialist() {
    this.props.showInquiry({ askSpecialist: true })
  }

  @track(() => ({
    action_type: Schema.ActionType.Click,
    subject: Schema.Subject.ConsignLearnMore,
    type: Schema.Type.Link,
  }))
  onClickConsign() {
    // Tracking
  }

  conditionsOfSaleText() {
    const first = "By placing your bid you agree to Artsy's "
    if (
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      !this.props.artwork.sale.isBenefit &&
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      !!this.props.artwork.sale.partner
    ) {
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      const partnerName = this.props.artwork.sale.partner.name
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
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
        <Link
          href="/conditions-of-sale"
          target="_blank"
          onClick={this.onClickConditionsOfSale.bind(this)}
        >
          Conditions of Sale
        </Link>
        .<Spacer mb={1} />
      </Container>
    )
  }
  renderAuctionQuestionsLine() {
    return (
      <>
        {this.props.auctionFAQsDialog.dialogComponent}

        <Container>
          Have a question? Read our{" "}
          <Clickable
            onClick={this.onClickAuctionFAQ.bind(this)}
            textDecoration="underline"
            color="black100"
          >
            auction FAQs
          </Clickable>{" "}
          or{" "}
          <Clickable
            onClick={this.onClickAuctionAskSpecialist.bind(this)}
            textDecoration="underline"
            color="black100"
          >
            ask a specialist
          </Clickable>
          .
        </Container>
      </>
    )
  }
  renderForSaleQuestionsLine() {
    const { is_acquireable, is_inquireable } = this.props.artwork

    if (is_acquireable)
      return (
        <Container>
          Have a question?{" "}
          <Link
            href="https://support.artsy.net/hc/en-us/sections/360008203114-Buy-Now-and-Make-Offer"
            target="_blank"
            rel="noopener noreferrer"
            onClick={this.onClickBuyNowFAQ.bind(this)}
          >
            Visit our help center
          </Link>{" "}
          or{" "}
          <Clickable
            onClick={this.onClickBuyNowAskSpecialist.bind(this)}
            textDecoration="underline"
            color="black100"
          >
            ask a specialist
          </Clickable>
          .
        </Container>
      )

    if (is_inquireable)
      return (
        <Container>
          Have a question?{" "}
          <Link
            href="https://support.artsy.net/hc/en-us/sections/360008203054-Contact-a-gallery"
            target="_blank"
            rel="noopener noreferrer"
            onClick={this.onClickCollectorFAQ.bind(this)}
          >
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
        <Link
          href="/consign"
          target="_blank"
          onClick={this.onClickConsign.bind(this)}
        >
          Consign with Artsy
        </Link>
        .
      </Container>
    )
  }

  render() {
    const { artwork } = this.props

    const consignableArtistsCount = artwork.artists?.filter(
      artist => artist?.is_consignable
    ).length

    const isInOpenAuction =
      artwork.is_in_auction && artwork.sale && !artwork.sale.is_closed
    const renderQuestionsLine = artwork.is_for_sale || isInOpenAuction
    if (!renderQuestionsLine && !!!consignableArtistsCount) return null

    return (
      <>
        {this.props.inquiryComponent}

        <Separator my={2} />

        {isInOpenAuction && this.renderAuctionTerms()}

        {renderQuestionsLine &&
          (artwork.is_in_auction
            ? this.renderAuctionQuestionsLine()
            : this.renderForSaleQuestionsLine())}

        {!!consignableArtistsCount &&
          this.renderConsignmentsLine(consignableArtistsCount)}
      </>
    )
  }
}

export const ArtworkSidebarExtraLinks: React.FC<ArtworkSidebarExtraLinksProps> = props => {
  const inquiry = useInquiry({ artworkID: props.artwork.internalID })

  const { dialogComponent, showDialog, hideDialog } = useDialog({
    Dialog: () => <AuctionFAQsDialogQueryRenderer onClose={hideDialog} />,
  })

  return (
    <ArtworkSidebarExtraLinksContainer
      artworkID={props.artwork.internalID}
      auctionFAQsDialog={{ dialogComponent, showDialog }}
      {...inquiry}
      {...props}
    />
  )
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

import { Box, Serif, Spacer, Theme, Toggle, media, space } from "@artsy/palette"
import { AuctionFAQ_viewer } from "v2/__generated__/AuctionFAQ_viewer.graphql"
import * as React from "react"
import Markdown from "react-markdown"
import { createFragmentContainer, graphql } from "react-relay"
import styled from "styled-components"

interface AuctionFAQProps {
  viewer: AuctionFAQ_viewer
}

export const AuctionFAQ: React.FC<AuctionFAQProps> = ({ viewer }) => {
  const biddingContent = viewer.bidding && viewer.bidding.content
  const buyersPremiumTaxesAndFeesContent =
    viewer.buyersPremiumTaxesAndFees && viewer.buyersPremiumTaxesAndFees.content
  const paymentsAndShippingContent =
    viewer.paymentsAndShipping && viewer.paymentsAndShipping.content
  const emailsAndAlertsContent =
    viewer.emailsAndAlerts && viewer.emailsAndAlerts.content
  const conditionsOfSaleContent =
    viewer.conditionsOfSale && viewer.conditionsOfSale.content

  return (
    <Theme>
      <AuctionWrapper>
        <Serif size="8" color="black100">
          Auction FAQs
        </Serif>
        <Spacer mb={2} />
        <Serif size="3" color="black100">
          How can we help you? Below are answers to some of the most common
          questions from collectors.
          <br />
          Need more immediate assistance? Please{" "}
          <a href="mailto:support@artsy.net">contact us</a>.
        </Serif>
        <Spacer mb={2} />
        {biddingContent && (
          <Toggle label="Bidding">
            <StyledMarkdown
              source={biddingContent}
              containerTagName="div"
              unwrapDisallowed
            />
          </Toggle>
        )}
        {buyersPremiumTaxesAndFeesContent && (
          <Toggle label="Buyer's Premium, Taxes & Fees">
            <StyledMarkdown
              source={buyersPremiumTaxesAndFeesContent}
              containerTagName="div"
              unwrapDisallowed
            />
          </Toggle>
        )}
        {paymentsAndShippingContent && (
          <Toggle label="Payments and Shipping">
            <StyledMarkdown
              source={paymentsAndShippingContent}
              containerTagName="div"
              unwrapDisallowed
            />
          </Toggle>
        )}
        {emailsAndAlertsContent && (
          <Toggle label="Emails and Alerts">
            <StyledMarkdown
              source={emailsAndAlertsContent}
              containerTagName="div"
              unwrapDisallowed
            />
          </Toggle>
        )}
        {conditionsOfSaleContent && (
          <Toggle label="Conditions of Sale">
            <StyledMarkdown
              source={conditionsOfSaleContent}
              containerTagName="div"
              unwrapDisallowed
            />
          </Toggle>
        )}
      </AuctionWrapper>
    </Theme>
  )
}

const AuctionWrapper = styled(Box)`
  max-width: 600px;
  margin: ${space(4)}px auto;
  padding: ${space(2)}px;
  ${media.xs`
    margin: ${space(1)}px auto;
  `};
`

const StyledMarkdown = styled(Markdown)`
  h2 {
    font-family: "Adobe Garamond W08", "adobe-garamond-pro",
      "AGaramondPro-Regular", "Times New Roman", Times, serif;
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
  }

  p {
    margin-bottom: 20px;
    font-family: "Adobe Garamond W08", adobe-garamond-pro, AGaramondPro-Regular,
      "Times New Roman", Times, serif;
    font-size: 16px;
    line-height: 24px;
  }

  p:last-child {
    margin-bottom: 0;
  }
`

export const AuctionFAQFragmentContainer = createFragmentContainer(AuctionFAQ, {
  viewer: graphql`
    fragment AuctionFAQ_viewer on Viewer {
      bidding: staticContent(id: "how-auctions-work-bidding") {
        content
      }
      buyersPremiumTaxesAndFees: staticContent(
        id: "how-auctions-work-buyers-premium-taxes-and-fees"
      ) {
        content
      }
      paymentsAndShipping: staticContent(
        id: "how-auctions-work-payments-and-shipping"
      ) {
        content
      }
      emailsAndAlerts: staticContent(
        id: "how-auctions-work-emails-and-alerts"
      ) {
        content
      }
      conditionsOfSale: staticContent(
        id: "how-auctions-work-conditions-of-sale"
      ) {
        content
      }
    }
  `,
})

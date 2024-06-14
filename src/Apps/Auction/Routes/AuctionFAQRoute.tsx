import { Box, Text, THEME, Spacer, Expandable } from "@artsy/palette"
import { themeGet } from "@styled-system/theme-get"
import { FC } from "react"
import styled from "styled-components"
import { createFragmentContainer, graphql } from "react-relay"
import { AuctionFAQRoute_viewer$data } from "__generated__/AuctionFAQRoute_viewer.graphql"
import { MetaTags } from "Components/MetaTags"
import { toStyle } from "Utils/toStyle"
import { RouterLink } from "System/Components/RouterLink"

interface AuctionFAQRouteProps {
  viewer: AuctionFAQRoute_viewer$data
}

const AuctionFAQRoute: React.FC<AuctionFAQRouteProps> = ({ viewer }) => {
  const {
    biddingContent,
    buyersPremiumTaxesAndFeesContent,
    paymentsAndShippingContent,
    emailsAndAlertsContent,
    conditionsOfSaleContent,
  } = computeProps({ viewer })

  return (
    <>
      <MetaTags title="Auction FAQs | Artsy" />

      <Text variant={["lg-display", "xl"]} mt={2}>
        Auction FAQs
      </Text>

      <Spacer y={2} />

      <Text variant="sm-display" color="black100">
        How can we help you? Below are answers to some of the most common
        questions from collectors.
        <br />
        Need more immediate assistance? Please{" "}
        <RouterLink inline to="mailto:support@artsy.net">
          contact us
        </RouterLink>
        .
      </Text>

      <Spacer y={2} />

      <Section title="Bidding" content={biddingContent} />
      <Section
        title="Buyer's Premium, Taxes & Fees"
        content={buyersPremiumTaxesAndFeesContent}
      />
      <Section
        title="Payments and Shipping"
        content={paymentsAndShippingContent}
      />
      <Section title="Emails and Alerts" content={emailsAndAlertsContent} />
      <Section title="Conditions of Sale" content={conditionsOfSaleContent} />
    </>
  )
}

const Section: React.FC<{
  content: string | null | undefined
  title: string
}> = ({ content, title }) => {
  if (!content) {
    return null
  }

  return (
    <Box my={1}>
      <Expandable label={title}>
        <HTML>{content}</HTML>
      </Expandable>
    </Box>
  )
}

export const AuctionFAQRouteFragmentContainer = createFragmentContainer(
  AuctionFAQRoute,
  {
    viewer: graphql`
      fragment AuctionFAQRoute_viewer on Viewer {
        bidding: staticContent(id: "how-auctions-work-bidding") {
          content(format: HTML)
        }
        buyersPremiumTaxesAndFees: staticContent(
          id: "how-auctions-work-buyers-premium-taxes-and-fees"
        ) {
          content(format: HTML)
        }
        paymentsAndShipping: staticContent(
          id: "how-auctions-work-payments-and-shipping"
        ) {
          content(format: HTML)
        }
        emailsAndAlerts: staticContent(
          id: "how-auctions-work-emails-and-alerts"
        ) {
          content(format: HTML)
        }
        conditionsOfSale: staticContent(
          id: "how-auctions-work-conditions-of-sale"
        ) {
          content(format: HTML)
        }
      }
    `,
  }
)

const computeProps = ({ viewer }: AuctionFAQRouteProps) => {
  const biddingContent = viewer.bidding?.content
  const buyersPremiumTaxesAndFeesContent =
    viewer.buyersPremiumTaxesAndFees?.content
  const paymentsAndShippingContent = viewer.paymentsAndShipping?.content
  const emailsAndAlertsContent = viewer.emailsAndAlerts?.content
  const conditionsOfSaleContent = viewer.conditionsOfSale?.content

  return {
    biddingContent,
    buyersPremiumTaxesAndFeesContent,
    paymentsAndShippingContent,
    emailsAndAlertsContent,
    conditionsOfSaleContent,
  }
}

const HTML: FC<{ children: string }> = ({ children, ...rest }) => {
  return <Container dangerouslySetInnerHTML={{ __html: children }} {...rest} />
}

const Container = styled(Box)`
  h1,
  h2,
  h3,
  h4,
  h5,
  p,
  blockquote,
  pre,
  hr {
    margin: ${themeGet("space.1")} auto;

    &:first-child {
      margin-top: 0;
    }

    &:last-child {
      margin-bottom: 0;
    }
  }

  h1 {
    ${toStyle({ ...THEME.textVariants.xxl })}
  }

  h2 {
    ${toStyle({ ...THEME.textVariants.lg })}

    a {
      text-decoration: none;
    }
  }

  h3 {
    ${toStyle({ ...THEME.textVariants.lg })}
  }

  ul {
    list-style: disc;
  }

  ul,
  ol,
  li {
    margin: ${themeGet("space.2")} auto;

    &:first-child {
      margin-top: 0;
    }

    &:last-child {
      margin-bottom: 0;
    }
  }

  ul,
  ol {
    margin-left: ${themeGet("space.2")};
  }

  p {
    ${toStyle({ ...THEME.textVariants.sm })}
  }

  a {
    transition: color 250ms;

    &:hover {
      color: ${themeGet("colors.brand")};
    }
  }

  hr {
    height: 1px;
    border: 0;
    background-color: ${themeGet("colors.black10")};
  }

  button: first-child {
    border-top: none;
  }
`

import React from "react"
import { AppContainer } from "v2/Apps/Components/AppContainer"
import { createFragmentContainer, graphql } from "react-relay"
import { AuctionsApp_currentSales } from "v2/__generated__/AuctionsApp_currentSales.graphql"
import { AuctionsApp_pastSales } from "v2/__generated__/AuctionsApp_pastSales.graphql"
import { AuctionsApp_me } from "v2/__generated__/AuctionsApp_me.graphql"
import { Box, Text, Flex, Separator, Image, Join, Spacer } from "@artsy/palette"
import { AuctionsMeta } from "./Components/AuctionsMeta"
import { HorizontalPadding } from "../Components/HorizontalPadding"
import { SaleItemFragmentContainer } from "./Components/SaleItem"
import { Footer } from "v2/Components/Footer"
import { RouterLink } from "v2/Artsy/Router/RouterLink"
import styled from "styled-components"
import { MyBidsFragmentContainer } from "./Components/MyBids"

export interface AuctionsAppProps {
  me: AuctionsApp_me
  currentSales: AuctionsApp_currentSales
  pastSales: AuctionsApp_pastSales
}

const AuctionsApp: React.FC<AuctionsAppProps> = ({
  children,
  currentSales,
  pastSales,
  me,
}) => {
  return (
    <AppContainer>
      <AuctionsMeta />
      <HorizontalPadding mt={4}>
        <Flex justifyContent="space-between">
          <Box width={["100%", "70%"]} pr={[0, 6]}>
            <Text variant="largeTitle">Current Auctions</Text>
            <Separator mt={1} mb={3} />
            {currentSales.edges.map(({ node }, index) => {
              return (
                <Box my={4} key={index}>
                  <SaleItemFragmentContainer sale={node} />
                </Box>
              )
            })}

            <Text variant="largeTitle">Past Auctions</Text>
            <Separator mt={1} mb={3} />
            {pastSales.edges.map(({ node }, index) => {
              return (
                <RouterLink
                  to={node.href}
                  style={{ textDecoration: "none" }}
                  key={index}
                >
                  <PastLink justifyContent="space-between" my={1}>
                    <Text variant="subtitle">{node.name}</Text>
                    <Text variant="subtitle">
                      {node.formattedStartDateTime.replace("Ended", "")}
                    </Text>
                  </PastLink>
                </RouterLink>
              )
            })}

            <Box>{children}</Box>
          </Box>
          <Box width="30%" display={["none", "block"]} minWidth={300}>
            <Join separator={<Spacer my={4} />}>
              <Box mt={1}>
                <MyBidsFragmentContainer me={me} />
              </Box>
              <Box>
                <a
                  href="https://apps.apple.com/us/app/artsy-buy-sell-original-art/id703796080"
                  target="_blank"
                  style={{ textDecoration: "none" }}
                >
                  <Flex alignItems="center">
                    <Image
                      src="/images/mobile-cta.png"
                      alt="Bid from your iPhone, download Artsy for iPhone"
                      width={40}
                      mr={1}
                    />
                    <Text>
                      Bid from your phone <br /> Download Artsy for iPhone
                    </Text>
                  </Flex>
                </a>
              </Box>
              <Box>
                <RouterLink
                  to="/how-auctions-work"
                  style={{ textDecoration: "none" }}
                >
                  <Flex alignItems="center">
                    <Image
                      src="/images/kiosk-cta.png"
                      alt="How to bid on Artsy"
                      width={40}
                      mr={1}
                    />
                    <Text>How to Bid on Artsy</Text>
                  </Flex>
                </RouterLink>
              </Box>
              <Box>
                <Text>
                  Interested in partnering with Artsy for your next auction?{" "}
                  <br />
                  <RouterLink to="/auction-partnerships">Learn More</RouterLink>
                </Text>
              </Box>
            </Join>
          </Box>
        </Flex>
      </HorizontalPadding>
      <HorizontalPadding>
        <Footer />
      </HorizontalPadding>
    </AppContainer>
  )
}

export const AuctionsAppFragmentContainer = createFragmentContainer(
  AuctionsApp,
  {
    me: graphql`
      fragment AuctionsApp_me on Me {
        id
        # ...MyBids_me
      }
    `,
    currentSales: graphql`
      fragment AuctionsApp_currentSales on SaleConnection {
        edges {
          node {
            id
            # ...SaleItem_sale
          }
        }
      }
    `,
    pastSales: graphql`
      fragment AuctionsApp_pastSales on SaleConnection {
        edges {
          node {
            name
            formattedStartDateTime
            href
          }
        }
      }
    `,
  }
)

const PastLink = styled(Flex)`
  &:hover {
    text-decoration: underline;
  }
`

import React from "react"
import { AppContainer } from "v2/Apps/Components/AppContainer"
import { createFragmentContainer, graphql } from "react-relay"
import { AuctionsApp_me } from "v2/__generated__/AuctionsApp_me.graphql"
import { ChevronIcon, Box, Flex, Link, Text } from "@artsy/palette"
import { AuctionsMeta } from "./Components/AuctionsMeta"
import { HorizontalPadding } from "../Components/HorizontalPadding"
import { Footer } from "v2/Components/Footer"
import { RouteTabs, RouteTab } from "v2/Components/RouteTabs"

export interface AuctionsAppProps {
  me: AuctionsApp_me
}

const AuctionsApp: React.FC<AuctionsAppProps> = ({ children }) => {
  return (
    <AppContainer>
      <AuctionsMeta />
      <Box mt={3} ml={4}>
        <Text variant="largeTitle">Auctions</Text>
        <Text pt="15px" pb="15px">
          Bid on thousands of new works every week in leading online auctions.
        </Text>
        <Link
          href="https://www.artsy.net/how-auctions-work"
          underlineBehavior="hover"
        >
          <Text variant="mediumText" pt="10px" pb="10px">
            How to bid on Artsy{" "}
            <ChevronIcon
              title={null}
              direction="right"
              color="black"
              height="15px"
              width="14px"
              top="3px"
              left="3px"
            />
          </Text>
        </Link>
      </Box>
      <HorizontalPadding mt={4}>
        <RouteTabs mb={2}>
          <RouteTab exact to="/auctions2">
            Current Auctions
          </RouteTab>
          <RouteTab to="/auctions2/upcoming">Upcoming</RouteTab>
          <RouteTab to="/auctions2/past">Past</RouteTab>
        </RouteTabs>

        <Box>{children}</Box>
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
  }
)

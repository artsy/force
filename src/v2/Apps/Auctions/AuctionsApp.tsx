import React from "react"
import { AppContainer } from "v2/Apps/Components/AppContainer"
import { createFragmentContainer, graphql } from "react-relay"
import { AuctionsApp_me } from "v2/__generated__/AuctionsApp_me.graphql"
import { ChevronIcon, Box, Text } from "@artsy/palette"
import { AuctionsMeta } from "./Components/AuctionsMeta"
import { HorizontalPadding } from "../Components/HorizontalPadding"
import { Footer } from "v2/Components/Footer"
import { RouteTabs, RouteTab } from "v2/Components/RouteTabs"
import { RouterLink } from "v2/Artsy/Router/RouterLink"

export interface AuctionsAppProps {
  me: AuctionsApp_me
}

const AuctionsApp: React.FC<AuctionsAppProps> = ({ children }) => {
  return (
    <AppContainer>
      <AuctionsMeta />
      <Box ml={[2, 4]}>
        <Text pt="20px" pb="10px" variant="largeTitle">
          Auctions
        </Text>
        <Text py="10px">
          Bid on thousands of new works every week in leading online auctions.
        </Text>
        <RouterLink to="/how-auctions-work" noUnderline>
          <Text variant="mediumText" py="10px">
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
        </RouterLink>
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

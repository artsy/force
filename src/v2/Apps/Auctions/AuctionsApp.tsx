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
import { LazyLoadComponent } from "react-lazy-load-image-component"
import { RecentlyViewedQueryRenderer as RecentlyViewed } from "v2/Components/RecentlyViewed"
export interface AuctionsAppProps {
  me: AuctionsApp_me
}

const AuctionsApp: React.FC<AuctionsAppProps> = props => {
  const { children } = props

  return (
    <AppContainer>
      <AuctionsMeta />
      <Box ml={[2, 4]}>
        <Text pt={2} pb={1} variant="largeTitle">
          Auctions
        </Text>
        <Text py={1}>
          Bid on works you love with auctions on Artsy. With live bidding
          opening every week, Artsy connects collectors like you to art from
          leading auction houses and sellers across the globe. We feature
          premium artworks including modern, contemporary, and street art, so
          you can find works by your favorite artists—and discover new ones—all
          in one place.
        </Text>
        <RouterLink to="/how-auctions-work" noUnderline>
          <Text variant="mediumText" py={1}>
            Learn more about bidding on Artsy{" "}
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
        {typeof window !== "undefined" && (
          <>
            <LazyLoadComponent threshold={1000}>
              <RecentlyViewed />
            </LazyLoadComponent>
          </>
        )}
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

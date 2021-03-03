import React from "react"
import { AppContainer } from "v2/Apps/Components/AppContainer"
import { createFragmentContainer, graphql } from "react-relay"
import { AuctionsApp_me } from "v2/__generated__/AuctionsApp_me.graphql"
import { ChevronIcon, Box, Text, Row, Col } from "@artsy/palette"
import { AuctionsMeta } from "./Components/AuctionsMeta"
import { HorizontalPadding } from "../Components/HorizontalPadding"
import { Footer } from "v2/Components/Footer"
import { RouteTabs, RouteTab } from "v2/Components/RouteTabs"
import { RouterLink } from "v2/Artsy/Router/RouterLink"
import { LazyLoadComponent } from "react-lazy-load-image-component"
import { RecentlyViewedQueryRenderer as RecentlyViewed } from "v2/Components/RecentlyViewed"
import { findCurrentRoute } from "v2/Artsy/Router/Utils/findCurrentRoute"
import { Match } from "found"
export interface AuctionsAppProps {
  me: AuctionsApp_me
  match: Match
}

const AuctionsApp: React.FC<AuctionsAppProps> = props => {
  const { children } = props
  const route = findCurrentRoute(props.match)

  return (
    <AppContainer>
      <AuctionsMeta />
      <Box ml={[2, 4]}>
        <Text pt={2} pb={1} variant="largeTitle">
          Auctions
        </Text>
        <Text py={1}>
          Bid on thousands of new works every week in leading online auctions.
        </Text>
        <RouterLink to="/how-auctions-work" noUnderline>
          <Text variant="mediumText" py={1}>
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
        {!route.displayFullPage && typeof window !== "undefined" && (
          <>
            <LazyLoadComponent threshold={1000}>
              <Row>
                <Col>
                  <RecentlyViewed />
                </Col>
              </Row>
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

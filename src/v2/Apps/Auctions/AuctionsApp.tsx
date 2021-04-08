import React from "react"
import { AppContainer } from "v2/Apps/Components/AppContainer"
import { AuctionsApp_viewer } from "v2/__generated__/AuctionsApp_viewer.graphql"
import { AuctionsMeta } from "./Components/AuctionsMeta"
import { MyBidsFragmentContainer } from "./Components/MyBids/MyBids"
import {
  Box,
  ChevronIcon,
  Column,
  GridColumns,
  Separator,
  Text,
} from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { Footer } from "v2/Components/Footer"
import { HorizontalPadding } from "../Components/HorizontalPadding"
import { LazyLoadComponent } from "react-lazy-load-image-component"
import { RecentlyViewedQueryRenderer as RecentlyViewed } from "v2/Components/RecentlyViewed"
import { RouterLink } from "v2/Artsy/Router/RouterLink"
import { RouteTabs, RouteTab } from "v2/Components/RouteTabs"
import { useSystemContext } from "v2/Artsy/useSystemContext"
import { WorksByArtistsYouFollowRailFragmentContainer } from "./Components/WorksByArtistsYouFollowRail/WorksByArtistsYouFollowRail"
export interface AuctionsAppProps {
  viewer: AuctionsApp_viewer
}

const AuctionsApp: React.FC<AuctionsAppProps> = props => {
  const { children, viewer } = props
  const { user } = useSystemContext()

  return (
    <AppContainer>
      <AuctionsMeta />
      <GridColumns>
        <Column span={[12, 6]}>
          <HorizontalPadding>
            <Text mt={3} mb={1} variant="largeTitle">
              Auctions
            </Text>
          </HorizontalPadding>
        </Column>
        <Column span={[12, 6]}>
          <HorizontalPadding>
            <Text mt={3} py={1}>
              Bid on works you love with auctions on Artsy. With bidding opening
              daily, Artsy connects collectors like you to art from leading
              auction houses, nonprofit organizations, and sellers across the
              globe. We feature premium artworks including modern, contemporary,
              and street art, so you can find works by your favorite artists—and
              discover new ones—all in one place.
            </Text>
            <RouterLink
              to="https://support.artsy.net/hc/en-us/sections/360008298773-Bid-at-Auction"
              noUnderline
            >
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
          </HorizontalPadding>
        </Column>
      </GridColumns>

      {user && (
        <HorizontalPadding>
          <Box my={[2, 4]}>
            <MyBidsFragmentContainer me={viewer.me} />
          </Box>

          <Separator />

          <Box my={[2, 4]} pb={2}>
            <WorksByArtistsYouFollowRailFragmentContainer viewer={viewer} />
          </Box>
        </HorizontalPadding>
      )}
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
    viewer: graphql`
      fragment AuctionsApp_viewer on Viewer {
        ...WorksByArtistsYouFollowRail_viewer

        me {
          ...MyBids_me
        }
      }
    `,
  }
)

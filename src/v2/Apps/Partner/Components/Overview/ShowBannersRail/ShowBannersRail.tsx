import React from "react"
import { Box, BoxProps, ProgressDots } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { ShowBannersRail_partner } from "v2/__generated__/ShowBannersRail_partner.graphql"
import { ShowBannersRailRendererQuery } from "v2/__generated__/ShowBannersRailRendererQuery.graphql"
import { compact, take, uniqBy } from "lodash"
import { useSystemContext } from "v2/System"
import { ShowBannersRailPlaceholder } from "./ShowBannersRailPlaceholder"
import { Media } from "v2/Utils/Responsive"
import { SystemQueryRenderer as QueryRenderer } from "v2/System/Relay/SystemQueryRenderer"
import {
  PartnerShowBannersContextProvider,
  usePartnerShowBannersContext,
} from "v2/Apps/Partner/Utils/PartnerShowBannersContex"
import { ShowBannersDesktopCarouselFragmentContainer } from "./ShowBannersDesktopCarousel"
import { ShowBannersMobileCarouselFragmentContainer } from "./ShowBannersMobileCarousel"

interface ShowBannersRailProps extends BoxProps {
  partner: ShowBannersRail_partner
}

const Progress = ({ count }) => {
  const { currentPage } = usePartnerShowBannersContext()
  return (
    <>
      {count > 1 && (
        <ProgressDots mt={[2, 6]} activeIndex={currentPage!} amount={count} />
      )}
    </>
  )
}

const ShowBannersRail: React.FC<ShowBannersRailProps> = ({
  partner,
  ...rest
}) => {
  const { setCurrentPage } = usePartnerShowBannersContext()

  if (!partner) return null

  const featured = compact(partner?.featuredShow?.edges)
  const current = compact(partner?.currentShows?.edges)
  const upcoming = compact(partner?.upcomingShows?.edges)
  const past = compact(partner?.pastShows?.edges)

  let shows = take(
    uniqBy([...featured, ...current, ...upcoming], "node.id"),
    10
  )

  // Display past shows only if no Featured, Current, or Upcoming shows.
  if (shows.length === 0) {
    shows = past
  }

  const showItems = compact(shows.map(c => c.node))

  if (showItems.length === 0) {
    return null
  }

  return (
    <Box {...rest}>
      <Media greaterThan="xs">
        <ShowBannersDesktopCarouselFragmentContainer
          shows={showItems}
          onChange={setCurrentPage}
        />
      </Media>
      <Media at="xs">
        <ShowBannersMobileCarouselFragmentContainer
          shows={showItems}
          onChange={setCurrentPage}
        />
      </Media>
      <Progress count={showItems.length} />
    </Box>
  )
}

const ShowBannersRailFragmentContainer = createFragmentContainer(
  ShowBannersRail,
  {
    partner: graphql`
      fragment ShowBannersRail_partner on Partner {
        slug
        featuredShow: showsConnection(
          first: 1
          status: ALL
          sort: FEATURED_DESC_END_AT_DESC
          isDisplayable: true
        ) {
          edges {
            node {
              id
              ...ShowBannersMobileCarousel_shows
              ...ShowBannersDesktopCarousel_shows
            }
          }
        }
        currentShows: showsConnection(
          first: 10
          status: CURRENT
          sort: END_AT_ASC
          isDisplayable: true
        ) {
          edges {
            node {
              id
              ...ShowBannersMobileCarousel_shows
              ...ShowBannersDesktopCarousel_shows
            }
          }
        }
        upcomingShows: showsConnection(
          first: 10
          status: UPCOMING
          sort: START_AT_ASC
          isDisplayable: true
        ) {
          edges {
            node {
              id
              ...ShowBannersMobileCarousel_shows
              ...ShowBannersDesktopCarousel_shows
            }
          }
        }
        pastShows: showsConnection(
          first: 2
          status: CLOSED
          sort: END_AT_DESC
          isDisplayable: true
        ) {
          edges {
            node {
              id
              ...ShowBannersMobileCarousel_shows
              ...ShowBannersDesktopCarousel_shows
            }
          }
        }
      }
    `,
  }
)

export const ShowBannersRailRenderer: React.FC<
  {
    partnerId: string
  } & Omit<ShowBannersRailProps, "partner">
> = ({ partnerId, ...rest }) => {
  const { relayEnvironment } = useSystemContext()

  return (
    <QueryRenderer<ShowBannersRailRendererQuery>
      environment={relayEnvironment}
      query={graphql`
        query ShowBannersRailRendererQuery($partnerId: String!) {
          partner(id: $partnerId) @principalField {
            ...ShowBannersRail_partner
          }
        }
      `}
      placeholder={<ShowBannersRailPlaceholder count={10} {...rest} />}
      variables={{ partnerId }}
      render={({ error, props }) => {
        if (error || !props)
          return <ShowBannersRailPlaceholder count={10} {...rest} />

        return (
          <PartnerShowBannersContextProvider>
            <ShowBannersRailFragmentContainer {...rest} {...props} />
          </PartnerShowBannersContextProvider>
        )
      }}
    />
  )
}

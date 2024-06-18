import * as React from "react"
import { Box, BoxProps } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { ShowBannersRail_partner$data } from "__generated__/ShowBannersRail_partner.graphql"
import { ShowBannersRailRendererQuery } from "__generated__/ShowBannersRailRendererQuery.graphql"
import { compact, take, uniqBy } from "lodash"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { ShowBannersRailPlaceholder } from "./ShowBannersRailPlaceholder"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { HeroCarousel } from "Components/HeroCarousel/HeroCarousel"
import { ShowBannerFragmentContainer } from "Apps/Partner/Components/PartnerShows"

interface ShowBannersRailProps extends BoxProps {
  partner: ShowBannersRail_partner$data
}

const ShowBannersRail: React.FC<ShowBannersRailProps> = ({
  partner,
  ...rest
}) => {
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
      <HeroCarousel fullBleed={false}>
        {showItems.map(showItem => {
          return (
            <ShowBannerFragmentContainer
              pr={[0.5, 0]}
              key={showItem.id}
              show={showItem}
            />
          )
        })}
      </HeroCarousel>
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
              ...ShowBanner_show
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
              ...ShowBanner_show
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
              ...ShowBanner_show
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
              ...ShowBanner_show
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
    <SystemQueryRenderer<ShowBannersRailRendererQuery>
      lazyLoad
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
          <ShowBannersRailFragmentContainer
            {...rest}
            partner={props.partner!}
          />
        )
      }}
    />
  )
}

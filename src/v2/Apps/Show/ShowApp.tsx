import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import {
  Box,
  Column,
  GridColumns,
  Separator,
  Spacer,
  Text,
} from "@artsy/palette"
import { ShowMetaFragmentContainer as ShowMeta } from "v2/Apps/Show/Components/ShowMeta"
import { ShowHeaderFragmentContainer as ShowHeader } from "./Components/ShowHeader"
import { ShowAboutFragmentContainer as ShowAbout } from "./Components/ShowAbout"
import { ShowInstallShotsFragmentContainer as ShowInstallShots } from "./Components/ShowInstallShots"
import { ShowViewingRoomFragmentContainer as ShowViewingRoom } from "./Components/ShowViewingRoom"
import { ShowApp_show } from "v2/__generated__/ShowApp_show.graphql"
import { ShowArtworksRefetchContainer as ShowArtworksFilter } from "./Components/ShowArtworks"
import { ShowContextCardFragmentContainer as ShowContextCard } from "./Components/ShowContextCard"
import {
  AnalyticsContext,
  useAnalyticsContext,
} from "v2/System/Analytics/AnalyticsContext"
import { ShowArtworksEmptyStateFragmentContainer as ShowArtworksEmptyState } from "./Components/ShowArtworksEmptyState"
import { SharedArtworkFilterContextProps } from "v2/Components/ArtworkFilter/ArtworkFilterContext"
import { RouterLink } from "v2/System/Router/RouterLink"
import { moment } from "desktop/lib/template_modules"

interface ShowAppProps {
  show: ShowApp_show
}

export const ShowApp: React.FC<ShowAppProps> = ({ show }) => {
  const { contextPageOwnerSlug, contextPageOwnerType } = useAnalyticsContext()

  // @ts-expect-error STRICT_NULL_CHECK
  const hasViewingRoom = show.viewingRoomsConnection?.edges.length > 0
  const hasAbout = !!show.about
  const hasWideHeader =
    (hasAbout && hasViewingRoom) || (!hasAbout && !hasViewingRoom)
  const { sidebarAggregations } = show

  const startAt = moment(new Date(show.fair?.startAt!))

  const showFairBooth =
    !show.fair ||
    (!!show.fair.hasFullFeature &&
      !!show.fair.isPublished &&
      (moment().isAfter(startAt, "day") || moment().isSame(startAt, "day")))

  return (
    <>
      <ShowMeta show={show} />

      <>
        <AnalyticsContext.Provider
          value={{
            contextPageOwnerId: show.internalID,
            contextPageOwnerSlug,
            contextPageOwnerType,
          }}
        >
          <Box mt={4} mb={[4, 6]}>
            <ShowInstallShots show={show} mt={4} mb={6} />
          </Box>

          <GridColumns>
            <Column span={hasWideHeader ? [12, 8, 6] : 6} wrap={hasWideHeader}>
              <ShowHeader show={show} />

              {!hasAbout && show.href && (
                <>
                  <Spacer mt={1} />

                  <RouterLink to={`${show.href}/info`}>
                    <Text variant="sm">More info</Text>
                  </RouterLink>
                </>
              )}
            </Column>

            {hasAbout && (
              <Column span={6}>
                <ShowAbout show={show} />

                {show.href && (
                  <RouterLink to={`${show.href}/info`}>
                    <Text variant="sm">More info</Text>
                  </RouterLink>
                )}
              </Column>
            )}

            {hasViewingRoom && (
              <Column span={5} start={8}>
                <ShowViewingRoom show={show} />
              </Column>
            )}
          </GridColumns>

          <Spacer mt={[6, 12]} />

          {/* @ts-expect-error STRICT_NULL_CHECK */}
          {show.counts.eligibleArtworks > 0 ? (
            <ShowArtworksFilter
              aggregations={
                // @ts-expect-error STRICT_NULL_CHECK
                sidebarAggregations.aggregations as SharedArtworkFilterContextProps["aggregations"]
              }
              show={show}
            />
          ) : (
            <>
              <Separator my={2} />
              <ShowArtworksEmptyState show={show} />
            </>
          )}
          {showFairBooth && (
            <>
              <Separator as="hr" my={6} />
              <ShowContextCard show={show} />
            </>
          )}
        </AnalyticsContext.Provider>
      </>
    </>
  )
}

// Top-level route needs to be exported for bundle splitting in the router
export const ShowAppFragmentContainer = createFragmentContainer(ShowApp, {
  show: graphql`
    fragment ShowApp_show on Show
      @argumentDefinitions(
        input: { type: "FilterArtworksInput" }
        aggregations: { type: "[ArtworkAggregation]" }
      ) {
      name
      href
      internalID
      slug
      about: description
      viewingRoomsConnection {
        edges {
          __typename
        }
      }
      counts {
        eligibleArtworks
      }
      fair {
        hasFullFeature
        isPublished
        startAt
      }
      sidebarAggregations: filterArtworksConnection(
        aggregations: $aggregations
        first: 1
      ) {
        aggregations {
          slice
          counts {
            name
            value
            count
          }
        }
      }
      ...ShowHeader_show
      ...ShowAbout_show
      ...ShowMeta_show
      ...ShowInstallShots_show
      ...ShowViewingRoom_show
      ...ShowArtworksEmptyState_show
      ...ShowArtworks_show @arguments(input: $input)
      ...ShowContextCard_show
    }
  `,
})

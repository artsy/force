import { useMemo } from "react"
import * as React from "react"
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
  AnalyticsContextProvider,
  useAnalyticsContext,
} from "v2/System/Analytics/AnalyticsContext"
import { ShowArtworksEmptyStateFragmentContainer as ShowArtworksEmptyState } from "./Components/ShowArtworksEmptyState"
import {
  Counts,
  SharedArtworkFilterContextProps,
} from "v2/Components/ArtworkFilter/ArtworkFilterContext"
import { RouterLink } from "v2/System/Router/RouterLink"
import { ShowNavigationBannerFragmentContainer as ShowNavigationBanner } from "./Components/ShowNavigationBanner"
import { useRouter } from "v2/System/Router/useRouter"

interface ShowAppProps {
  show: ShowApp_show
}

export const ShowApp: React.FC<ShowAppProps> = ({ show }) => {
  const { contextPageOwnerSlug, contextPageOwnerType } = useAnalyticsContext()
  const { match } = useRouter()
  const { from_fair } = match.location.query

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const arrivedFromFair = useMemo(() => from_fair ?? false, [])

  const hasViewingRoom = (show.viewingRoomsConnection?.edges?.length ?? 0) > 0
  const hasAbout = !!show.about
  const hasWideHeader =
    (hasAbout && hasViewingRoom) || (!hasAbout && !hasViewingRoom)
  const { sidebar } = show

  return (
    <>
      <ShowMeta show={show} />

      <>
        <AnalyticsContextProvider
          value={{
            contextPageOwnerId: show.internalID,
            contextPageOwnerSlug,
            contextPageOwnerType,
          }}
        >
          {arrivedFromFair && (
            <ShowNavigationBanner show={show} mt={2} mb={4} />
          )}

          {Number(show?.images?.length) > 0 && (
            <Box my={4}>
              <ShowInstallShots show={show} mt={4} mb={6} />
            </Box>
          )}

          <GridColumns mt={2}>
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

          {(show.counts?.eligibleArtworks ?? 0) > 0 ? (
            <ShowArtworksFilter
              aggregations={
                sidebar?.aggregations as SharedArtworkFilterContextProps["aggregations"]
              }
              counts={sidebar?.counts as Counts}
              show={show}
            />
          ) : (
            <>
              <Separator my={2} />
              <ShowArtworksEmptyState show={show} />
            </>
          )}

          {show.fair?.hasFullFeature !== false && (
            <>
              <Separator as="hr" my={6} />
              <ShowContextCard show={show} />
            </>
          )}
        </AnalyticsContextProvider>
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
        shouldFetchCounts: { type: "Boolean!", defaultValue: false }
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
      }
      sidebar: filterArtworksConnection(aggregations: $aggregations, first: 1) {
        counts @include(if: $shouldFetchCounts) {
          followedArtists
        }
        aggregations {
          slice
          counts {
            name
            value
            count
          }
        }
      }
      images(default: false, size: 100) {
        url
      }
      ...ShowNavigationBanner_show
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

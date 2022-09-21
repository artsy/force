import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import {
  Column,
  GridColumns,
  Join,
  Separator,
  Spacer,
  Text,
} from "@artsy/palette"
import { ShowMetaFragmentContainer as ShowMeta } from "Apps/Show/Components/ShowMeta"
import { ShowHeaderFragmentContainer as ShowHeader } from "./Components/ShowHeader"
import { ShowAboutFragmentContainer as ShowAbout } from "./Components/ShowAbout"
import { ShowInstallShotsFragmentContainer as ShowInstallShots } from "./Components/ShowInstallShots"
import { ShowViewingRoomFragmentContainer as ShowViewingRoom } from "./Components/ShowViewingRoom"
import { ShowApp_show$data } from "__generated__/ShowApp_show.graphql"
import { ShowArtworksRefetchContainer as ShowArtworksFilter } from "./Components/ShowArtworks"
import { ShowContextCardFragmentContainer as ShowContextCard } from "./Components/ShowContextCard"
import {
  AnalyticsContext,
  useAnalyticsContext,
} from "System/Analytics/AnalyticsContext"
import { ShowArtworksEmptyStateFragmentContainer as ShowArtworksEmptyState } from "./Components/ShowArtworksEmptyState"
import {
  Counts,
  SharedArtworkFilterContextProps,
} from "Components/ArtworkFilter/ArtworkFilterContext"
import { RouterLink } from "System/Router/RouterLink"
import { BackToFairBannerFragmentContainer as BackToFairBanner } from "./Components/BackToFairBanner"

interface ShowAppProps {
  show: ShowApp_show$data
}

export const ShowApp: React.FC<ShowAppProps> = ({ show }) => {
  const { contextPageOwnerSlug, contextPageOwnerType } = useAnalyticsContext()

  const hasViewingRoom = (show.viewingRoomsConnection?.edges?.length ?? 0) > 0
  const hasAbout = !!show.about
  const hasWideHeader =
    (hasAbout && hasViewingRoom) || (!hasAbout && !hasViewingRoom)
  const { sidebar, isFairBooth } = show

  return (
    <>
      {/* @ts-ignore RELAY UPGRADE 13 */}
      <ShowMeta show={show} />

      <>
        <AnalyticsContext.Provider
          value={{
            contextPageOwnerId: show.internalID,
            contextPageOwnerSlug,
            contextPageOwnerType,
          }}
        >
          {show.fair?.hasFullFeature && isFairBooth && (
            // @ts-ignore RELAY UPGRADE 13
            <BackToFairBanner show={show} />
          )}

          <Spacer mt={4} />

          <Join separator={<Spacer mt={4} />}>
            {Number(show?.images?.length) > 0 && (
              // @ts-ignore RELAY UPGRADE 13
              <ShowInstallShots show={show} />
            )}

            <GridColumns>
              <Column
                span={hasWideHeader ? [12, 8, 6] : 6}
                wrap={hasWideHeader}
              >
                {/* @ts-ignore RELAY UPGRADE 13 */}
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
                  {/* @ts-ignore RELAY UPGRADE 13 */}
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
                  {/* @ts-ignore RELAY UPGRADE 13 */}
                  <ShowViewingRoom show={show} />
                </Column>
              )}
            </GridColumns>

            {(show.counts?.eligibleArtworks ?? 0) > 0 ? (
              <ShowArtworksFilter
                aggregations={
                  sidebar?.aggregations as SharedArtworkFilterContextProps["aggregations"]
                }
                counts={sidebar?.counts as Counts}
                // @ts-ignore RELAY UPGRADE 13
                show={show}
              />
            ) : (
              <>
                <Separator as="hr" />
                {/* @ts-ignore RELAY UPGRADE 13 */}
                <ShowArtworksEmptyState show={show} />
              </>
            )}

            {!show.fair?.hasFullFeature && (
              <>
                <Separator as="hr" />
                {/* @ts-ignore RELAY UPGRADE 13 */}
                <ShowContextCard show={show} />
              </>
            )}
          </Join>
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
        shouldFetchCounts: { type: "Boolean!", defaultValue: false }
      ) {
      name
      href
      internalID
      slug
      about: description
      isFairBooth
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
      ...BackToFairBanner_show
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

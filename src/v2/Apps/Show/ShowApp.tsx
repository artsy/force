import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { AppContainer } from "v2/Apps/Components/AppContainer"
import { HorizontalPadding } from "v2/Apps/Components/HorizontalPadding"
import { Column, GridColumns, Separator } from "@artsy/palette"
import { ShowMetaFragmentContainer as ShowMeta } from "v2/Apps/Show/Components/ShowMeta"
import { ShowHeaderFragmentContainer as ShowHeader } from "./Components/ShowHeader"
import { ShowAboutFragmentContainer as ShowAbout } from "./Components/ShowAbout"
import { ShowInstallShotsFragmentContainer as ShowInstallShots } from "./Components/ShowInstallShots"
import { ShowContextualLinkFragmentContainer as ShowContextualLink } from "./Components/ShowContextualLink"
import { ShowViewingRoomFragmentContainer as ShowViewingRoom } from "./Components/ShowViewingRoom"
import { ShowApp_show } from "v2/__generated__/ShowApp_show.graphql"
import { ShowArtworksRefetchContainer as ShowArtworks } from "./Components/ShowArtworks"
import { ForwardLink } from "v2/Components/Links/ForwardLink"
import { ShowContextCardFragmentContainer as ShowContextCard } from "./Components/ShowContextCard"
import {
  AnalyticsContext,
  useAnalyticsContext,
} from "v2/Artsy/Analytics/AnalyticsContext"
import { ShowArtworksEmptyStateFragmentContainer as ShowArtworksEmptyState } from "./Components/ShowArtworksEmptyState"
import { SharedArtworkFilterContextProps } from "v2/Components/ArtworkFilter/ArtworkFilterContext"

interface ShowAppProps {
  show: ShowApp_show
}

export const ShowApp: React.FC<ShowAppProps> = ({ show }) => {
  const { contextPageOwnerSlug, contextPageOwnerType } = useAnalyticsContext()

  const hasViewingRoom = show.viewingRoomsConnection?.edges.length > 0
  const hasAbout = !!show.about
  const hasWideHeader =
    (hasAbout && hasViewingRoom) || (!hasAbout && !hasViewingRoom)
  const { sidebarAggregations } = show
  return (
    <>
      <ShowMeta show={show} />

      <AppContainer>
        <AnalyticsContext.Provider
          value={{
            contextPageOwnerId: show.internalID,
            contextPageOwnerSlug,
            contextPageOwnerType,
          }}
        >
          <HorizontalPadding>
            <ShowContextualLink show={show} />
            <ShowInstallShots show={show} my={2} />

            <GridColumns>
              <Column
                span={hasWideHeader ? [12, 8, 6] : 6}
                wrap={hasWideHeader}
              >
                <ShowHeader show={show} />

                {!hasAbout && show.href && (
                  <ForwardLink to={`${show.href}/info`} mt={1}>
                    More info
                  </ForwardLink>
                )}
              </Column>

              {hasAbout && (
                <Column span={6}>
                  <ShowAbout show={show} />

                  {show.href && (
                    <ForwardLink to={`${show.href}/info`} mt={2}>
                      More info
                    </ForwardLink>
                  )}
                </Column>
              )}

              {hasViewingRoom && (
                <Column span={5} start={8}>
                  <ShowViewingRoom show={show} />
                </Column>
              )}
            </GridColumns>

            {show.counts.eligibleArtworks > 0 ? (
              <ShowArtworks
                aggregations={
                  sidebarAggregations.aggregations as SharedArtworkFilterContextProps["aggregations"]
                }
                show={show}
                my={3}
              />
            ) : (
              <>
                <Separator my={3} />
                <ShowArtworksEmptyState show={show} />
              </>
            )}

            <Separator as="hr" my={3} />

            <ShowContextCard show={show} />
          </HorizontalPadding>
        </AnalyticsContext.Provider>
      </AppContainer>
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
      ...ShowContextualLink_show
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

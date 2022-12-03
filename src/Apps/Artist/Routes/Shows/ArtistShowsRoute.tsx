import { Join, Message, Spacer } from "@artsy/palette"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ArtistShowsRoute_viewer$data } from "__generated__/ArtistShowsRoute_viewer.graphql"
import { ArtistShowsGroupRefetchContainer } from "./Components/ArtistShowsGroup"
import { Title } from "react-head"

interface ArtistShowsRouteProps {
  viewer: ArtistShowsRoute_viewer$data
}

const ArtistShowsRoute: React.FC<ArtistShowsRouteProps> = ({ viewer }) => {
  if (!viewer.artist) return null

  const hasCurrentShows = viewer.artist.currentShowsCount?.totalCount ?? 0 > 0
  const hasUpcomingShows = viewer.artist.upcomingShowsCount?.totalCount ?? 0 > 0

  return (
    <>
      <Title>{viewer.artist.name} - Shows</Title>

      {!hasCurrentShows && !hasUpcomingShows && (
        <Message>There aren’t any shows at this time.</Message>
      )}

      <Join separator={<Spacer y={4} />}>
        {viewer.currentShows && (
          <ArtistShowsGroupRefetchContainer
            artist={viewer.currentShows}
            title="Current Shows"
            sort="END_AT_ASC"
            status="running"
          />
        )}

        {viewer.upcomingShows && (
          <ArtistShowsGroupRefetchContainer
            artist={viewer.upcomingShows}
            title="Upcoming Shows"
            sort="START_AT_ASC"
            status="upcoming"
          />
        )}
      </Join>
    </>
  )
}

export const ArtistShowsRouteFragmentContainer = createFragmentContainer(
  ArtistShowsRoute,
  {
    viewer: graphql`
      fragment ArtistShowsRoute_viewer on Viewer
        @argumentDefinitions(
          currentShowsStatus: { type: "String", defaultValue: "running" }
          currentShowsSort: { type: "ShowSorts", defaultValue: END_AT_ASC }
          upcomingShowsStatus: { type: "String", defaultValue: "upcoming" }
          upcomingShowsSort: { type: "ShowSorts", defaultValue: START_AT_ASC }
        ) {
        artist(id: $artistID) {
          name
          # TODO: 'status' should be an enum and accept multiple statuses
          currentShowsCount: showsConnection(first: 1, status: "running") {
            totalCount
          }
          upcomingShowsCount: showsConnection(first: 1, status: "upcoming") {
            totalCount
          }
        }
        # TODO: This top-level aliasing is weird! Should just alias the showsConnection.
        currentShows: artist(id: $artistID) {
          ...ArtistShowsGroup_artist
            @arguments(sort: $currentShowsSort, status: $currentShowsStatus)
          name
        }
        upcomingShows: artist(id: $artistID) {
          ...ArtistShowsGroup_artist
            @arguments(sort: $upcomingShowsSort, status: $upcomingShowsStatus)
        }
      }
    `,
  }
)

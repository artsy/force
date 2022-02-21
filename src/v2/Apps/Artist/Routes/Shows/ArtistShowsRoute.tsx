import { Join, Spacer } from "@artsy/palette"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ArtistShowsRoute_viewer$data } from "v2/__generated__/ArtistShowsRoute_viewer.graphql"
import { ArtistShowsGroupRefetchContainer } from "./Components/ArtistShowsGroup"
import { Title } from "react-head"

interface ArtistShowsRouteProps {
  viewer: ArtistShowsRoute_viewer$data
}

const ArtistShowsRoute: React.FC<ArtistShowsRouteProps> = ({ viewer }) => {
  return (
    <>
      <Title>{`${viewer?.currentShows?.name} - Shows`}</Title>

      <Join separator={<Spacer mb={4} />}>
        <ArtistShowsGroupRefetchContainer
          artist={viewer.currentShows!}
          title="Current Shows"
          sort="END_AT_ASC"
          status="running"
        />
        <ArtistShowsGroupRefetchContainer
          artist={viewer.upcomingShows!}
          title="Upcoming Shows"
          sort="START_AT_ASC"
          status="upcoming"
        />
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

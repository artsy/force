import { Sans, Spacer } from "@artsy/palette"
import { Shows_viewer } from "v2/__generated__/Shows_viewer.graphql"
import React, { SFC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ArtistShowsRefetchContainer as Shows } from "./ArtistShows"

export interface ArtistShowsProps {
  viewer: Shows_viewer
}
export const ShowsRoute: SFC<ArtistShowsProps> = props => {
  const { viewer } = props

  return (
    <>
      <Sans size="6" color="black100">
        All Shows
      </Sans>
      <Spacer mb={-1} />

      <Shows
        sort="END_AT_ASC"
        status="running"
        artist={viewer.artist_currentShows}
        scrollTo="#jumpto-ArtistHeader"
        heading="Currently on view"
        my={4}
      />

      <span id="jumpto-Shows-Upcoming" />

      <Shows
        sort="START_AT_ASC"
        status="upcoming"
        artist={viewer.artist_upcomingShows}
        scrollTo="#jumpto-Shows-Upcoming"
        heading="Upcoming"
        my={4}
      />

      <span id="jumpto-Shows-Past" />

      <Shows
        sort="END_AT_DESC"
        status="closed"
        artist={viewer.artist_pastShows}
        scrollTo="#jumpto-Shows-Past"
        heading="Past"
      />
    </>
  )
}

export const ShowsRouteFragmentContainer = createFragmentContainer(ShowsRoute, {
  viewer: graphql`
    fragment Shows_viewer on Viewer
      @argumentDefinitions(
        currentShowsStatus: { type: "String", defaultValue: "running" }
        currentShowsSort: { type: "ShowSorts", defaultValue: END_AT_ASC }
        upcomingShowsStatus: { type: "String", defaultValue: "upcoming" }
        upcomingShowsSort: { type: "ShowSorts", defaultValue: START_AT_ASC }
        pastShowsStatus: { type: "String", defaultValue: "closed" }
        pastShowsSort: { type: "ShowSorts", defaultValue: END_AT_DESC }
      ) {
      artist_currentShows: artist(id: $artistID) {
        ...ArtistShows_artist
          @arguments(sort: $currentShowsSort, status: $currentShowsStatus)
      }
      artist_upcomingShows: artist(id: $artistID) {
        ...ArtistShows_artist
          @arguments(sort: $upcomingShowsSort, status: $upcomingShowsStatus)
      }
      artist_pastShows: artist(id: $artistID) {
        ...ArtistShows_artist
          @arguments(sort: $pastShowsSort, status: $pastShowsStatus)
      }
    }
  `,
})

// Top-level route needs to be exported for bundle splitting in the router
export default ShowsRouteFragmentContainer

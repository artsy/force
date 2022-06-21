import { Join, Spacer } from "@artsy/palette"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ArtistCVGroupRefetchContainer } from "./Components/ArtistCVGroup"
import { ArtistCVRoute_viewer } from "v2/__generated__/ArtistCVRoute_viewer.graphql"
import { MetaTags } from "v2/Components/MetaTags"

interface ArtistCVRouteProps {
  viewer: ArtistCVRoute_viewer
}

const ArtistCVRoute: React.FC<ArtistCVRouteProps> = ({ viewer }) => {
  return (
    <>
      <MetaTags title={`${viewer?.soloShows?.name} - CV | Artsy`} />

      <Join separator={<Spacer mb={4} />}>
        <ArtistCVGroupRefetchContainer
          artist={viewer.soloShows!}
          title="Solo shows"
        />

        <ArtistCVGroupRefetchContainer
          artist={viewer.groupShows!}
          title="Group shows"
        />

        <ArtistCVGroupRefetchContainer
          artist={viewer.fairBooths!}
          title="Fair booths"
        />
      </Join>
    </>
  )
}

export const ArtistCVRouteFragmentContainer = createFragmentContainer(
  ArtistCVRoute,
  {
    viewer: graphql`
      fragment ArtistCVRoute_viewer on Viewer
        @argumentDefinitions(
          soloShowsAtAFair: { type: "Boolean", defaultValue: false }
          soloShowsSoloShow: { type: "Boolean", defaultValue: true }
          groupShowsAtAFair: { type: "Boolean", defaultValue: false }
          fairBoothsAtAFair: { type: "Boolean", defaultValue: true }
        ) {
        soloShows: artist(id: $artistID) {
          ...ArtistCVGroup_artist
            @arguments(atAFair: $soloShowsAtAFair, soloShow: $soloShowsSoloShow)
          name
        }
        groupShows: artist(id: $artistID) {
          ...ArtistCVGroup_artist @arguments(atAFair: $groupShowsAtAFair)
        }
        fairBooths: artist(id: $artistID) {
          ...ArtistCVGroup_artist @arguments(atAFair: $fairBoothsAtAFair)
        }
      }
    `,
  }
)

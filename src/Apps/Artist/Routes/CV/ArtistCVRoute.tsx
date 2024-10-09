import { Join, Spacer } from "@artsy/palette"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ArtistCVGroupRefetchContainer } from "./Components/ArtistCVGroup"
import { ArtistCVRoute_viewer$data } from "__generated__/ArtistCVRoute_viewer.graphql"
import { MetaTags } from "Components/MetaTags"

interface ArtistCVRouteProps {
  viewer: ArtistCVRoute_viewer$data
}

const ArtistCVRoute: React.FC<ArtistCVRouteProps> = ({ viewer }) => {
  if (!viewer) {
    return null
  }

  return (
    <>
      <MetaTags title={`${viewer?.soloShows?.name} - CV | Artsy`} />

      <Join separator={<Spacer y={4} />}>
        <ArtistCVGroupRefetchContainer
          artist={viewer.soloShows}
          title="Solo shows"
        />

        <ArtistCVGroupRefetchContainer
          artist={viewer.groupShows}
          title="Group shows"
        />

        <ArtistCVGroupRefetchContainer
          artist={viewer.fairBooths}
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
      fragment ArtistCVRoute_viewer on Viewer {
        soloShows: artist(id: $artistID)
          @principalField
          @required(action: NONE) {
          ...ArtistCVGroup_artist @arguments(atAFair: false, soloShow: true)
          name
        }
        groupShows: artist(id: $artistID) @required(action: NONE) {
          ...ArtistCVGroup_artist @arguments(atAFair: false, soloShow: false)
        }
        fairBooths: artist(id: $artistID) @required(action: NONE) {
          ...ArtistCVGroup_artist @arguments(atAFair: true)
        }
      }
    `,
  }
)

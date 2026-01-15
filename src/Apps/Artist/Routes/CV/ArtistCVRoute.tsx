import { Stack, Text } from "@artsy/palette"
import type { ArtistCVRoute_viewer$data } from "__generated__/ArtistCVRoute_viewer.graphql"
import type * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ArtistCVGroupRefetchContainer } from "./Components/ArtistCVGroup"

interface ArtistCVRouteProps {
  viewer: ArtistCVRoute_viewer$data
}

const ArtistCVRoute: React.FC<React.PropsWithChildren<ArtistCVRouteProps>> = ({
  viewer,
}) => {
  if (!viewer) {
    return null
  }

  return (
    <>
      <Stack gap={4}>
        <Text as="h1" variant="xl">
          {viewer.artist.name} CV
        </Text>

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
      </Stack>
    </>
  )
}

export const ArtistCVRouteFragmentContainer = createFragmentContainer(
  ArtistCVRoute,
  {
    viewer: graphql`
      fragment ArtistCVRoute_viewer on Viewer {
        artist(id: $artistID) @principalField @required(action: NONE) {
          name
          slug
        }
        soloShows: artist(id: $artistID) @required(action: NONE) {
          ...ArtistCVGroup_artist @arguments(atAFair: false, soloShow: true)
        }
        groupShows: artist(id: $artistID) @required(action: NONE) {
          ...ArtistCVGroup_artist @arguments(atAFair: false, soloShow: false)
        }
        fairBooths: artist(id: $artistID) @required(action: NONE) {
          ...ArtistCVGroup_artist @arguments(atAFair: true)
        }
      }
    `,
  },
)

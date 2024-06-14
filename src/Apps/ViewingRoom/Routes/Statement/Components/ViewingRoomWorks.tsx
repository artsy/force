import * as React from "react"
import { Column, GridColumns } from "@artsy/palette"
import { useRouter } from "System/Hooks/useRouter"
import { createFragmentContainer, graphql } from "react-relay"
import { ViewingRoomWorks_viewingRoom$data } from "__generated__/ViewingRoomWorks_viewingRoom.graphql"
import { ViewWorksButton } from "./ViewWorksButton"
import { extractNodes } from "Utils/extractNodes"
import { ViewingRoomWorksArtworkFragmentContainer } from "./ViewingRoomWorksArtwork"

interface ViewingRoomWorksProps {
  viewingRoom: ViewingRoomWorks_viewingRoom$data
}

const ViewingRoomWorks: React.FC<ViewingRoomWorksProps> = ({ viewingRoom }) => {
  const artworks = extractNodes(viewingRoom.artworksConnection)

  const {
    match: {
      params: { slug },
    },
  } = useRouter()

  return (
    <GridColumns gridRowGap={4}>
      {artworks.map(artwork => {
        return (
          <Column
            span={6}
            key={artwork.internalID}
            display="flex"
            alignItems="flex-end"
          >
            <ViewingRoomWorksArtworkFragmentContainer
              to={`/viewing-room/${slug}/works`}
              artwork={artwork}
            />
          </Column>
        )
      })}

      <Column span={4}>
        <ViewWorksButton
          artworksCount={viewingRoom.artworksConnection?.totalCount ?? 0}
        />
      </Column>
    </GridColumns>
  )
}

export const ViewingRoomWorksFragmentContainer = createFragmentContainer(
  ViewingRoomWorks,
  {
    viewingRoom: graphql`
      fragment ViewingRoomWorks_viewingRoom on ViewingRoom {
        artworksConnection(first: 2) {
          totalCount
          edges {
            node {
              internalID
              ...ViewingRoomWorksArtwork_artwork
            }
          }
        }
      }
    `,
  }
)

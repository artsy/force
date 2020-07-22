import React from "react"
import { Box, Image, Join, Spacer } from "@artsy/palette"
import { ViewingRoomCarousel } from "../../Components/ViewingRoomCarousel"
import { ViewingRoomArtworkDetailsFragmentContainer as ViewingRoomArtworkDetails } from "./Components/ViewingRoomArtworkDetails"
import { createFragmentContainer, graphql } from "react-relay"
import { ViewingRoomWorksRoute_viewingRoom } from "v2/__generated__/ViewingRoomWorksRoute_viewingRoom.graphql"

interface WorksRouteProps {
  viewingRoom: ViewingRoomWorksRoute_viewingRoom
}

const ViewingRoomWorksRoute: React.FC<WorksRouteProps> = ({ viewingRoom }) => {
  const carouselHeight = [350, 550]
  const carouselItemRender = ({
    resized: { url, width, height },
    internalID,
    title,
  }): React.ReactElement => {
    return (
      <Box key={internalID} width="auto" height={carouselHeight} mr="2px">
        <Image src={url} alt={title} width="auto" height={carouselHeight} />
      </Box>
    )
  }
  return (
    <Join separator={<Spacer my={4} />}>
      {viewingRoom.artworksConnection.edges.map(({ node: artwork }) => {
        return (
          <Box key={artwork.internalID} id={artwork.internalID}>
            <ViewingRoomCarousel
              height={carouselHeight}
              data={artwork.images}
              render={carouselItemRender}
            />
            <Spacer my={2} />
            <Box mb={9} px={[2, 0]}>
              <ViewingRoomArtworkDetails artwork={artwork} />
            </Box>
          </Box>
        )
      })}
    </Join>
  )
}

export const ViewingRoomWorksRouteFragmentContainer = createFragmentContainer(
  ViewingRoomWorksRoute,
  {
    viewingRoom: graphql`
      fragment ViewingRoomWorksRoute_viewingRoom on ViewingRoom {
        artworksConnection {
          edges {
            node {
              internalID
              title
              images {
                internalID
                # requesting the largest size and resizing it down to 550*2 for retina
                resized(height: 1100, version: "normalized") {
                  url
                  width
                  height
                }
              }
              ...ViewingRoomArtworkDetails_artwork
            }
          }
        }
      }
    `,
  }
)

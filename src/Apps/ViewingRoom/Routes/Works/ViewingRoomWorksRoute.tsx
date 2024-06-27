import * as React from "react"
import {
  Box,
  Column,
  GridColumns,
  Image,
  Join,
  ResponsiveBox,
  Shelf,
  Spacer,
} from "@artsy/palette"
import { ViewingRoomArtworkDetailsFragmentContainer as ViewingRoomArtworkDetails } from "./Components/ViewingRoomArtworkDetails"
import { createFragmentContainer, graphql } from "react-relay"
import { ViewingRoomWorksRoute_viewingRoom$data } from "__generated__/ViewingRoomWorksRoute_viewingRoom.graphql"
import { extractNodes } from "Utils/extractNodes"
import { compact } from "lodash"
import { Media } from "Utils/Responsive"

interface WorksRouteProps {
  viewingRoom: ViewingRoomWorksRoute_viewingRoom$data
}

const ViewingRoomWorksRoute: React.FC<WorksRouteProps> = ({ viewingRoom }) => {
  const artworks = extractNodes(viewingRoom.artworksConnection)

  return (
    <GridColumns>
      <Column span={6} start={4}>
        <Join separator={<Spacer y={6} />}>
          {artworks.map(artwork => {
            const images = compact(artwork.images ?? [])

            return (
              <Box key={artwork.internalID} id={artwork.internalID}>
                {images.length > 1 ? (
                  <Shelf mb={2}>
                    {images.map(image => {
                      const img = image?.resized

                      if (!img) return <></>

                      return (
                        <React.Fragment key={img.src}>
                          <Media at="xs">
                            <Image
                              src={img.src}
                              srcSet={img.srcSet}
                              lazyLoad
                              alt=""
                              style={{
                                display: "block",
                                width: (img.width ?? 0) * 0.5,
                                height: (img.height ?? 0) * 0.5,
                              }}
                            />
                          </Media>

                          <Media greaterThan="xs">
                            <Image
                              src={img.src}
                              srcSet={img.srcSet}
                              lazyLoad
                              alt=""
                              style={{
                                display: "block",
                                width: img.width ?? 0,
                                height: img.height ?? 0,
                              }}
                            />
                          </Media>
                        </React.Fragment>
                      )
                    })}
                  </Shelf>
                ) : (
                  <ResponsiveBox
                    aspectWidth={images[0].solo?.width ?? 1}
                    aspectHeight={images[0].solo?.height ?? 1}
                    maxWidth="100%"
                    mx="auto"
                    mb={1}
                  >
                    <Image
                      src={images[0].solo?.src}
                      srcSet={images[0].solo?.srcSet}
                      width="100%"
                      height="100%"
                      lazyLoad
                      alt=""
                      style={{ display: "block" }}
                    />
                  </ResponsiveBox>
                )}

                <ViewingRoomArtworkDetails artwork={artwork} />
              </Box>
            )
          })}
        </Join>
      </Column>
    </GridColumns>
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
                solo: resized(quality: 85, width: 600, version: "normalized") {
                  src
                  srcSet
                  width
                  height
                }
                resized(quality: 85, height: 550, version: "normalized") {
                  src
                  srcSet
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

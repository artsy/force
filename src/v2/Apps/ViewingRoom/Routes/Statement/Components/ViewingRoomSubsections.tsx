import React, { Fragment } from "react"
import { Box, Image, Sans, Serif, Spacer } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"

import { ViewingRoomSubsections_viewingRoom } from "v2/__generated__/ViewingRoomSubsections_viewingRoom.graphql"
import { resize } from "v2/Utils/resizer"

interface ViewingRoomSubsectionsProps {
  viewingRoom: ViewingRoomSubsections_viewingRoom
}

const ViewingRoomSubsections: React.FC<ViewingRoomSubsectionsProps> = ({
  viewingRoom: { subsections },
}) => {
  if (subsections.length === 0) {
    return null
  }

  return (
    <Box>
      {subsections.map(({ internalID, title, body, image, caption }) => {
        const imageURL = resize(image?.imageURLs?.normalized, {
          width: 1200,
          convert_to: "jpg",
        })
        return (
          <Fragment key={internalID}>
            <>
              {title && (
                <Box>
                  <Sans size="5">{title}</Sans>
                </Box>
              )}

              {body && (
                <>
                  <Spacer my={1} />
                  <Box>
                    <Serif size={["4", "5"]} style={{ whiteSpace: "pre-wrap" }}>
                      {body}
                    </Serif>
                  </Box>
                </>
              )}

              {imageURL && (
                <>
                  <Spacer my={4} />
                  <Box>
                    <Box width="100%">
                      <Image width="100%" src={imageURL} alt={title} />
                    </Box>
                    {caption && (
                      <>
                        <Spacer my={1} />
                        <Box>
                          <Sans size="2" color="black60">
                            {caption}
                          </Sans>
                        </Box>
                      </>
                    )}
                  </Box>
                </>
              )}
            </>
            <Spacer my={4} />
          </Fragment>
        )
      })}
    </Box>
  )
}

export const ViewingRoomSubsectionsFragmentContainer = createFragmentContainer(
  ViewingRoomSubsections,
  {
    viewingRoom: graphql`
      fragment ViewingRoomSubsections_viewingRoom on ViewingRoom {
        subsections {
          internalID
          title
          body
          image {
            imageURLs {
              normalized
            }
          }
          caption
        }
      }
    `,
  }
)

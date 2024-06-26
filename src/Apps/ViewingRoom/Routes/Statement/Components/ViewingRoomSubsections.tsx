import React from "react"
import { Box, Image, Join, ResponsiveBox, Spacer, Text } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { ViewingRoomSubsections_viewingRoom$data } from "__generated__/ViewingRoomSubsections_viewingRoom.graphql"
import { resized } from "Utils/resized"

interface ViewingRoomSubsectionsProps {
  viewingRoom: ViewingRoomSubsections_viewingRoom$data
}

const ViewingRoomSubsections: React.FC<ViewingRoomSubsectionsProps> = ({
  viewingRoom: { subsections },
}) => {
  if (subsections.length === 0) {
    return null
  }

  return (
    <Join separator={<Spacer y={4} />}>
      {subsections.map(({ internalID, title, body, image, caption }) => {
        const img = image?.imageURLs?.normalized
          ? resized(image?.imageURLs?.normalized, {
              quality: 85,
              width: 1200,
            })
          : null

        return (
          <Box key={internalID}>
            {title && (
              <Text variant="lg-display" mt={2}>
                {title}
              </Text>
            )}

            {body && (
              <Text variant="sm" mt={2} style={{ whiteSpace: "pre-wrap" }}>
                {body}
              </Text>
            )}

            {img && (
              <>
                <Spacer y={4} />

                <ResponsiveBox
                  aspectWidth={image?.width ?? 1}
                  aspectHeight={image?.height ?? 1}
                  maxWidth="100%"
                >
                  <Image
                    src={img.src}
                    srcSet={img.srcSet}
                    width="100%"
                    height="100%"
                    alt=""
                    lazyLoad
                    style={{ display: "block" }}
                  />
                </ResponsiveBox>

                {caption && (
                  <Text variant="xs" color="black60" mt={1}>
                    {caption}
                  </Text>
                )}
              </>
            )}
          </Box>
        )
      })}
    </Join>
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
            width
            height
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

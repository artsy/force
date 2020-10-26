import React from "react"
import { Box, BoxProps, MediumCard, ResponsiveBox, Text } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { ShowViewingRoom_show } from "v2/__generated__/ShowViewingRoom_show.graphql"
import { RouterLink } from "v2/Artsy/Router/RouterLink"
import { crop } from "v2/Utils/resizer"
import { getTagProps } from "v2/Components/ViewingRoomCard"

interface ShowViewingRoomProps extends BoxProps {
  show: ShowViewingRoom_show
}

export const ShowViewingRoom: React.FC<ShowViewingRoomProps> = ({
  show,
  ...rest
}) => {
  const [{ node: viewingRoom }] = show.viewingRoomsConnection.edges

  const thumbnail = crop(viewingRoom.image.imageURLs.normalized, {
    width: 900,
    height: 1200,
  })

  return (
    <Box {...rest}>
      <Text variant="mediumText" mb={1}>
        Viewing Room
      </Text>

      <ResponsiveBox maxWidth="100%" aspectWidth={3} aspectHeight={4}>
        <RouterLink to={viewingRoom.href}>
          <MediumCard
            width="100%"
            height="100%"
            image={thumbnail}
            title={viewingRoom.title}
            subtitle={show.partner?.name}
            tag={getTagProps(
              viewingRoom.status,
              viewingRoom.distanceToOpen,
              viewingRoom.distanceToClose
            )}
          />
        </RouterLink>
      </ResponsiveBox>
    </Box>
  )
}

export const ShowViewingRoomFragmentContainer = createFragmentContainer(
  ShowViewingRoom,
  {
    show: graphql`
      fragment ShowViewingRoom_show on Show {
        partner {
          ... on Partner {
            name
          }
          ... on ExternalPartner {
            name
          }
        }
        viewingRoomsConnection {
          edges {
            node {
              status
              distanceToOpen(short: true)
              distanceToClose(short: true)
              title
              href
              image {
                imageURLs {
                  normalized
                }
              }
            }
          }
        }
      }
    `,
  }
)

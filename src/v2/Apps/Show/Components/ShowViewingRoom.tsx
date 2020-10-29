import React from "react"
import { Box, BoxProps, MediumCard, ResponsiveBox, Text } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { ShowViewingRoom_show } from "v2/__generated__/ShowViewingRoom_show.graphql"
import { RouterLink } from "v2/Artsy/Router/RouterLink"
import { getTagProps } from "v2/Components/ViewingRoomCard"
import { cropped } from "v2/Utils/resized"
import { useTracking } from "v2/Artsy"
import { useAnalyticsContext } from "v2/Artsy/Analytics/AnalyticsContext"
import {
  ActionType,
  ClickedViewingRoomCard,
  ContextModule,
  OwnerType,
} from "@artsy/cohesion"

interface ShowViewingRoomProps extends BoxProps {
  show: ShowViewingRoom_show
}

export const ShowViewingRoom: React.FC<ShowViewingRoomProps> = ({
  show,
  ...rest
}) => {
  const [{ node: viewingRoom }] = show.viewingRoomsConnection.edges

  const image = cropped(viewingRoom.image?.imageURLs?.normalized, {
    width: 450,
    height: 600,
  })

  const tracking = useTracking()
  const {
    contextPageOwnerId,
    contextPageOwnerSlug,
    contextPageOwnerType,
  } = useAnalyticsContext()

  const handleClick = () => {
    const payload: ClickedViewingRoomCard = {
      action: ActionType.clickedViewingRoomCard,
      context_module: ContextModule.associatedViewingRoom,
      context_page_owner_type: contextPageOwnerType,
      context_page_owner_id: contextPageOwnerId,
      context_page_owner_slug: contextPageOwnerSlug,
      destination_page_owner_type: OwnerType.viewingRoom,
      destination_page_owner_id: viewingRoom.internalID,
      destination_page_owner_slug: viewingRoom.slug,
      type: "thumbnail",
    }

    tracking.trackEvent(payload)
  }

  return (
    <Box {...rest}>
      <Text variant="mediumText" mb={1}>
        Viewing Room
      </Text>

      <ResponsiveBox maxWidth="100%" aspectWidth={3} aspectHeight={4}>
        <RouterLink to={viewingRoom.href} onClick={handleClick}>
          <MediumCard
            width="100%"
            height="100%"
            image={image}
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
              internalID
              slug
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

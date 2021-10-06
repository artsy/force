import React from "react"
import { Box, BoxProps, Card, ResponsiveBox, Text } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { ShowViewingRoom_show } from "v2/__generated__/ShowViewingRoom_show.graphql"
import { RouterLink } from "v2/System/Router/RouterLink"
import { getCardStatus } from "v2/Components/ViewingRoomCard"
import { cropped } from "v2/Utils/resized"
import { useTracking } from "v2/System"
import { useAnalyticsContext } from "v2/System/Analytics/AnalyticsContext"
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
  // @ts-expect-error STRICT_NULL_CHECK
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
      // @ts-expect-error STRICT_NULL_CHECK
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
      <Text variant="xs" textTransform="uppercase" mb={2}>
        Viewing Room
      </Text>

      <ResponsiveBox maxWidth="100%" aspectWidth={3} aspectHeight={4}>
        <RouterLink to={viewingRoom.href} onClick={handleClick}>
          <Card
            maxWidth="100%"
            image={image}
            title={viewingRoom.title}
            subtitle={show.partner?.name}
            status={getCardStatus(
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

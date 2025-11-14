import {
  ActionType,
  type ClickedViewingRoomCard,
  ContextModule,
  OwnerType,
} from "@artsy/cohesion"
import { Box, type BoxProps, Card, ResponsiveBox, Text } from "@artsy/palette"
import { getStatus } from "Apps/ViewingRoom/Utils/getStatus"
import { RouterLink } from "System/Components/RouterLink"
import { useAnalyticsContext } from "System/Hooks/useAnalyticsContext"
import { extractNodes } from "Utils/extractNodes"
import { cropped } from "Utils/resized"
import type { ShowViewingRoom_show$data } from "__generated__/ShowViewingRoom_show.graphql"
import type * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useTracking } from "react-tracking"

interface ShowViewingRoomProps extends BoxProps {
  show: ShowViewingRoom_show$data
}

export const ShowViewingRoom: React.FC<
  React.PropsWithChildren<ShowViewingRoomProps>
> = ({ show, ...rest }) => {
  const [viewingRoom] = extractNodes(show.viewingRoomsConnection)

  const image = cropped(viewingRoom.image?.imageURLs?.normalized!, {
    width: 450,
    height: 600,
  })

  const tracking = useTracking()
  const { contextPageOwnerId, contextPageOwnerSlug, contextPageOwnerType } =
    useAnalyticsContext()

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
      <Text variant="xs" mb={2}>
        Viewing Room
      </Text>

      <ResponsiveBox maxWidth="100%" aspectWidth={3} aspectHeight={4}>
        <RouterLink to={viewingRoom.href} onClick={handleClick}>
          <Card
            maxWidth="100%"
            image={image}
            title={viewingRoom.title}
            subtitle={show.partner?.name}
            status={getStatus({
              status: viewingRoom.status,
              distanceToOpen: viewingRoom.distanceToOpen,
              distanceToClose: viewingRoom.distanceToClose,
            })}
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
  },
)

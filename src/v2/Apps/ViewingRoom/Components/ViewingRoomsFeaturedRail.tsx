import * as React from "react"
import { Card, Shelf } from "@artsy/palette"
import { ViewingRoomsFeaturedRail_featuredViewingRooms$data } from "v2/__generated__/ViewingRoomsFeaturedRail_featuredViewingRooms.graphql"
import { createFragmentContainer, graphql } from "react-relay"
import { cropped } from "v2/Utils/resized"
import { extractNodes } from "../../../Utils/extractNodes"
import { RouterLink } from "v2/System/Router/RouterLink"
import { getStatus } from "../Utils/getStatus"

interface ViewingRoomsFeaturedRailProps {
  featuredViewingRooms: ViewingRoomsFeaturedRail_featuredViewingRooms$data
}

export const ViewingRoomsFeaturedRail: React.FC<ViewingRoomsFeaturedRailProps> = ({
  featuredViewingRooms,
}) => {
  const viewingRooms = extractNodes(featuredViewingRooms)

  if (viewingRooms.length === 0) {
    return null
  }

  return (
    <Shelf>
      {viewingRooms.map(viewingRoom => {
        const image = cropped(viewingRoom.image?.imageURLs?.normalized!, {
          width: 280,
          height: 370,
        })

        const status = getStatus({
          status: viewingRoom.status,
          distanceToOpen: viewingRoom.distanceToOpen,
          distanceToClose: viewingRoom.distanceToClose,
        })

        return (
          <RouterLink
            key={viewingRoom.slug}
            display="block"
            to={`/viewing-room/${viewingRoom.slug}`}
          >
            <Card
              width={280}
              image={image}
              title={viewingRoom.title}
              subtitle={viewingRoom.partner?.name}
              status={status}
            />
          </RouterLink>
        )
      })}
    </Shelf>
  )
}
export const ViewingRoomsFeaturedRailFragmentContainer = createFragmentContainer(
  ViewingRoomsFeaturedRail,
  {
    featuredViewingRooms: graphql`
      fragment ViewingRoomsFeaturedRail_featuredViewingRooms on ViewingRoomConnection {
        edges {
          node {
            status
            slug
            title
            image {
              imageURLs {
                normalized
              }
            }
            distanceToOpen(short: true)
            distanceToClose(short: true)
            partner {
              name
            }
          }
        }
      }
    `,
  }
)

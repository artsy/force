import * as React from "react"
import { Card, Shelf } from "@artsy/palette"
import { ViewingRoomsFeaturedRail_featuredViewingRooms$data } from "__generated__/ViewingRoomsFeaturedRail_featuredViewingRooms.graphql"
import { createFragmentContainer, graphql } from "react-relay"
import { cropped } from "Utils/resized"
import { extractNodes } from "Utils/extractNodes"
import { RouterLink } from "System/Components/RouterLink"
import { getStatus } from "Apps/ViewingRoom/Utils/getStatus"
import { useStableShuffle } from "Utils/Hooks/useStableShuffle"

interface ViewingRoomsFeaturedRailProps {
  featuredViewingRooms: ViewingRoomsFeaturedRail_featuredViewingRooms$data
}

export const ViewingRoomsFeaturedRail: React.FC<ViewingRoomsFeaturedRailProps> = ({
  featuredViewingRooms,
}) => {
  const viewingRooms = extractNodes(featuredViewingRooms)
  const { shuffled } = useStableShuffle({ items: viewingRooms })

  if (shuffled.length === 0) {
    return null
  }

  return (
    <Shelf>
      {shuffled.map(viewingRoom => {
        const imageURL = viewingRoom.image?.imageURLs?.normalized

        const image = !!imageURL
          ? cropped(imageURL, {
              width: 280,
              height: 370,
            })
          : undefined

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
              // TODO: Fix Palette type so that `undefined` is valid for `image`
              // @ts-ignore
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

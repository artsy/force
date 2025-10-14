import { Card, Join, Shelf, Spacer, Text } from "@artsy/palette"
import { getStatus } from "Apps/ViewingRoom/Utils/getStatus"
import { RouterLink } from "System/Components/RouterLink"
import { useStableShuffle } from "Utils/Hooks/useStableShuffle"
import { extractNodes } from "Utils/extractNodes"
import { cropped } from "Utils/resized"
import type { ViewingRoomsFeaturedRail_featuredViewingRooms$data } from "__generated__/ViewingRoomsFeaturedRail_featuredViewingRooms.graphql"
import type * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"

interface ViewingRoomsFeaturedRailProps {
  featuredViewingRooms: ViewingRoomsFeaturedRail_featuredViewingRooms$data
}

export const ViewingRoomsFeaturedRail: React.FC<
  React.PropsWithChildren<ViewingRoomsFeaturedRailProps>
> = ({ featuredViewingRooms }) => {
  const viewingRooms = extractNodes(featuredViewingRooms)

  if (viewingRooms.length === 0) {
    return null
  }

  const { shuffled } = useStableShuffle({ items: viewingRooms })

  return (
    <Join separator={<Spacer y={6} />}>
      <Text variant="lg-display">Featured</Text>

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
    </Join>
  )
}
export const ViewingRoomsFeaturedRailFragmentContainer =
  createFragmentContainer(ViewingRoomsFeaturedRail, {
    featuredViewingRooms: graphql`
      fragment ViewingRoomsFeaturedRail_featuredViewingRooms on ViewingRoomsConnection {
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
  })

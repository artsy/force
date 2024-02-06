import * as React from "react"
import { graphql, useFragment } from "react-relay"
import { RouterLink, RouterLinkProps } from "System/Router/RouterLink"
import { NotificationViewingRoom_viewingRoom$key } from "__generated__/NotificationViewingRoom_viewingRoom.graphql"
import { AuthContextModule } from "@artsy/cohesion"
import { Box, Button, Image, Spacer, Text } from "@artsy/palette"
import { resized } from "Utils/resized"

const MAX_WIDTH = 600

export interface NotificationViewingRoomProps
  extends Omit<RouterLinkProps, "to" | "width"> {
  viewingRoom: NotificationViewingRoom_viewingRoom$key
  contextModule?: AuthContextModule
  onClick?: () => void
}

export const NotificationViewingRoom: React.FC<NotificationViewingRoomProps> = ({
  viewingRoom: viewingRoomProp,
  contextModule,
  onClick,
  ...rest
}) => {
  const viewingRoom = useFragment(
    notificationViewingRoomFragment,
    viewingRoomProp
  )

  if (!viewingRoom?.image?.imageURLs?.normalized) {
    return null
  }

  const image = resized(viewingRoom.image.imageURLs.normalized, {
    width: MAX_WIDTH,
  })

  return (
    <>
      <RouterLink
        to={viewingRoom?.href}
        onClick={onClick}
        display="flex"
        flexDirection="column"
        textDecoration="none"
        aria-label={viewingRoom?.title}
        maxWidth={MAX_WIDTH}
        overflow="hidden"
        width="100%"
        {...rest}
        mb={2}
      >
        <Box
          width="100%"
          style={{
            aspectRatio: `${viewingRoom.image?.width ?? 1} / ${
              viewingRoom.image?.height ?? 1
            }`,
          }}
          bg="black10"
        >
          <Image
            data-testid="viewing-room-image"
            src={image.src}
            srcSet={image.srcSet}
            width="100%"
            height="100%"
            lazyLoad
            alt=""
          />
        </Box>

        <Spacer y={1} />

        <Text variant="md">{viewingRoom?.title}</Text>
        <Text variant="sm-display" color="black60">
          {viewingRoom?.introStatement}
        </Text>
      </RouterLink>

      <Box mb={4} width="100%" maxWidth={MAX_WIDTH}>
        <Button
          // @ts-ignore
          as={RouterLink}
          to={viewingRoom?.href}
          onClick={onClick}
          data-testid="view-works-button"
        >
          View Works
        </Button>
      </Box>
    </>
  )
}

const notificationViewingRoomFragment = graphql`
  fragment NotificationViewingRoom_viewingRoom on ViewingRoom {
    title
    href
    introStatement
    image {
      imageURLs {
        normalized
      }
      width
      height
    }
  }
`

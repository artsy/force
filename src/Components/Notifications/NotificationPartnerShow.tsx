import * as React from "react"
import { graphql, useFragment } from "react-relay"
import { RouterLink, RouterLinkProps } from "System/Router/RouterLink"
import { AuthContextModule } from "@artsy/cohesion"
import { Box, Button, Image, ResponsiveBox, Spacer, Text } from "@artsy/palette"
import { NotificationPartnerShow_show$key } from "__generated__/NotificationPartnerShow_show.graphql"
import { compact } from "lodash"

const MAX_WIDTH = 600

export interface NotificationShowProps
  extends Omit<RouterLinkProps, "to" | "width"> {
  show: NotificationPartnerShow_show$key
  contextModule?: AuthContextModule
  onClick?: () => void
}

export const NotificationPartnerShow: React.FC<NotificationShowProps> = ({
  show: showProp,
  contextModule,
  onClick,
  ...rest
}) => {
  const show = useFragment(notificationShowFragment, showProp)

  const image = show?.coverImage?.cropped

  if (!image) {
    return null
  }

  return (
    <>
      <RouterLink
        to={show?.href}
        onClick={onClick}
        display="flex"
        flexDirection="column"
        textDecoration="none"
        maxWidth={MAX_WIDTH}
        overflow="hidden"
        width="100%"
        {...rest}
        mb={2}
      >
        <ResponsiveBox
          aspectWidth={4}
          aspectHeight={3}
          maxWidth="100%"
          bg="black10"
        >
          {image?.src && (
            <Image
              src={image.src}
              srcSet={image.srcSet}
              width="100%"
              height="100%"
              alt=""
              lazyLoad
              style={{ display: "block" }}
            />
          )}
        </ResponsiveBox>

        <Spacer y={2} />

        <Text variant="md">{show?.name}</Text>

        <Text variant="sm">
          {compact([show.location?.city, show.exhibitionPeriod]).join(", ")}
        </Text>

        <Spacer y={1} />

        <Text variant="sm-display" color="black60">
          {show?.description}
        </Text>
      </RouterLink>

      <Box mb={4} width="100%" maxWidth={MAX_WIDTH}>
        <Button
          // @ts-ignore
          as={RouterLink}
          to={show?.href}
          onClick={onClick}
          data-testid="view-works-button"
        >
          View Works
        </Button>
      </Box>
    </>
  )
}

const notificationShowFragment = graphql`
  fragment NotificationPartnerShow_show on Show {
    location {
      city
    }
    exhibitionPeriod
    startAt
    endAt
    name
    description
    href
    coverImage {
      cropped(width: 600, height: 450, version: ["larger", "large"]) {
        src
        srcSet
      }
    }
  }
`

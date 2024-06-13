import * as React from "react"
import { graphql, useFragment } from "react-relay"
import { RouterLink, RouterLinkProps } from "System/Components/RouterLink"
import { AuthContextModule } from "@artsy/cohesion"
import { Box, Button, Image, ResponsiveBox, Spacer, Text } from "@artsy/palette"
import { NotificationPartnerShow_show$key } from "__generated__/NotificationPartnerShow_show.graphql"
import { compact, truncate } from "lodash"
import { CellShowStatus } from "Components/Cells/CellShow"
import { NOTIFICATION_MAX_WIDTH } from "Components/Notifications/Notification"

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

  return (
    <Box mb={4} width="100%" maxWidth={NOTIFICATION_MAX_WIDTH}>
      <RouterLink
        to={show?.href}
        onClick={onClick}
        display="flex"
        flexDirection="column"
        textDecoration="none"
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
          {!!image?.src && (
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

        <Text variant="sm" color="black60">
          {compact([show.location?.city, show.exhibitionPeriod]).join(", ")}

          {show.startAt && show.endAt && (
            <CellShowStatus startAt={show.startAt} endAt={show.endAt} />
          )}
        </Text>

        <Spacer y={1} />

        {!!show.description && (
          <Text variant="sm-display">
            {truncate(show.description, { length: 200 })}
          </Text>
        )}
      </RouterLink>

      <Box mb={4} width="100%">
        <Button
          // @ts-ignore
          as={RouterLink}
          to={show?.href}
          onClick={onClick}
          data-testid="view-show-button"
        >
          View Show
        </Button>
      </Box>
    </Box>
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
    slug
  }
`

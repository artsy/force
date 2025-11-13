import { FollowArtistButtonQueryRenderer } from "Components/FollowButton/FollowArtistButton"
import { CARD_MAX_WIDTH } from "Components/Notifications/constants"
import { NotificationErrorMessage } from "Components/Notifications/NotificationErrorMessage"
import { NotificationTypeLabel } from "Components/Notifications/NotificationTypeLabel"
import { RouterLink } from "System/Components/RouterLink"
import { extractNodes } from "Utils/extractNodes"
import {
  Box,
  Button,
  Flex,
  Image,
  ResponsiveBox,
  Spacer,
  Text,
} from "@artsy/palette"
import type { ArticleFeaturedArtistNotification_notification$key } from "__generated__/ArticleFeaturedArtistNotification_notification.graphql"
import type { FC } from "react"
import { graphql, useFragment } from "react-relay"

interface ArticleFeaturedArtistNotificationProps {
  notification: ArticleFeaturedArtistNotification_notification$key
}

export const ArticleFeaturedArtistNotification: FC<
  React.PropsWithChildren<ArticleFeaturedArtistNotificationProps>
> = ({ notification }) => {
  const notificationData = useFragment(
    ArticleFeaturedArtistNotificationFragment,
    notification
  )

  const { headline, item } = notificationData

  const article = item?.article
  const artists = extractNodes(item?.artistsConnection)
  const image = article?.thumbnailImage?.cropped

  if (!article || !artists) {
    return <NotificationErrorMessage />
  }

  return (
    <>
      <Flex width="100%" justifyContent="space-between">
        <Flex flex={1}>
          <Text variant="lg-display">{headline}</Text>
        </Flex>
      </Flex>

      <Spacer y={1} />

      <NotificationTypeLabel notification={notificationData} />

      <Spacer y={1} />

      <Flex flexDirection="row" gap={1} alignItems="center">
        {artists.length === 1 && (
          <FollowArtistButtonQueryRenderer
            id={artists[0].internalID}
            size="small"
          />
        )}

        <Text variant="xs">
          {artists.map((artist, index) => {
            return (
              <RouterLink
                to={artist.href}
                key={artist.internalID}
                textDecoration="none"
                inline
              >
                {index > 0 && ", "}
                {artist.name}
              </RouterLink>
            )
          })}
        </Text>
      </Flex>

      <Spacer y={4} />

      <Flex flexDirection="column" alignItems="center">
        <RouterLink
          to={article.href}
          display="block"
          textDecoration="none"
          tabIndex={-1}
        >
          <ResponsiveBox
            bg="mono30"
            aspectWidth={910}
            aspectHeight={607}
            maxWidth={CARD_MAX_WIDTH}
          >
            {image && (
              <Image
                src={image.src}
                srcSet={image.srcSet}
                width="100%"
                height="100%"
                lazyLoad
              />
            )}
          </ResponsiveBox>
        </RouterLink>

        <Spacer y={1} />

        <Box maxWidth={CARD_MAX_WIDTH}>
          <RouterLink to={article.href} display="block" textDecoration="none">
            <Text variant="xl">{article.thumbnailTitle}</Text>
            <Text variant="lg">By {article.byline}</Text>
            <Text variant="md" color="mono60">
              {article.publishedAt}
            </Text>
          </RouterLink>
        </Box>

        <Spacer y={2} />

        <Box mb={4} width="100%" maxWidth={CARD_MAX_WIDTH}>
          <Button
            // @ts-expect-error
            as={RouterLink}
            to={article.href}
          >
            Read Article
          </Button>
        </Box>
      </Flex>
    </>
  )
}

export const ArticleFeaturedArtistNotificationFragment = graphql`
  fragment ArticleFeaturedArtistNotification_notification on Notification {
    headline
    item {
      ... on ArticleFeaturedArtistNotificationItem {
        article {
          href
          thumbnailTitle
          byline
          publishedAt(format: "MMM D, YYYY")
          thumbnailImage {
            # 3:2 aspect ratio
            cropped(width: 910, height: 607) {
              src
              srcSet
              width
              height
            }
          }
        }

        artistsConnection(first: 10) {
          edges {
            node {
              name
              slug
              internalID
              href
            }
          }
        }
      }
    }
    notificationType
    ...NotificationTypeLabel_notification
  }
`

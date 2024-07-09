import {
  Flex,
  Spacer,
  Text,
  Box,
  ResponsiveBox,
  Image,
  Button,
} from "@artsy/palette"
import { RouterLink } from "System/Components/RouterLink"
import { FC } from "react"
import { useFragment, graphql } from "react-relay"
import { NotificationTypeLabel } from "Components/Notifications/NotificationTypeLabel"
import { ArticleFeaturedArtistNotification_notification$key } from "__generated__/ArticleFeaturedArtistNotification_notification.graphql"
import { extractNodes } from "Utils/extractNodes"
import { FollowArtistButtonQueryRenderer } from "Components/FollowButton/FollowArtistButton"
import { CARD_MAX_WIDTH } from "Components/Notifications/constants"
import { NotificationErrorMessage } from "Components/Notifications/NotificationErrorMessage"
import { NotificationWrapper } from "Components/Notifications/Notification"

interface ArticleFeaturedArtistNotificationProps {
  notification: ArticleFeaturedArtistNotification_notification$key
}

export const ArticleFeaturedArtistNotification: FC<ArticleFeaturedArtistNotificationProps> = ({
  notification,
}) => {
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
    <NotificationWrapper>
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
            bg="black30"
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
            <Text variant="md" color="black60">
              {article.publishedAt}
            </Text>
          </RouterLink>
        </Box>

        <Spacer y={2} />

        <Box mb={4} width="100%" maxWidth={CARD_MAX_WIDTH}>
          <Button
            // @ts-ignore
            as={RouterLink}
            to={article.href}
          >
            Read Article
          </Button>
        </Box>
      </Flex>
    </NotificationWrapper>
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

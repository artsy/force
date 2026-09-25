import {
  ActionType,
  type ClickedArticleGroup,
  ContextModule,
  OwnerType,
} from "@artsy/cohesion"
import { Box, Image, Stack, Text } from "@artsy/palette"
import { RouterLink } from "System/Components/RouterLink"
import { useAnalyticsContext } from "System/Hooks/useAnalyticsContext"
import type { ArtistHeaderEditorialItem_article$key } from "__generated__/ArtistHeaderEditorialItem_article.graphql"
import { useState } from "react"
import { graphql, useFragment } from "react-relay"
import { useTracking } from "react-tracking"

const CARD_WIDTH = 380
// Matches the `cropped` dimensions requested in the fragment
const THUMBNAIL_SIZE = 100

interface ArtistHeaderEditorialItemProps {
  article: ArtistHeaderEditorialItem_article$key
}

export const ArtistHeaderEditorialItem: React.FC<
  ArtistHeaderEditorialItemProps
> = ({ article: articleRef }) => {
  const article = useFragment(fragment, articleRef)

  const { trackEvent } = useTracking()

  const { contextPageOwnerId, contextPageOwnerSlug, contextPageOwnerType } =
    useAnalyticsContext()

  const [hasThumbnailError, setHasThumbnailError] = useState(false)

  const thumbnail = article.thumbnailImage?.small
  const hasThumbnail = !!thumbnail?.src && !hasThumbnailError

  return (
    <Stack
      flexDirection="row"
      gap={[1, 2]}
      flexShrink={0}
      width={CARD_WIDTH}
      height="100%"
      as={RouterLink}
      to={article.href}
      textDecoration="none"
      bg="mono5"
      p={1}
      borderRadius="5px"
      onClick={() => {
        const trackingEvent: ClickedArticleGroup = {
          action: ActionType.clickedArticleGroup,
          context_module: ContextModule.artistHeader,
          context_page_owner_type: contextPageOwnerType!,
          context_page_owner_id: contextPageOwnerId,
          context_page_owner_slug: contextPageOwnerSlug,
          destination_page_owner_type: OwnerType.article,
          destination_page_owner_id: article.internalID,
          destination_page_owner_slug: article.slug ?? undefined,
          type: "thumbnail",
        }

        trackEvent(trackingEvent)
      }}
    >
      {hasThumbnail && (
        <Image
          src={thumbnail.src}
          srcSet={thumbnail.srcSet}
          width={THUMBNAIL_SIZE}
          height={THUMBNAIL_SIZE}
          flexShrink={0}
          lazyLoad
          alt=""
          onError={() => setHasThumbnailError(true)}
        />
      )}

      <Box flex={1} minWidth={0}>
        <Text variant="sm-display" lineClamp={2}>
          {article.title}
        </Text>

        <Text variant="xs">By {article.byline}</Text>

        <Text variant="xs" color="mono60">
          {article.publishedAt}
        </Text>
      </Box>
    </Stack>
  )
}

const fragment = graphql`
  fragment ArtistHeaderEditorialItem_article on Article {
    internalID
    slug
    href
    byline
    title
    publishedAt(format: "MMM D, YYYY")
    thumbnailImage {
      small: cropped(width: 100, height: 100) {
        src
        srcSet
      }
    }
  }
`

import {
  ActionType,
  type ClickedArticleGroup,
  ContextModule,
  OwnerType,
} from "@artsy/cohesion"
import { Box, Image, ResponsiveBox, Stack, Text } from "@artsy/palette"
import { RouterLink } from "System/Components/RouterLink"
import { useAnalyticsContext } from "System/Hooks/useAnalyticsContext"
import type { ArtistEditorialItem_article$key } from "__generated__/ArtistEditorialItem_article.graphql"
import { graphql, useFragment } from "react-relay"
import { useTracking } from "react-tracking"

interface ArtistEditorialItemProps {
  article: ArtistEditorialItem_article$key
}

export const ArtistEditorialItem: React.FC<ArtistEditorialItemProps> = ({
  article: articleRef,
}) => {
  const article = useFragment(fragment, articleRef)

  const { trackEvent } = useTracking()

  const { contextPageOwnerId, contextPageOwnerSlug, contextPageOwnerType } =
    useAnalyticsContext()

  const thumbnail = article.thumbnailImage?.small

  return (
    <Stack
      flexDirection="row"
      gap={[1, 2]}
      pr={[1, 0]}
      as={RouterLink}
      to={article.href}
      textDecoration="none"
      onClick={() => {
        const trackingEvent: ClickedArticleGroup = {
          action: ActionType.clickedArticleGroup,
          context_module: ContextModule.marketNews,
          context_page_owner_type: contextPageOwnerType!,
          context_page_owner_id: contextPageOwnerId,
          context_page_owner_slug: contextPageOwnerSlug,
          destination_page_owner_type: OwnerType.article,
          type: "thumbnail",
        }

        trackEvent(trackingEvent)
      }}
    >
      <Box width={[125, "25%"]} flexShrink={0} bg="mono10">
        {thumbnail && (
          <ResponsiveBox
            aspectWidth={1}
            aspectHeight={1}
            maxWidth="100%"
            bg="mono10"
          >
            <Image
              src={thumbnail.src}
              srcSet={thumbnail.srcSet}
              width="100%"
              height="100%"
              lazyLoad
              alt=""
            />
          </ResponsiveBox>
        )}
      </Box>

      <Box>
        <Text
          variant={["sm-display", "sm-display", "sm-display", "md"]}
          lineClamp={2}
        >
          {article.title}
        </Text>

        <Text variant={["xs", "xs", "xs", "sm"]}>By {article.byline}</Text>

        <Text variant={["xs", "xs", "xs", "sm"]} color="mono60">
          {article.publishedAt}
        </Text>
      </Box>
    </Stack>
  )
}

const fragment = graphql`
  fragment ArtistEditorialItem_article on Article {
    internalID
    href
    byline
    title
    publishedAt(format: "MMM D, YYYY")
    thumbnailImage {
      small: cropped(width: 125, height: 125) {
        src
        srcSet
      }
    }
  }
`

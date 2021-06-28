import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { FairEditorialItem_article } from "v2/__generated__/FairEditorialItem_article.graphql"
import { Box, Text, Image } from "@artsy/palette"
import { RouterLink } from "v2/System/Router/RouterLink"
import { useTracking } from "react-tracking"
import {
  ActionType,
  ClickedArticleGroup,
  ContextModule,
  OwnerType,
} from "@artsy/cohesion"
import { useAnalyticsContext } from "v2/System/Analytics/AnalyticsContext"

interface FairEditorialItemProps {
  article: FairEditorialItem_article
}

export const FairEditorialItem: React.FC<FairEditorialItemProps> = ({
  article,
}) => {
  const tracking = useTracking()

  const {
    contextPageOwnerId,
    contextPageOwnerSlug,
    contextPageOwnerType,
  } = useAnalyticsContext()

  const clickedArticleTrackingData: ClickedArticleGroup = {
    context_module: ContextModule.relatedArticles,
    // @ts-expect-error STRICT_NULL_CHECK
    context_page_owner_type: contextPageOwnerType,
    context_page_owner_id: contextPageOwnerId,
    context_page_owner_slug: contextPageOwnerSlug,
    destination_page_owner_type: OwnerType.article,
    destination_page_owner_id: article.internalID,
    // @ts-expect-error STRICT_NULL_CHECK
    destination_page_owner_slug: article.slug,
    type: "thumbnail",
    action: ActionType.clickedArticleGroup,
  }

  return (
    <Box width={325}>
      <RouterLink
        // @ts-expect-error STRICT_NULL_CHECK
        to={article.href}
        aria-label={`${article.title} (${article.publishedAt})`}
        style={{ textDecoration: "none" }}
        onClick={() => tracking.trackEvent(clickedArticleTrackingData)}
      >
        <Image
          // @ts-expect-error STRICT_NULL_CHECK
          src={article.thumbnailImage.cropped.src}
          // @ts-expect-error STRICT_NULL_CHECK
          srcSet={article.thumbnailImage.cropped.srcSet}
          width="100%"
          height={240}
          lazyLoad={true}
          // @ts-expect-error STRICT_NULL_CHECK
          alt={article.thumbnailTitle}
        />
        <Box pr={10}>
          <Text variant="xl" as="h4" my={5}>
            {article.title}
          </Text>

          <Text variant="md" color="black60">
            {article.publishedAt}
          </Text>
        </Box>
      </RouterLink>
    </Box>
  )
}

export const FairEditorialItemFragmentContainer = createFragmentContainer(
  FairEditorialItem,
  {
    article: graphql`
      fragment FairEditorialItem_article on Article {
        id
        internalID
        slug
        title
        href
        publishedAt(format: "MMMM D, YYYY")
        thumbnailTitle
        thumbnailImage {
          cropped(width: 325, height: 240) {
            width
            height
            src
            srcSet
          }
        }
      }
    `,
  }
)

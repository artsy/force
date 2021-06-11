import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { FairEditorialItem_article } from "v2/__generated__/FairEditorialItem_article.graphql"
import { Box, Text } from "@artsy/palette"
import { RouterLink } from "v2/System/Router/RouterLink"
import styled from "styled-components"
import { useTracking } from "react-tracking"
import {
  ActionType,
  ClickedArticleGroup,
  ContextModule,
  OwnerType,
} from "@artsy/cohesion"
import { useAnalyticsContext } from "v2/System/Analytics/AnalyticsContext"

const Container = styled(RouterLink)`
  display: flex;
  text-decoration: none;
`

const Thumbnail = styled.img`
  display: block;
  width: 100%;
  height: 100%;
`

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
    <Container
      // @ts-expect-error STRICT_NULL_CHECK
      to={article.href}
      aria-label={`${article.title} (${article.publishedAt})`}
      onClick={() => tracking.trackEvent(clickedArticleTrackingData)}
    >
      <Box flex="1" pr={2}>
        <Text variant="md" as="h4">
          {article.title}
        </Text>

        <Text variant="md" color="black60">
          {article.publishedAt}
        </Text>
      </Box>

      <Box
        bg="black10"
        width={140}
        height={80}
        borderRadius={2}
        overflow="hidden"
      >
        {article.thumbnailImage && (
          <Thumbnail
            // @ts-expect-error STRICT_NULL_CHECK
            src={article.thumbnailImage.cropped.src}
            // @ts-expect-error STRICT_NULL_CHECK
            srcSet={article.thumbnailImage.cropped.srcSet}
            // @ts-expect-error STRICT_NULL_CHECK
            alt={article.thumbnailTitle}
          />
        )}
      </Box>
    </Container>
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
        publishedAt(format: "MMM Do, YYYY")
        thumbnailTitle
        thumbnailImage {
          cropped(width: 140, height: 80) {
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

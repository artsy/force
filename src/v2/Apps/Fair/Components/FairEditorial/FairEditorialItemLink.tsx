import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useTracking } from "react-tracking"
import {
  ActionType,
  ClickedArticleGroup,
  ContextModule,
  OwnerType,
} from "@artsy/cohesion"
import { useAnalyticsContext } from "v2/System/Analytics/AnalyticsContext"
import { RouterLink } from "v2/System/Router/RouterLink"
import { FairEditorialItemLink_article$data } from "v2/__generated__/FairEditorialItemLink_article.graphql"

export interface FairEditorialItemLinkProps {
  article: FairEditorialItemLink_article$data
}

const FairEditorialItemLink: React.FC<FairEditorialItemLinkProps> = ({
  article,
  children,
}) => {
  const tracking = useTracking()

  const {
    contextPageOwnerId,
    contextPageOwnerSlug,
    contextPageOwnerType,
  } = useAnalyticsContext()

  const clickedArticleTrackingData: ClickedArticleGroup = {
    context_module: ContextModule.relatedArticles,
    context_page_owner_type: contextPageOwnerType!,
    context_page_owner_id: contextPageOwnerId,
    context_page_owner_slug: contextPageOwnerSlug,
    destination_page_owner_type: OwnerType.article,
    destination_page_owner_id: article.internalID,
    destination_page_owner_slug: article.slug!,
    type: "thumbnail",
    action: ActionType.clickedArticleGroup,
  }

  return (
    <RouterLink
      to={article.href!}
      aria-label={`${article.title} (${article.publishedAt})`}
      textDecoration="none"
      style={{ display: "block" }}
      onClick={() => tracking.trackEvent(clickedArticleTrackingData)}
    >
      {children}
    </RouterLink>
  )
}

export const FairEditorialItemLinkFragmentContainer = createFragmentContainer(
  FairEditorialItemLink,
  {
    article: graphql`
      fragment FairEditorialItemLink_article on Article {
        internalID
        slug
        title
        href
        publishedAt(format: "MMMM D, YYYY")
      }
    `,
  }
)

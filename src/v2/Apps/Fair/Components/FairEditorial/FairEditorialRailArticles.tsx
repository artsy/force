import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { FairEditorialRailArticles_fair } from "v2/__generated__/FairEditorialRailArticles_fair.graphql"
import { Shelf } from "@artsy/palette"
import { extractNodes } from "v2/Utils/extractNodes"
import { CellArticleFragmentContainer } from "v2/Components/Cells/CellArticle"
import { useAnalyticsContext } from "v2/System"
import { useTracking } from "react-tracking"
import {
  ActionType,
  ClickedArticleGroup,
  ContextModule,
  OwnerType,
} from "@artsy/cohesion"

export interface FairBoothRailArtworksProps {
  fair: FairEditorialRailArticles_fair
}

const FairEditorialRailArticles: React.FC<FairBoothRailArtworksProps> = ({
  fair,
}) => {
  const tracking = useTracking()

  const {
    contextPageOwnerId,
    contextPageOwnerSlug,
    contextPageOwnerType,
  } = useAnalyticsContext()

  const articles = extractNodes(fair.articlesConnection)

  return (
    <Shelf alignItems="flex-start">
      {articles.map(article => {
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
          <CellArticleFragmentContainer
            key={article.internalID}
            article={article}
            displayByline={false}
            onClick={() => {
              tracking.trackEvent(clickedArticleTrackingData)
            }}
          />
        )
      })}
    </Shelf>
  )
}

export const FairEditorialRailArticlesFragmentContainer = createFragmentContainer(
  FairEditorialRailArticles,
  {
    fair: graphql`
      fragment FairEditorialRailArticles_fair on Fair {
        articlesConnection(first: 6, sort: PUBLISHED_AT_DESC) {
          edges {
            node {
              ...CellArticle_article
              internalID
              slug
            }
          }
        }
      }
    `,
  }
)

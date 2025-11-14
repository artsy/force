import {
  ActionType,
  type ClickedArticleGroup,
  ContextModule,
  OwnerType,
} from "@artsy/cohesion"
import { Flex, Shelf, Spacer, Text } from "@artsy/palette"
import { CellArticleFragmentContainer } from "Components/Cells/CellArticle"
import { RouterLink } from "System/Components/RouterLink"
import { useAnalyticsContext } from "System/Hooks/useAnalyticsContext"
import { extractNodes } from "Utils/extractNodes"
import type { FairEditorialRailArticles_fair$data } from "__generated__/FairEditorialRailArticles_fair.graphql"
import type * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useTracking } from "react-tracking"

export interface FairBoothRailArtworksProps {
  fair: FairEditorialRailArticles_fair$data
}

const FairEditorialRailArticles: React.FC<
  React.PropsWithChildren<FairBoothRailArtworksProps>
> = ({ fair }) => {
  const tracking = useTracking()

  const { contextPageOwnerId, contextPageOwnerSlug, contextPageOwnerType } =
    useAnalyticsContext()

  const articles = extractNodes(fair.articlesConnection)

  return (
    <>
      <Flex justifyContent="space-between" alignItems="center">
        <Text variant="lg-display" as="h3">
          Explore Further
        </Text>

        <Text variant="sm">
          <RouterLink to={`${fair.href}/articles`}>View all</RouterLink>
        </Text>
      </Flex>

      <Spacer y={4} />

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
    </>
  )
}

export const FairEditorialRailArticlesFragmentContainer =
  createFragmentContainer(FairEditorialRailArticles, {
    fair: graphql`
      fragment FairEditorialRailArticles_fair on Fair {
        href
        articlesConnection(first: 6, sort: PUBLISHED_AT_DESC) {
          totalCount
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
  })

import {
  ActionType,
  type ClickedArticleGroup,
  ContextModule,
  OwnerType,
} from "@artsy/cohesion"
import { Skeleton } from "@artsy/palette"
import {
  CellArticleFragmentContainer,
  CellArticlePlaceholder,
} from "Components/Cells/CellArticle"
import { ClientSuspense } from "Components/ClientSuspense"
import { Rail } from "Components/Rail/Rail"
import { useAnalyticsContext } from "System/Hooks/useAnalyticsContext"
import type { ArtistEditorialNewsEmptyStateQuery } from "__generated__/ArtistEditorialNewsEmptyStateQuery.graphql"
import { graphql, useLazyLoadQuery } from "react-relay"
import { useTracking } from "react-tracking"

const ARTICLE_COUNT = 8
const ARTICLES_HREF = "/articles"

type ArtistEditorialNewsEmptyStateProps = {}

export const ArtistEditorialNewsEmptyState: React.FC<
  React.PropsWithChildren<ArtistEditorialNewsEmptyStateProps>
> = () => {
  return (
    <ClientSuspense fallback={<ArtistEditorialNewsEmptyStatePlaceholder />}>
      <ArtistEditorialNewsEmptyStateArticles />
    </ClientSuspense>
  )
}

const ArtistEditorialNewsEmptyStateArticles: React.FC<
  React.PropsWithChildren<unknown>
> = () => {
  const data = useLazyLoadQuery<ArtistEditorialNewsEmptyStateQuery>(
    graphql`
      query ArtistEditorialNewsEmptyStateQuery {
        articles(featured: true, published: true, sort: PUBLISHED_AT_DESC) {
          ...CellArticle_article
          internalID
        }
      }
    `,
    {},
    { fetchPolicy: "store-or-network" },
  )

  const { trackEvent } = useTracking()

  const { contextPageOwnerId, contextPageOwnerSlug, contextPageOwnerType } =
    useAnalyticsContext()

  const articles = data.articles.slice(0, ARTICLE_COUNT)

  if (articles.length === 0) return null

  return (
    <Rail
      title="From Artsy Editorial"
      alignItems="flex-start"
      viewAllHref={ARTICLES_HREF}
      viewAllLabel="View All"
      viewAllOnClick={() => {
        const trackingEvent: ClickedArticleGroup = {
          action: ActionType.clickedArticleGroup,
          context_module: ContextModule.marketNews,
          context_page_owner_type: contextPageOwnerType!,
          context_page_owner_id: contextPageOwnerId,
          context_page_owner_slug: contextPageOwnerSlug,
          destination_page_owner_type: OwnerType.articles,
          type: "viewAll",
        }

        trackEvent(trackingEvent)
      }}
      getItems={() => {
        return articles.map(article => {
          return (
            <CellArticleFragmentContainer
              key={article.internalID}
              article={article}
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
            />
          )
        })
      }}
    />
  )
}

export const ArtistEditorialNewsEmptyStatePlaceholder: React.FC<
  React.PropsWithChildren<unknown>
> = () => {
  return (
    <Skeleton>
      <Rail
        title="From Artsy Editorial"
        isLoading
        viewAllHref={ARTICLES_HREF}
        viewAllLabel="View All"
        getItems={() => {
          return Array.from({ length: ARTICLE_COUNT }).map((_, index) => {
            return <CellArticlePlaceholder key={index} />
          })
        }}
      />
    </Skeleton>
  )
}

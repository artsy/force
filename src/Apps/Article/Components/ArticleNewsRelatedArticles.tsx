import { Shelf, Skeleton } from "@artsy/palette"
import {
  CellArticleFragmentContainer,
  CellArticlePlaceholder,
} from "Components/Cells/CellArticle"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import type { ArticleNewsRelatedArticlesQuery } from "__generated__/ArticleNewsRelatedArticlesQuery.graphql"
import type { ArticleNewsRelatedArticles_article$data } from "__generated__/ArticleNewsRelatedArticles_article.graphql"
import type { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"

interface ArticleNewsRelatedArticlesProps {
  article: ArticleNewsRelatedArticles_article$data
}

const ArticleNewsRelatedArticles: FC<
  React.PropsWithChildren<ArticleNewsRelatedArticlesProps>
> = ({ article }) => {
  if (article.newsRelatedArticles.length === 0) return null

  return (
    <Shelf alignItems="flex-start">
      {article.newsRelatedArticles.map(article => {
        return (
          <CellArticleFragmentContainer
            key={article.internalID}
            article={article}
          />
        )
      })}
    </Shelf>
  )
}

export const ArticleNewsRelatedArticlesFragmentContainer =
  createFragmentContainer(ArticleNewsRelatedArticles, {
    article: graphql`
      fragment ArticleNewsRelatedArticles_article on Article {
        newsRelatedArticles: relatedArticles(size: 8) {
          internalID
          ...CellArticle_article
        }
      }
    `,
  })

interface ArticleNewsRelatedArticlesQueryRendererProps {
  id: string
}

export const ArticleNewsRelatedArticlesQueryRenderer: FC<
  React.PropsWithChildren<ArticleNewsRelatedArticlesQueryRendererProps>
> = ({ id }) => {
  return (
    <SystemQueryRenderer<ArticleNewsRelatedArticlesQuery>
      lazyLoad
      placeholder={<ArticleNewsRelatedArticlesPlaceholder />}
      variables={{ id }}
      query={graphql`
        query ArticleNewsRelatedArticlesQuery($id: String!) @cacheable {
          article(id: $id) {
            ...ArticleNewsRelatedArticles_article
          }
        }
      `}
      render={({ error, props }) => {
        if (error) {
          console.error(error)
          return null
        }

        if (!props?.article) {
          return <ArticleNewsRelatedArticlesPlaceholder />
        }

        return (
          <ArticleNewsRelatedArticlesFragmentContainer
            article={props.article}
          />
        )
      }}
    />
  )
}

const ArticleNewsRelatedArticlesPlaceholder: FC<
  React.PropsWithChildren<unknown>
> = () => {
  return (
    <Skeleton>
      <Shelf alignItems="flex-start">
        {[...new Array(8)].map((_, index) => {
          return <CellArticlePlaceholder key={index} />
        })}
      </Shelf>
    </Skeleton>
  )
}

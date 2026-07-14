import {
  ArticleRelatedArticlesShelf,
  ArticleRelatedArticlesShelfPlaceholder,
} from "Apps/Article/Components/ArticleRelatedArticlesShelf"
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
  return <ArticleRelatedArticlesShelf articles={article.newsRelatedArticles} />
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
  return <ArticleRelatedArticlesShelfPlaceholder />
}

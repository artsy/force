import {
  ArticleRelatedArticlesShelf,
  ArticleRelatedArticlesShelfPlaceholder,
} from "Apps/Article/Components/ArticleRelatedArticlesShelf"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import type { ArticleVerticalRelatedArticlesQuery } from "__generated__/ArticleVerticalRelatedArticlesQuery.graphql"
import type { ArticleVerticalRelatedArticles_article$data } from "__generated__/ArticleVerticalRelatedArticles_article.graphql"
import type { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"

interface ArticleVerticalRelatedArticlesProps {
  article: ArticleVerticalRelatedArticles_article$data
}

const ArticleVerticalRelatedArticles: FC<
  React.PropsWithChildren<ArticleVerticalRelatedArticlesProps>
> = ({ article }) => {
  return (
    <ArticleRelatedArticlesShelf
      articles={article.verticalRelatedArticles}
      heading={`Further Reading in ${article.vertical}`}
    />
  )
}

export const ArticleVerticalRelatedArticlesFragmentContainer =
  createFragmentContainer(ArticleVerticalRelatedArticles, {
    article: graphql`
      fragment ArticleVerticalRelatedArticles_article on Article {
        vertical
        verticalRelatedArticles: relatedArticles(inVertical: true, size: 8) {
          internalID
          ...CellArticle_article
        }
      }
    `,
  })

interface ArticleVerticalRelatedArticlesQueryRendererProps {
  id: string
}

export const ArticleVerticalRelatedArticlesQueryRenderer: FC<
  React.PropsWithChildren<ArticleVerticalRelatedArticlesQueryRendererProps>
> = ({ id }) => {
  return (
    <SystemQueryRenderer<ArticleVerticalRelatedArticlesQuery>
      lazyLoad
      placeholder={<ArticleVerticalRelatedArticlesPlaceholder />}
      variables={{ id }}
      query={graphql`
        query ArticleVerticalRelatedArticlesQuery($id: String!) @cacheable {
          article(id: $id) {
            ...ArticleVerticalRelatedArticles_article
          }
        }
      `}
      render={({ error, props }) => {
        if (error) {
          console.error(error)
          return null
        }

        if (!props?.article) {
          return <ArticleVerticalRelatedArticlesPlaceholder />
        }

        return (
          <ArticleVerticalRelatedArticlesFragmentContainer
            article={props.article}
          />
        )
      }}
    />
  )
}

const ArticleVerticalRelatedArticlesPlaceholder: FC<
  React.PropsWithChildren<unknown>
> = () => {
  return (
    <ArticleRelatedArticlesShelfPlaceholder heading="Further Reading in Vertical" />
  )
}

import {
  ArticleRelatedArticlesShelf,
  ArticleRelatedArticlesShelfPlaceholder,
} from "Apps/Article/Components/ArticleRelatedArticlesShelf"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import type { ArticleChannelRelatedArticlesQuery } from "__generated__/ArticleChannelRelatedArticlesQuery.graphql"
import type { ArticleChannelRelatedArticles_article$data } from "__generated__/ArticleChannelRelatedArticles_article.graphql"
import type { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"

interface ArticleChannelRelatedArticlesProps {
  article: ArticleChannelRelatedArticles_article$data
}

const ArticleChannelRelatedArticles: FC<
  React.PropsWithChildren<ArticleChannelRelatedArticlesProps>
> = ({ article }) => {
  return (
    <ArticleRelatedArticlesShelf
      articles={article.channelArticles}
      heading={`More From ${article.channel?.name || article.byline}`}
    />
  )
}

export const ArticleChannelRelatedArticlesFragmentContainer =
  createFragmentContainer(ArticleChannelRelatedArticles, {
    article: graphql`
      fragment ArticleChannelRelatedArticles_article on Article {
        byline
        channel {
          name
        }
        channelArticles {
          internalID
          ...CellArticle_article
        }
      }
    `,
  })

interface ArticleChannelRelatedArticlesQueryRendererProps {
  id: string
}

export const ArticleChannelRelatedArticlesQueryRenderer: FC<
  React.PropsWithChildren<ArticleChannelRelatedArticlesQueryRendererProps>
> = ({ id }) => {
  return (
    <SystemQueryRenderer<ArticleChannelRelatedArticlesQuery>
      lazyLoad
      placeholder={<ArticleChannelRelatedArticlesPlaceholder />}
      variables={{ id }}
      query={graphql`
        query ArticleChannelRelatedArticlesQuery($id: String!) {
          article(id: $id) {
            ...ArticleChannelRelatedArticles_article
          }
        }
      `}
      render={({ error, props }) => {
        if (error) {
          console.error(error)
          return null
        }

        if (!props?.article) {
          return <ArticleChannelRelatedArticlesPlaceholder />
        }

        return (
          <ArticleChannelRelatedArticlesFragmentContainer
            article={props.article}
          />
        )
      }}
    />
  )
}

const ArticleChannelRelatedArticlesPlaceholder: FC<
  React.PropsWithChildren<unknown>
> = () => {
  return (
    <ArticleRelatedArticlesShelfPlaceholder heading="More From This Author" />
  )
}

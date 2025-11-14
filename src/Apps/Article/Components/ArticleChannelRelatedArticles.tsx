import {
  CellArticleFragmentContainer,
  CellArticlePlaceholder,
} from "Components/Cells/CellArticle"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { Shelf, Skeleton, SkeletonText, Text } from "@artsy/palette"
import type { ArticleChannelRelatedArticles_article$data } from "__generated__/ArticleChannelRelatedArticles_article.graphql"
import type { ArticleChannelRelatedArticlesQuery } from "__generated__/ArticleChannelRelatedArticlesQuery.graphql"
import type { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"

interface ArticleChannelRelatedArticlesProps {
  article: ArticleChannelRelatedArticles_article$data
}

const ArticleChannelRelatedArticles: FC<
  React.PropsWithChildren<ArticleChannelRelatedArticlesProps>
> = ({ article }) => {
  if (article.channelArticles.length === 0) return null

  return (
    <>
      <Text variant="lg-display" mb={4}>
        More From {article.channel?.name || article.byline}
      </Text>

      <Shelf alignItems="flex-start">
        {article.channelArticles.map(article => {
          return (
            <CellArticleFragmentContainer
              key={article.internalID}
              article={article}
            />
          )
        })}
      </Shelf>
    </>
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
    <Skeleton>
      <SkeletonText variant="lg-display" mb={4}>
        More From This Author
      </SkeletonText>

      <Shelf alignItems="flex-start">
        {[...new Array(8)].map((_, index) => {
          return <CellArticlePlaceholder key={index} />
        })}
      </Shelf>
    </Skeleton>
  )
}

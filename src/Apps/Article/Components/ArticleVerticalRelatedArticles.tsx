import {
  CellArticleFragmentContainer,
  CellArticlePlaceholder,
} from "Components/Cells/CellArticle"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { Shelf, Skeleton, SkeletonText, Text } from "@artsy/palette"
import type { ArticleVerticalRelatedArticles_article$data } from "__generated__/ArticleVerticalRelatedArticles_article.graphql"
import type { ArticleVerticalRelatedArticlesQuery } from "__generated__/ArticleVerticalRelatedArticlesQuery.graphql"
import type { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"

interface ArticleVerticalRelatedArticlesProps {
  article: ArticleVerticalRelatedArticles_article$data
}

const ArticleVerticalRelatedArticles: FC<
  React.PropsWithChildren<ArticleVerticalRelatedArticlesProps>
> = ({ article }) => {
  if (article.verticalRelatedArticles.length === 0) return null

  return (
    <>
      <Text variant="lg-display" mb={4}>
        Further Reading in {article.vertical}
      </Text>

      <Shelf alignItems="flex-start">
        {article.verticalRelatedArticles.map(article => {
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
    <Skeleton>
      <SkeletonText variant="lg-display" mb={4}>
        Further Reading in Vertical
      </SkeletonText>

      <Shelf alignItems="flex-start">
        {[...new Array(8)].map((_, index) => {
          return <CellArticlePlaceholder key={index} />
        })}
      </Shelf>
    </Skeleton>
  )
}

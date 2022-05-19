import { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { SystemQueryRenderer } from "v2/System/Relay/SystemQueryRenderer"
import { ArticleVerticalRelatedArticles_article } from "v2/__generated__/ArticleVerticalRelatedArticles_article.graphql"
import { ArticleVerticalRelatedArticlesQuery } from "v2/__generated__/ArticleVerticalRelatedArticlesQuery.graphql"
import { Shelf, Skeleton, SkeletonText, Text } from "@artsy/palette"
import {
  CellArticleFragmentContainer,
  CellArticlePlaceholder,
} from "v2/Components/Cells/CellArticle"

interface ArticleVerticalRelatedArticlesProps {
  article: ArticleVerticalRelatedArticles_article
}

const ArticleVerticalRelatedArticles: FC<ArticleVerticalRelatedArticlesProps> = ({
  article,
}) => {
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

export const ArticleVerticalRelatedArticlesFragmentContainer = createFragmentContainer(
  ArticleVerticalRelatedArticles,
  {
    article: graphql`
      fragment ArticleVerticalRelatedArticles_article on Article {
        vertical
        verticalRelatedArticles: relatedArticles(inVertical: true, size: 8) {
          internalID
          ...CellArticle_article
        }
      }
    `,
  }
)

interface ArticleVerticalRelatedArticlesQueryRendererProps {
  id: string
}

export const ArticleVerticalRelatedArticlesQueryRenderer: FC<ArticleVerticalRelatedArticlesQueryRendererProps> = ({
  id,
}) => {
  return (
    <SystemQueryRenderer<ArticleVerticalRelatedArticlesQuery>
      lazyLoad
      placeholder={<ArticleVerticalRelatedArticlesPlaceholder />}
      variables={{ id }}
      query={graphql`
        query ArticleVerticalRelatedArticlesQuery($id: String!) {
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

const ArticleVerticalRelatedArticlesPlaceholder: FC = () => {
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

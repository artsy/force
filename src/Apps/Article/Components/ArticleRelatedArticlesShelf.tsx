import { Shelf, Skeleton, SkeletonText, Text } from "@artsy/palette"
import {
  CellArticleFragmentContainer,
  CellArticlePlaceholder,
} from "Components/Cells/CellArticle"
import type { ComponentProps, FC } from "react"

type CellArticle = ComponentProps<
  typeof CellArticleFragmentContainer
>["article"]

interface ArticleRelatedArticlesShelfProps {
  articles: ReadonlyArray<{ internalID: string } & CellArticle>
  heading?: string
}

export const ArticleRelatedArticlesShelf: FC<
  React.PropsWithChildren<ArticleRelatedArticlesShelfProps>
> = ({ articles, heading }) => {
  if (articles.length === 0) return null

  return (
    <>
      {heading && (
        <Text variant="lg-display" mb={4}>
          {heading}
        </Text>
      )}

      <Shelf alignItems="flex-start">
        {articles.map(article => {
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

interface ArticleRelatedArticlesShelfPlaceholderProps {
  heading?: string
}

export const ArticleRelatedArticlesShelfPlaceholder: FC<
  React.PropsWithChildren<ArticleRelatedArticlesShelfPlaceholderProps>
> = ({ heading }) => {
  return (
    <Skeleton>
      {heading && (
        <SkeletonText variant="lg-display" mb={4}>
          {heading}
        </SkeletonText>
      )}

      <Shelf alignItems="flex-start">
        {[...new Array(8)].map((_, index) => {
          return <CellArticlePlaceholder key={index} />
        })}
      </Shelf>
    </Skeleton>
  )
}

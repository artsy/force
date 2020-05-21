import { color, Separator } from "@artsy/palette"
import { CollectionsRailContent } from "v2/Components/CollectionsRail"
import {
  ArticleData,
  RelatedArticleCanvasData,
} from "v2/Components/Publishing//Typings"
import { RelatedArticlesCanvas } from "v2/Components/Publishing/RelatedArticles/Canvas/RelatedArticlesCanvas"
import React from "react"
import styled from "styled-components"

export interface CanvasFooterProps {
  relatedArticles?: RelatedArticleCanvasData[]
  article: ArticleData
  showCollectionsRail?: boolean
}

export const CanvasFooter: React.SFC<CanvasFooterProps> = props => {
  const { article, relatedArticles } = props

  return (
    <CanvasFooterContainer>
      {relatedArticles && (
        <RelatedArticlesCanvas
          articles={relatedArticles}
          vertical={article.layout !== "news" && article.vertical}
        />
      )}

      {props.showCollectionsRail && (
        <div>
          <Separator mb={4} />
          <CollectionsRailContent {...props} articleId={article.id} />
        </div>
      )}
    </CanvasFooterContainer>
  )
}

export const CanvasFooterContainer = styled.div`
  border-top: 1px solid ${color("black10")};
`

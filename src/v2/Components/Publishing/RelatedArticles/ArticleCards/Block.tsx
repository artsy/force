import { Box, color } from "@artsy/palette"
import React from "react"
import styled from "styled-components"

import { unica } from "v2/Assets/Fonts"
import {
  Vertical,
  VerticalOrSeriesTitle,
} from "v2/Components/Publishing/Sections/VerticalOrSeriesTitle"
import { SeriesAbout } from "v2/Components/Publishing/Series/SeriesAbout"
import { ArticleData } from "v2/Components/Publishing/Typings"
import { ArticleCards } from "./ArticleCards"

interface Props {
  article?: ArticleData
  color?: string
  relatedArticles?: any
}

export const ArticleCardsBlock: React.SFC<Props> = props => {
  const { article, relatedArticles } = props
  const { seriesArticle } = article

  return (
    <ArticleCardsContainer color={props.color}>
      {(relatedArticles || article.relatedArticles) && (
        <Box maxWidth={1200} mx="auto">
          <VerticalOrSeriesTitle
            article={article}
            color={props.color}
            prefix="More in "
          />
          <ArticleCards
            relatedArticles={relatedArticles || article.relatedArticles}
            series={seriesArticle}
            color={props.color}
          />
        </Box>
      )}
      {seriesArticle && (
        <Box maxWidth={1200} mx="auto" pt={[40, 40, 60]} pb={100}>
          <SeriesAbout article={seriesArticle} color={props.color} />
        </Box>
      )}
    </ArticleCardsContainer>
  )
}

ArticleCardsBlock.defaultProps = {
  color: color("black100"),
}

export const ArticleCardsContainer = styled.div`
  color: ${props => props.color};

  ${Vertical} {
    ${unica("s32")};
    width: 100%;
    margin-bottom: 40px;

    a {
      border-bottom: 2px solid;
    }
  }
`

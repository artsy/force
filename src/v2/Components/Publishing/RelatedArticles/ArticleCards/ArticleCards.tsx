import { Box } from "@artsy/palette"
import React from "react"
import styled from "styled-components"

import { ArticleData } from "v2/Components/Publishing/Typings"
import { ArticleCard } from "./ArticleCard"

interface Props {
  series?: ArticleData
  color?: string
  relatedArticles?: any
}

export const ArticleCards: React.SFC<Props> = props => {
  const { color, relatedArticles, series } = props

  return (
    <Box color={color}>
      {relatedArticles.map((relatedArticle, i) => {
        return (
          <ArticlesWrapper mb={[40, 60]} key={i}>
            <ArticleCard
              article={relatedArticle}
              color={color}
              series={series}
            />
          </ArticlesWrapper>
        )
      })}
    </Box>
  )
}

// Used to target wrapper in other components
export const ArticlesWrapper = styled(Box)``

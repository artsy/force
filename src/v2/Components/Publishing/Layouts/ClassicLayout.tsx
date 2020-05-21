import { Box, space } from "@artsy/palette"
import { Share } from "v2/Components/Publishing/Byline/Share"
import { getArticleFullHref } from "v2/Components/Publishing/Constants"
import { Header } from "v2/Components/Publishing/Header/Header"
import { Sections } from "v2/Components/Publishing/Sections/Sections"
import { ArticleData } from "v2/Components/Publishing/Typings"
import React from "react"

export interface ArticleProps {
  article: ArticleData
  isMobile?: boolean
}

export const ClassicLayout: React.SFC<ArticleProps> = props => {
  const { slug, social_title, thumbnail_title } = props.article

  return (
    <Box position="relative" pt={space(2)} pb={space(4)}>
      <Header {...props} />
      <Sections {...props} />

      <Box maxWidth={580} mx="auto" px={[space(2), 0]}>
        <Share
          hasLabel
          url={getArticleFullHref(slug)}
          title={social_title || thumbnail_title}
        />
      </Box>
    </Box>
  )
}

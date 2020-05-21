import { color, Sans } from "@artsy/palette"
import React from "react"
import styled from "styled-components"

import { getEditorialHref } from "v2/Components/Publishing/Constants"
import { ArticleData } from "v2/Components/Publishing/Typings"

interface Props {
  article?: ArticleData
  color?: string
  prefix?: string
  vertical?: any
}

export const VerticalOrSeriesTitle: React.SFC<Props> = props => {
  const { article, prefix } = props
  const { seriesArticle } = article
  const vertical = props.vertical
    ? props.vertical
    : article.vertical && article.vertical.name

  const seriesLink =
    seriesArticle && getEditorialHref("series", seriesArticle.slug)

  return (
    <Vertical size="3" weight="medium" color={props.color}>
      {prefix}
      {seriesArticle ? (
        <a href={seriesLink}>{seriesArticle.title}</a>
      ) : (
          <span>{vertical}</span>
        )}
    </Vertical>
  )
}

export const Vertical = styled(Sans) <{ color: string }>`
  a {
    color: ${props => props.color};
    text-decoration: none;
  }
`

VerticalOrSeriesTitle.defaultProps = {
  color: color("black100"),
}

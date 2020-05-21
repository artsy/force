import { SansSize } from "@artsy/palette"
import React from "react"
import styled from "styled-components"
import { getArticleFullHref } from "../Constants"
import { ArticleData, BylineLayout } from "../Typings"
import { Author } from "./Author"
import { Date } from "./Date"
import { Share } from "./Share"

interface BylineProps {
  article: ArticleData
  color?: string
  date?: string
  layout?: BylineLayout
  size?: SansSize
}

export const Byline: React.SFC<BylineProps> = props => {
  const {
    article: { authors, published_at, slug, social_title, thumbnail_title },
    color,
    date,
    layout,
    size,
  } = props

  return (
    <BylineContainer className="Byline" color={color}>
      <Author authors={authors} color={color} layout={layout} size={size} />
      <Date date={date || published_at} layout={layout} size={size} />

      {layout !== "condensed" && (
        <Share
          url={getArticleFullHref(slug)}
          title={social_title || thumbnail_title}
          color={color}
        />
      )}
    </BylineContainer>
  )
}

Byline.defaultProps = {
  color: "black",
}

export const BylineContainer = styled.div.attrs<{ color: string }>({})`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  color: ${props => props.color};
`

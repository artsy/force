import { Box, color, Sans } from "@artsy/palette"
import { Share, ShareContainer } from "v2/Components/Publishing/Byline/Share"
import {
  getArticleFullHref,
  getAuthorByline,
  getDate,
} from "v2/Components/Publishing/Constants"
import { ArticleData } from "v2/Components/Publishing/Typings"
import React from "react"
import styled from "styled-components"

interface ClassicBylineProps {
  date?: string
  article?: ArticleData
}

export const ClassicByline: React.SFC<ClassicBylineProps> = props => {
  const {
    article: {
      channel,
      contributing_authors,
      author,
      published_at,
      slug,
      social_title,
      thumbnail_title,
    },
    date,
  } = props

  const contributors = getAuthorByline(contributing_authors, false)
  const byline = author ? author.name : channel && channel.name

  return (
    <ClassicBylineContainer textAlign={["left", "center"]}>
      {contributors ? (
        <div>
          {author && (
            <Sans size="3" weight="medium">
              {author.name}
            </Sans>
          )}
          <Sans size="4" weight="medium">{`By ${contributors}`}</Sans>
        </div>
      ) : (
          byline && (
            <Sans size="4" weight="medium">
              {byline}
            </Sans>
          )
        )}
      <Sans size="3" weight="medium" color={color("black60")}>
        {getDate(date || published_at)}
      </Sans>

      <Share
        url={getArticleFullHref(slug)}
        title={social_title || thumbnail_title}
      />
    </ClassicBylineContainer>
  )
}

const ClassicBylineContainer = styled(Box)`
  display: block;

  ${ShareContainer} {
    display: inline-block;
  }
`

import React from "react"
import styled from "styled-components"
import { media } from "../../Helpers"
import { getFullEditorialHref } from "../Constants"
import { Date } from "./Date"
import { Share, ShareContainer } from "./Share"

interface ShareDateProps extends React.HTMLProps<HTMLDivElement> {
  article: any
  color?: string
}

const ShareDateComponent: React.SFC<ShareDateProps> = props => {
  const { article, color } = props
  const title = article.social_title || article.thumbnail_title
  return (
    <div className={props.className}>
      <Date date={article.published_at} />
      <Share
        url={getFullEditorialHref(article.layout, article.slug)}
        title={title}
        color={color}
        hasLabel
      />
    </div>
  )
}

ShareDateComponent.defaultProps = {
  color: "black",
}

export const ShareDate = styled(ShareDateComponent)`
  color: ${props => props.color || "black"};
  ${media.sm`
    ${ShareContainer} {
      margin-top: 0px;
    }
  `};
`

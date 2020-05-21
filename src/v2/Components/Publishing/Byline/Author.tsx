import { Sans, SansSize } from "@artsy/palette"
import React from "react"
import styled from "styled-components"
import { getAuthorByline } from "../Constants"
import { BylineLayout } from "../Typings"

interface AuthorProps {
  authors?: any
  color?: string
  layout?: BylineLayout
  size?: SansSize
}

export const Author: React.SFC<AuthorProps> = props => {
  const { color, layout, size } = props
  const condensed = layout === "condensed"
  const fontSize = size ? size : condensed ? "2" : "3t"

  return (
    <Sans size={fontSize} weight="medium">
      <StyledAuthor condensed={condensed} color={color}>
        {getAuthorByline(props.authors)}
      </StyledAuthor>
    </Sans>
  )
}

Author.defaultProps = {
  color: "black",
}

export const StyledAuthor = styled.div.attrs<{
  condensed?: boolean
  color: string
}>({})`
  margin: 10px 20px 0 0;
  ${props => bullet(props.color, props.condensed)};
`

const bullet = (color, condensed = false) => {
  return `
    &::before {
      content: "";
      display: inline-block;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      margin: ${condensed ? "0 5px 1px 0;" : "5px 5px 1px 0"};
      background-color: ${color};
    }
  `
}

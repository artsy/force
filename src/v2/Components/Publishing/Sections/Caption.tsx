import { garamond, unica } from "v2/Assets/Fonts"
import { pMedia } from "v2/Components/Helpers"
import { ArticleLayout, SectionLayout } from "v2/Components/Publishing/Typings"
import React from "react"
import styled from "styled-components"

interface CaptionProps {
  caption: string
  color?: string
  index?: any
  layout?: ArticleLayout
  sectionLayout?: SectionLayout
}

interface FigcaptionProps {
  color?: string
  layout: ArticleLayout
  sectionLayout?: SectionLayout
}

export const Caption: React.SFC<CaptionProps> = props => {
  const { caption, children, color, layout, sectionLayout } = props

  const child = children || (
    <div dangerouslySetInnerHTML={{ __html: caption }} />
  )

  return (
    <CaptionContainer>
      <Figcaption layout={layout} sectionLayout={sectionLayout} color={color}>
        {child}
      </Figcaption>
    </CaptionContainer>
  )
}

export const CaptionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px 0 10px 0;

  ${pMedia.xs`
    padding: 0px 10px;
  `};
`

// includes draft placeholder class for editable text in Writer
const Figcaption = styled.div<FigcaptionProps>`
  padding: ${props => (props.sectionLayout === "fillwidth" ? "0 10px;" : "0;")}
  width: 100%;
  word-break: break-word;

  & > p, p,
  .public-DraftEditorPlaceholder-root,
  .public-DraftStyleDefault-block {
    ${props => (props.layout === "classic" ? garamond("s15") : unica("s14"))}
    color: ${props =>
    props.color ? props.color : props.layout === "classic" ? "#666" : "#999"};
    margin: 0;
    display: inline;
  }

  & > a, a {
    color: #999;
    &:hover {
      color: black;
    }
  }

  ${pMedia.xs`
    padding: 0px;
  `}
`

import { garamond } from "v2/Assets/Fonts"
import { Truncator } from "v2/Components/Truncator"
import React from "react"
import Markdown from "react-markdown"
import styled from "styled-components"

interface Props {
  text: string
}

export const ToolTipDescription: React.SFC<Props> = props => {
  const { text } = props

  return (
    <Description>
      <Truncator maxLineCount={3}>
        <Markdown
          source={text}
          containerTagName="span"
          disallowedTypes={["Link", "Paragraph"]}
          unwrapDisallowed
        />
      </Truncator>
    </Description>
  )
}

const Description = styled.div`
  ${garamond("s15")};

  p,
  p:first-child::first-letter {
    margin: 0;
    ${garamond("s15")};
  }
  padding-bottom: 10px;
`

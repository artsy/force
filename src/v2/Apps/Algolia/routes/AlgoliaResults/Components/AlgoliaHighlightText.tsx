import { Text, TextProps } from "@artsy/palette"
import { connectHighlight, HighlightProps } from "react-instantsearch-core"
import styled from "styled-components"
import { themeGet } from "@styled-system/theme-get"
import { AlgoliaHit } from "v2/Apps/Algolia/types"

interface AlgoliaHighlightTextProps extends TextProps, HighlightProps {
  color?: string
}

export const RawAlgoliaHighlightText: React.FC<AlgoliaHighlightTextProps> = props => {
  const { attribute, hit, highlight, ...other } = props

  const parsedHit = highlight({
    highlightProperty: "_highlightResult",
    attribute,
    hit,
  })

  return (
    <Text {...other}>
      {parsedHit.map((part, index) =>
        part.isHighlighted ? (
          <HighlightedText key={index}>{part.value}</HighlightedText>
        ) : (
          part.value
        )
      )}
    </Text>
  )
}

export const AlgoliaHighlightText = connectHighlight<
  AlgoliaHighlightTextProps,
  AlgoliaHit
>(RawAlgoliaHighlightText)

const HighlightedText = styled.span`
  color: ${themeGet("colors.blue100")};
  font-weight: bold;
`

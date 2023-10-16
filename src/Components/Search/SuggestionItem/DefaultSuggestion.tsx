import { FC } from "react"
import { SuggestionItemOptionProps } from "./SuggestionItem"
import match from "autosuggest-highlight/match"
import parse from "autosuggest-highlight/parse"
import { SuggestionItemPreview } from "./SuggestionItemPreview"
import { Highlight } from "./Highlight"
import { Text, Flex, Spacer } from "@artsy/palette"

interface DefaultSuggestionProps {
  option: SuggestionItemOptionProps
  query: string
}

export const DefaultSuggestion: FC<DefaultSuggestionProps> = ({
  option,
  query,
}) => {
  const matches = match(option.text, query)
  const parts = parse(option.text, matches)
  const partTags = parts.map(({ highlight, text }, index) =>
    highlight ? <Highlight key={index}>{text}</Highlight> : text
  )

  return (
    <Flex alignItems="center">
      <SuggestionItemPreview
        imageUrl={option.imageUrl}
        label={option.subtitle}
      />
      <Spacer x={1} />
      <Flex flexDirection="column" flex={1} overflow="hidden">
        <Text variant="sm-display" overflowEllipsis>
          {partTags}
        </Text>

        <Text color="black60" variant="xs" overflowEllipsis>
          {option.subtitle}
        </Text>
      </Flex>
    </Flex>
  )
}

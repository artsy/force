import { Flex, Spacer, Text } from "@artsy/palette"
import { useFlag } from "@unleash/proxy-client-react"
import match from "autosuggest-highlight/match"
import parse from "autosuggest-highlight/parse"
import type { FC, ReactNode } from "react"
import { Highlight } from "./Highlight"
import type { SuggestionItemOptionProps } from "./SuggestionItem"
import { SuggestionItemPreview } from "./SuggestionItemPreview"
import { parseHighlightFragments } from "./parseHighlightFragments"

interface DefaultSuggestionProps {
  option: SuggestionItemOptionProps
  query: string
}

export const DefaultSuggestion: FC<
  React.PropsWithChildren<DefaultSuggestionProps>
> = ({ option, query }) => {
  const enableServerHighlights = useFlag("onyx_search-highlighting")
  const enableAlternateNameDisplay = useFlag(
    "onyx_search-alternate-name-display"
  )

  const { nameParts, alternateParts } = resolveSuggestionParts(
    enableServerHighlights ? option : { ...option, highlights: null },
    query,
    enableAlternateNameDisplay
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
          {nameParts}
          {alternateParts && (
            <Text as="span" variant="sm-display" color="mono60">
              {" "}
              ({alternateParts})
            </Text>
          )}
        </Text>

        <Text color="mono60" variant="xs" overflowEllipsis>
          {option.subtitle}
        </Text>
      </Flex>
    </Flex>
  )
}

function resolveSuggestionParts(
  option: SuggestionItemOptionProps,
  query: string,
  enableAlternateNameDisplay: boolean
): { nameParts: ReactNode[]; alternateParts: ReactNode[] | null } {
  const nameHighlight = option.highlights?.find((h) => h.field === "name")
  const alternateHighlight = option.highlights?.find(
    (h) => h.field === "alternate_names"
  )

  const firstNameFragment = nameHighlight?.fragments?.[0]
  const firstAlternateFragment = alternateHighlight?.fragments?.[0]

  const clientMatches = match(option.text, query)
  const hasClientHighlights = clientMatches.length > 0
  const hasNameHighlight = Boolean(firstNameFragment)

  const canShowAlternateName =
    enableAlternateNameDisplay && option.typename === "Artist"

  const alternateParts =
    canShowAlternateName &&
    !hasClientHighlights &&
    !hasNameHighlight &&
    firstAlternateFragment
      ? parseHighlightFragments(firstAlternateFragment)
      : null

  if (hasClientHighlights) {
    return {
      nameParts: parse(option.text, clientMatches).map(
        ({ highlight, text }, index) =>
          highlight ? <Highlight key={index}>{text}</Highlight> : text
      ),
      alternateParts,
    }
  }

  if (firstNameFragment) {
    return {
      nameParts: parseHighlightFragments(firstNameFragment),
      alternateParts,
    }
  }

  return {
    nameParts: [option.text],
    alternateParts,
  }
}

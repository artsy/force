import { themeGet } from "@styled-system/theme-get"
import { Flex, Text } from "@artsy/palette"
import type { FC, MouseEvent } from "react"
import styled from "styled-components"
import { SuggestedFiltersIcon } from "./SuggestedFiltersIcon"
import { SuggestionItemLink } from "./SuggestionItem/SuggestionItemLink"
import { highlightMatchedTokens } from "./utils/highlightMatchedTokens"
import type { ParsedFilterQuery } from "./utils/parseFilterQuery"

const ICON_TILE_SIZE = 48
// Off the theme space scale (1 = 10px, 2 = 20px), so set directly
const ROW_PADDING_Y = "16px"
const ICON_GAP = "14px"
const LABEL_SEPARATOR = " · "

interface SuggestedFiltersItemProps {
  parsed: ParsedFilterQuery
  href: string
  /** The query the filters were parsed from, not the live input value */
  query: string
  onClick: (event?: MouseEvent<HTMLElement>) => void
}

export const SuggestedFiltersItem: FC<SuggestedFiltersItemProps> = ({
  parsed,
  href,
  query,
  onClick,
}) => {
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    onClick(event)
  }

  const handleMouseDown = (event: MouseEvent<HTMLAnchorElement>) => {
    // Prevent AutocompleteInput mousedown selection so native link behavior is preserved.
    event.stopPropagation()
  }

  const { title, detail } = getRowText(parsed)

  return (
    <SuggestedFiltersLink
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      to={href}
      data-testid="suggestedFiltersRow"
    >
      <Flex alignItems="center" style={{ gap: ICON_GAP }}>
        <Flex
          width={ICON_TILE_SIZE}
          height={ICON_TILE_SIZE}
          bg="mono10"
          alignItems="center"
          justifyContent="center"
          flexShrink={0}
        >
          <SuggestedFiltersIcon />
        </Flex>

        <Flex flexDirection="column" flex={1} overflow="hidden">
          <Text variant="md" overflowEllipsis>
            {highlightMatchedTokens(title, query)}
          </Text>

          {detail && (
            <Text variant="xs" color="mono60" mt="2px" overflowEllipsis>
              in {highlightMatchedTokens(detail, query)}
            </Text>
          )}
        </Flex>
      </Flex>
    </SuggestedFiltersLink>
  )
}

// Headline is the free text, second line is what it's filtered to. With no
// free text a nationality takes the headline — "Chinese" in "Photography"
// reads the way language does. Nothing else does: promoting the first label
// made "unique prints under 10000" read as "Prints" in "Under $10,000", so
// every other case keeps the filters on one line.
const getRowText = (
  parsed: ParsedFilterQuery,
): { title: string; detail: string | null } => {
  const { keyword, labels, nationalityLabels } = parsed

  if (keyword) {
    return { title: keyword, detail: labels.join(LABEL_SEPARATOR) }
  }

  if (nationalityLabels.length > 0) {
    const rest = labels.filter(label => {
      return !nationalityLabels.includes(label)
    })

    return {
      title: nationalityLabels.join(LABEL_SEPARATOR),
      detail: rest.join(LABEL_SEPARATOR),
    }
  }

  return { title: labels.join(LABEL_SEPARATOR), detail: null }
}

// Tinted so the row reads as a suggestion. Its resting state is the entity
// rows' hover colour, so hover goes a step darker.
const SuggestedFiltersLink = styled(SuggestionItemLink)`
  background-color: ${themeGet("colors.mono5")};
  padding-top: ${ROW_PADDING_Y};
  padding-bottom: ${ROW_PADDING_Y};

  &:hover {
    background-color: ${themeGet("colors.mono10")};
  }

  /* <Highlight> is a <strong>; the design distinguishes matches by colour
     alone, and bold reads far heavier at this row's 20px title */
  strong {
    font-weight: inherit;
  }
`

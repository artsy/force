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
  /**
   * The query the filters were parsed from — not the live input value, so the
   * highlighted terms always correspond to what produced this row.
   */
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

  /*
   * The two lines mean different things: the headline is what you're looking
   * for, the second line is where it's filtered to. When the whole query became
   * filters there is no "what", so the filters are the headline and the "in"
   * line is dropped — borrowing the first filter up to the headline made
   * "unique prints under 10000" read as the keyword "Prints" filtered "in
   * Under $10,000".
   */
  const title = parsed.keyword || parsed.labels.join(LABEL_SEPARATOR)
  const detail = parsed.keyword ? parsed.labels.join(LABEL_SEPARATOR) : null

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

/**
 * Tinted so the row reads as a suggestion rather than another result. Its
 * resting state is the entity rows' hover colour, so hover goes one step
 * darker.
 */
const SuggestedFiltersLink = styled(SuggestionItemLink)`
  background-color: ${themeGet("colors.mono5")};
  padding-top: ${ROW_PADDING_Y};
  padding-bottom: ${ROW_PADDING_Y};

  &:hover {
    background-color: ${themeGet("colors.mono10")};
  }

  /*
   * Matched terms are marked up with <Highlight>, a styled <strong>, so they
   * pick up the UA stylesheet's bold. The design distinguishes them by colour
   * alone — and at this row's 20px title, bold reads far heavier than it does
   * on the 16px entity rows. Colour is carried by Highlight itself.
   */
  strong {
    font-weight: inherit;
  }
`

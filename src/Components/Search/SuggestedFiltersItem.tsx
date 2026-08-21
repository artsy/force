import FilterIcon from "@artsy/icons/FilterIcon"
import { Flex, Spacer, Text } from "@artsy/palette"
import type { FC, MouseEvent } from "react"
import { SuggestionItemLink } from "./SuggestionItem/SuggestionItemLink"
import type { ParsedFilterQuery } from "./utils/parseFilterQuery"

const PREVIEW_SIZE = 50

interface SuggestedFiltersItemProps {
  parsed: ParsedFilterQuery
  href: string
  onClick: (event?: MouseEvent<HTMLElement>) => void
}

export const SuggestedFiltersItem: FC<SuggestedFiltersItemProps> = ({
  parsed,
  href,
  onClick,
}) => {
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    onClick(event)
  }

  const handleMouseDown = (event: MouseEvent<HTMLAnchorElement>) => {
    // Prevent AutocompleteInput mousedown selection so native link behavior is preserved.
    event.stopPropagation()
  }

  // With no leftover text the filters themselves are the headline
  const [firstLabel, ...restLabels] = parsed.labels
  const title = parsed.keyword || firstLabel
  const detail = parsed.keyword ? parsed.labels : restLabels

  return (
    <SuggestionItemLink
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      to={href}
    >
      <Flex alignItems="center">
        <Flex
          width={PREVIEW_SIZE}
          height={PREVIEW_SIZE}
          bg="mono5"
          alignItems="center"
          justifyContent="center"
          flexShrink={0}
        >
          <FilterIcon />
        </Flex>

        <Spacer x={1} />

        <Flex flexDirection="column" flex={1} overflow="hidden">
          <Text variant="sm-display" overflowEllipsis>
            {title}
          </Text>

          <Text color="mono60" variant="xs" overflowEllipsis>
            {detail.length > 0 ? `in ${detail.join(" · ")}` : "Browse artworks"}
          </Text>
        </Flex>
      </Flex>
    </SuggestionItemLink>
  )
}

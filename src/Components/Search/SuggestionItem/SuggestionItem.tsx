import { Box, Pill } from "@artsy/palette"
import { QuickNavigationItem } from "Components/Search/SuggestionItem/QuickNavigationItem"
import type { FC, MouseEvent } from "react"
import { DefaultSuggestion } from "./DefaultSuggestion"
import { SuggestionItemLink } from "./SuggestionItemLink"
import type { SearchHighlightData } from "./parseHighlightFragments"

export interface SuggestionItemOptionProps {
  text: string
  value: string
  subtitle: string
  imageUrl: string
  showAuctionResultsButton: boolean
  href: string
  typename: string
  item_id?: string
  item_number?: number
  item_type?: string
  highlights?: ReadonlyArray<SearchHighlightData> | null
}

interface SuggestionItemProps {
  query: string
  option: SuggestionItemOptionProps
  onClick: (
    option: SuggestionItemOptionProps,
    event?: MouseEvent<HTMLElement>,
  ) => void
  onQuickNavClick: (
    option: SuggestionItemOptionProps,
    event: MouseEvent<HTMLElement>,
  ) => void
}

export const SuggestionItem: FC<
  React.PropsWithChildren<SuggestionItemProps>
> = props => {
  const { option, onClick, onQuickNavClick } = props
  const auctionResultsPath = `${option.href}/auction-results`

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    onClick(option, event)
  }

  const handleQuickNavClick = (event: MouseEvent<HTMLElement>) => {
    onQuickNavClick(option, event)
  }

  const handleMouseDown = (event: MouseEvent<HTMLAnchorElement>) => {
    // Prevent AutocompleteInput mousedown selection so native link behavior is preserved.
    event.stopPropagation()
  }

  return (
    <Box position="relative">
      <SuggestionItemLink
        onClick={handleClick}
        onMouseDown={handleMouseDown}
        to={option.href}
      >
        <DefaultSuggestion {...props} />

        {/* We size out a placeholder here so that we can avoid nesting the anchor tags */}
        {option.showAuctionResultsButton && (
          <Box pt={1}>
            <Pill
              disabled
              aria-hidden
              style={{ pointerEvents: "none", visibility: "hidden" }}
            >
              Placeholder
            </Pill>
          </Box>
        )}
      </SuggestionItemLink>

      {/* Positioned where this would naturally fall given the above placeholder */}
      {option.showAuctionResultsButton && (
        <Box py={1} px={2} position="absolute" bottom={0} left={0}>
          <QuickNavigationItem
            onClick={handleQuickNavClick}
            label="Auction Results"
            to={auctionResultsPath}
          />
        </Box>
      )}
    </Box>
  )
}

import * as React from "react"
import { FC } from "react"
import { SuggestionItemLink } from "./SuggestionItemLink"
import { DefaultSuggestion } from "./DefaultSuggestion"
import { Box, Pill } from "@artsy/palette"
import { QuickNavigationItem } from "Components/Search/SuggestionItem/QuickNavigationItem"

export interface SuggestionItemOptionProps {
  text: string
  value: string
  subtitle: string
  imageUrl: string
  showAuctionResultsButton: boolean
  href: string
  typename: string
}

interface SuggestionItemProps {
  query: string
  option: SuggestionItemOptionProps
  onClick: (option?: SuggestionItemOptionProps) => void
}

export const SuggestionItem: FC<SuggestionItemProps> = props => {
  const { option, onClick } = props

  const handleClick = () => {
    onClick(option)
  }

  return (
    <Box position="relative">
      <SuggestionItemLink onClick={handleClick} to={option.href}>
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
            onClick={handleClick}
            label="Auction Results"
            to={`${option.href}/auction-results`}
          />
        </Box>
      )}
    </Box>
  )
}

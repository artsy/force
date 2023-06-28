import * as React from "react"
import { FC } from "react"
import { SuggestionItemLink } from "./SuggestionItemLink"
import { DefaultSuggestion } from "./DefaultSuggestion"
import { QuickNavigation } from "./QuickNavigation"

export interface SuggestionItemOptionProps {
  text: string
  value: string
  subtitle: string
  imageUrl: string
  showArtworksButton: boolean
  showAuctionResultsButton: boolean
  href: string
  typename: string
  item_number: number
  item_type: string
}

interface SuggestionItemProps {
  query: string
  option: SuggestionItemOptionProps
  onRedirect: (
    option?: SuggestionItemOptionProps,
    quickNavigation?: boolean
  ) => void
}

export const NewSuggestionItem: FC<SuggestionItemProps> = props => {
  const { option, onRedirect } = props

  const handleClick = () => {
    onRedirect(option)
  }

  const handleQuickNavigationClick = () => {
    onRedirect(option, true)
  }

  return (
    <SuggestionItemLink onClick={handleClick} to={option.href}>
      <DefaultSuggestion {...props} />
      <QuickNavigation option={option} onClick={handleQuickNavigationClick} />
    </SuggestionItemLink>
  )
}

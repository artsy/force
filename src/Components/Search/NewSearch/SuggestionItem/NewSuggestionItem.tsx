import * as React from "react"
import { FC } from "react"
import { SuggestionItemLink } from "./SuggestionItemLink"
import { DefaultSuggestion } from "./DefaultSuggestion"
import { QuickNavigation } from "./QuickNavigation"
import { PillType } from "Components/Search/NewSearch/constants"

export interface SuggionItemOptionProps {
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
  option: SuggionItemOptionProps
  onRedirect: () => void
  selectedPill: PillType
}

export const NewSuggestionItem: FC<SuggestionItemProps> = props => {
  const { option, onRedirect, selectedPill } = props

  const handleClick = () => {
    onRedirect()
  }

  return (
    <SuggestionItemLink onClick={handleClick} to={option.href}>
      <DefaultSuggestion {...props} />
      <QuickNavigation option={option} />
    </SuggestionItemLink>
  )
}

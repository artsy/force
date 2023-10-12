import { getLabel } from "./getLabel"
import { SuggestionItemOptionProps } from "Components/Search/SuggestionItem/SuggestionItem"

export interface SearchNodeOption {
  __typename: string
  displayLabel?: string
  displayType?: string
  imageUrl?: string
  statuses?: {
    auctionLots?: boolean
  }
  href?: string
}

export const formatOptions = (
  options: SearchNodeOption[]
): SuggestionItemOptionProps[] => {
  return options.map((option, index) => {
    return {
      text: option.displayLabel!,
      value: option.displayLabel!,
      subtitle:
        getLabel({
          displayType: option.displayType ?? "",
          typename: option.__typename,
        }) ?? "",
      imageUrl: option.imageUrl!,
      showAuctionResultsButton: !!option.statuses?.auctionLots,
      href: option.href!,
      typename: option.__typename,
      item_number: index,
      item_type: option.displayType!,
    }
  })
}

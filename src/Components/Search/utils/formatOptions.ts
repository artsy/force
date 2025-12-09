import type { SuggestionItemOptionProps } from "Components/Search/SuggestionItem/SuggestionItem"
import { getLabel } from "./getLabel"

export interface SearchNodeOption {
  __typename: string
  displayLabel?: string
  displayType?: string
  imageUrl?: string
  statuses?: {
    auctionLots?: boolean
  }
  href?: string
  internalID?: string
}

export const formatOptions = (
  options: SearchNodeOption[],
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
      item_id: option.internalID!,
      item_number: index,
      item_type: option.displayType!,
    }
  })
}

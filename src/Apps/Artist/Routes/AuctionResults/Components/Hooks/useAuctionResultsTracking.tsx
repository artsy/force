import {
  ActionType,
  type ClickedAuctionResultItem,
  ContextModule,
  type EntityModuleType,
  OwnerType,
} from "@artsy/cohesion"
import { useTracking } from "react-tracking"

export const useAuctionResultsTracking = () => {
  const { trackEvent } = useTracking()

  return {
    trackClickedAuctionResultItem: (
      options: {
        type?: EntityModuleType
        expanded?: boolean
        context_page_owner_type?:
          | OwnerType.artistAuctionResults
          | OwnerType.myCollectionArtworkInsights
          | OwnerType.myCollectionInsights
          | OwnerType.artist
          | OwnerType.auctionResult
      } = {},
    ) => {
      const {
        type,
        expanded,
        context_page_owner_type = OwnerType.artistAuctionResults,
      } = options
      const payload: Partial<ClickedAuctionResultItem> = {
        action: ActionType.clickedAuctionResultItem,
        context_module: ContextModule.auctionResults,
        context_page_owner_type,
        type,
        expanded,
      }

      trackEvent(payload)
    },
  }
}

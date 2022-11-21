import {
  ActionType,
  ContextModule,
  OwnerType,
  ClickedAuctionResultItem,
} from "@artsy/cohesion"
import { useTracking } from "react-tracking"

export const useAuctionResultsTracking = () => {
  const { trackEvent } = useTracking()

  return {
    trackClickedAuctionResultItem: (
      expanded: boolean,
      context_page_owner_type:
        | OwnerType.artistAuctionResults
        | OwnerType.myCollectionArtworkInsights
        | OwnerType.myCollectionInsights = OwnerType.artistAuctionResults
    ) => {
      const payload: Partial<ClickedAuctionResultItem> = {
        action: ActionType.clickedAuctionResultItem,
        context_module: ContextModule.auctionResults,
        context_page_owner_type,
        expanded,
      }

      trackEvent(payload)
    },
  }
}

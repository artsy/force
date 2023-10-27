import {
  ActionType,
  ClickedAddNewShippingAddress,
  ClickedSelectShippingOption,
  ClickedShippingAddress,
  ContextModule,
  ErrorMessageViewed,
  OwnerType,
} from "@artsy/cohesion"
import { useMemo } from "react"

import { useTracking } from "react-tracking"

export const useOrderTracking = (orderID: string) => {
  const { trackEvent } = useTracking()

  const trackingCalls = useMemo(() => {
    return {
      clickedShippingAddress: () => {
        const payload: ClickedShippingAddress = {
          action: ActionType.clickedShippingAddress,
          context_module: ContextModule.ordersShipping,
          context_page_owner_type: "orders-shipping",
          context_page_owner_id: orderID,
        }

        trackEvent(payload)
      },

      clickedSelectShippingOption: (newShippingQuoteId: string) => {
        const payload: ClickedSelectShippingOption = {
          action: ActionType.clickedSelectShippingOption,
          context_module: ContextModule.ordersShipping,
          context_page_owner_type: "orders-shipping",
          subject: newShippingQuoteId,
          context_page_owner_id: orderID,
        }

        trackEvent(payload)
      },

      errorMessageViewed: (
        error_code: string | null,

        title: string,
        message: string,
        flow: string
      ) => {
        const payload: ErrorMessageViewed = {
          action: ActionType.errorMessageViewed,
          context_owner_type: OwnerType.ordersShipping,
          context_owner_id: orderID,
          title,
          message,
          error_code: error_code || undefined,
          flow,
        }

        trackEvent(payload)
      },

      clickedAddNewShippingAddress: () => {
        const payload: ClickedAddNewShippingAddress = {
          action: ActionType.clickedAddNewShippingAddress,
          context_page_owner_type: OwnerType.ordersShipping,
          context_page_owner_id: orderID,
          context_module: ContextModule.ordersShipping,
        }

        trackEvent(payload)
      },
    }
  }, [trackEvent, orderID])

  return trackingCalls
}

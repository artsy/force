import {
  ActionType,
  type ClickedAddNewShippingAddress,
  type ClickedSelectShippingOption,
  type ClickedShippingAddress,
  ContextModule,
  type ErrorMessageViewed,
  OwnerType,
} from "@artsy/cohesion"
import * as DeprecatedSchema from "@artsy/cohesion/dist/DeprecatedSchema"
import type { FulfillmentType } from "Apps/Order/Routes/Shipping/Utils/shippingUtils"
import { useAnalyticsContext } from "System/Hooks/useAnalyticsContext"
import { useMemo } from "react"
import { useTracking } from "react-tracking"

export const useOrderTracking = () => {
  const { trackEvent } = useTracking()
  const analytics = useAnalyticsContext()
  const contextPageOwnerId = analytics.contextPageOwnerId as string

  const trackingCalls = useMemo(() => {
    return {
      clickedShippingAddress: () => {
        const payload: ClickedShippingAddress = {
          action: ActionType.clickedShippingAddress,
          context_module: ContextModule.ordersShipping,
          context_page_owner_type: "orders-shipping",
          context_page_owner_id: contextPageOwnerId,
        }

        trackEvent(payload)
      },

      clickedSelectShippingOption: (newShippingQuoteId: string) => {
        const payload: ClickedSelectShippingOption = {
          action: ActionType.clickedSelectShippingOption,
          context_module: ContextModule.ordersShipping,
          context_page_owner_type: "orders-shipping",
          subject: newShippingQuoteId,
          context_page_owner_id: contextPageOwnerId,
        }

        trackEvent(payload)
      },

      errorMessageViewed: ({
        error_code,
        title,
        message,
        flow,
      }: {
        error_code: string | null
        title: string
        message: string
        flow: string
      }) => {
        const payload: ErrorMessageViewed = {
          action: ActionType.errorMessageViewed,
          context_owner_type: OwnerType.ordersShipping,
          context_owner_id: contextPageOwnerId,
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
          context_page_owner_id: contextPageOwnerId,
          context_module: ContextModule.ordersShipping,
        }

        trackEvent(payload)
      },

      clickedFulfillmentType: (fulfillmentType: FulfillmentType) => {
        const payload = {
          action: DeprecatedSchema.ActionType.Click,
          subject:
            fulfillmentType === "SHIP"
              ? DeprecatedSchema.Subject.BNMOProvideShipping
              : DeprecatedSchema.Subject.BNMOArrangePickup,
          flow: "buy now",
          type: "button",
        }

        trackEvent(payload)
      },
    }
  }, [trackEvent, contextPageOwnerId])

  return trackingCalls
}

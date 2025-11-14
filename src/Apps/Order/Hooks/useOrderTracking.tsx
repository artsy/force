import {
  ActionType,
  type ClickedAddNewShippingAddress,
  type ClickedCancelExpressCheckout,
  type ClickedExpressCheckout,
  type ClickedSelectShippingOption,
  type ClickedShippingAddress,
  ContextModule,
  type ErrorMessageViewed,
  type ExpressCheckoutViewed,
  OwnerType,
  type SubmittedOffer,
  type SubmittedOrder,
} from "@artsy/cohesion"
import * as DeprecatedSchema from "@artsy/cohesion/dist/DeprecatedSchema"
import type { FulfillmentType } from "Apps/Order/Routes/Shipping/Utils/shippingUtils"
import { useAnalyticsContext } from "System/Hooks/useAnalyticsContext"
import type { ExpressCheckoutUI_order$data } from "__generated__/ExpressCheckoutUI_order.graphql"
import type { Review_order$data } from "__generated__/Review_order.graphql"
import { useMemo } from "react"
import { useTracking } from "react-tracking"

export const useOrderTracking = () => {
  const { trackEvent } = useTracking()
  const analytics = useAnalyticsContext()
  const contextPageOwnerId = analytics.contextPageOwnerId as string
  const contextPageOwnerSlug = analytics.contextPageOwnerSlug as string
  const contextPageOwnerType = analytics.contextPageOwnerType as OwnerType

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
          context_owner_type: contextPageOwnerType,
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

      expressCheckoutViewed: ({
        order,
        walletType,
      }: {
        order: ExpressCheckoutUI_order$data
        walletType: string[]
      }) => {
        const payload: ExpressCheckoutViewed = {
          action: ActionType.expressCheckoutViewed,
          context_page_owner_type: contextPageOwnerType,
          context_page_owner_id: contextPageOwnerId,
          context_page_owner_slug: contextPageOwnerSlug,
          flow:
            order.source === "PARTNER_OFFER"
              ? "Partner offer"
              : order.mode === "BUY"
                ? "Buy now"
                : "Make offer",
          credit_card_wallet_types: walletType,
        }

        trackEvent(payload)
      },

      clickedExpressCheckout: ({
        order,
        walletType,
      }: {
        order: ExpressCheckoutUI_order$data
        walletType: string
      }) => {
        const payload: ClickedExpressCheckout = {
          action: ActionType.clickedExpressCheckout,
          context_page_owner_type: contextPageOwnerType,
          context_page_owner_id: contextPageOwnerId,
          flow:
            order.source === "PARTNER_OFFER"
              ? "Partner offer"
              : order.mode === "BUY"
                ? "Buy now"
                : "Make offer",
          credit_card_wallet_type: walletType,
        }

        trackEvent(payload)
      },

      clickedCancelExpressCheckout: ({
        order,
        walletType,
      }: {
        order: ExpressCheckoutUI_order$data
        walletType: string
      }) => {
        const payload: ClickedCancelExpressCheckout = {
          action: ActionType.clickedCancelExpressCheckout,
          context_page_owner_type: contextPageOwnerType,
          context_page_owner_id: contextPageOwnerId,
          flow:
            order.source === "PARTNER_OFFER"
              ? "Partner offer"
              : order.mode === "BUY"
                ? "Buy now"
                : "Make offer",
          credit_card_wallet_type: walletType,
        }

        trackEvent(payload)
      },

      submittedOffer: ({
        order,
        walletType,
      }: {
        order: ExpressCheckoutUI_order$data | Review_order$data
        walletType?: string
      }) => {
        const payload: SubmittedOffer = {
          action: ActionType.submittedOffer,
          context_page_owner_type: contextPageOwnerType,
          order_id: contextPageOwnerId,
          flow:
            order.source === "PARTNER_OFFER" ? "Partner offer" : "Make offer",
          ...(walletType ? { credit_card_wallet_type: walletType } : {}),
        }

        trackEvent(payload)
      },

      submittedOrder: ({
        order,
        walletType,
      }: {
        order: ExpressCheckoutUI_order$data | Review_order$data
        walletType?: string
      }) => {
        const payload: SubmittedOrder = {
          action: ActionType.submittedOrder,
          context_page_owner_type: contextPageOwnerType,
          order_id: contextPageOwnerId,
          flow: order.source === "PARTNER_OFFER" ? "Partner offer" : "Buy now",
          ...(walletType ? { credit_card_wallet_type: walletType } : {}),
        }

        trackEvent(payload)
      },
    }
  }, [
    trackEvent,
    contextPageOwnerId,
    contextPageOwnerSlug,
    contextPageOwnerType,
  ])

  return trackingCalls
}

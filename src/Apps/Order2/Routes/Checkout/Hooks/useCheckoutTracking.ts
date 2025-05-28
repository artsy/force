import {
  ActionType,
  type ClickedCancelExpressCheckout,
  type ClickedExpressCheckout,
  type ErrorMessageViewed,
  type ExpressCheckoutViewed,
  type OwnerType,
  type SubmittedOrder,
} from "@artsy/cohesion"
import { useAnalyticsContext } from "System/Hooks/useAnalyticsContext"
import { useMemo } from "react"
import { useTracking } from "react-tracking"

export const useCheckoutTracking = () => {
  const { trackEvent } = useTracking()
  const analytics = useAnalyticsContext()
  const contextPageOwnerId = analytics.contextPageOwnerId as string
  const contextPageOwnerSlug = analytics.contextPageOwnerSlug as string
  const contextPageOwnerType = analytics.contextPageOwnerType as OwnerType

  const trackingCalls = useMemo(() => {
    return {
      submittedOrder: ({
        order,
        walletType,
      }: {
        order: { source: string }
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

      expressCheckoutViewed: ({
        order,
        walletType,
      }: {
        order: { source: string; mode: string }
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
        order: { source: string; mode: string }
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
        order: { source: string; mode: string }
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
    }
  }, [
    trackEvent,
    contextPageOwnerId,
    contextPageOwnerSlug,
    contextPageOwnerType,
  ])

  return trackingCalls
}

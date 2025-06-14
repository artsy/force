import {
  ActionType,
  type ClickedCancelExpressCheckout,
  type ClickedExpressCheckout,
  type ErrorMessageViewed,
  type ExpressCheckoutViewed,
  type OwnerType,
  type SubmittedOffer,
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

  const checkoutTracking = useMemo(() => {
    return {
      clickedExpressCheckout: ({
        source,
        mode,
        walletType,
      }: {
        source: string
        mode: string
        walletType: string
      }) => {
        const payload: ClickedExpressCheckout = {
          action: ActionType.clickedExpressCheckout,
          context_page_owner_type: contextPageOwnerType,
          context_page_owner_id: contextPageOwnerId,
          flow:
            source === "PARTNER_OFFER"
              ? "Partner offer"
              : mode === "BUY"
                ? "Buy now"
                : "Make offer",
          credit_card_wallet_type: walletType,
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
      clickedCancelExpressCheckout: ({
        source,
        mode,
        walletType,
      }: {
        source: string
        mode: string
        walletType: string
      }) => {
        const payload: ClickedCancelExpressCheckout = {
          action: ActionType.clickedCancelExpressCheckout,
          context_page_owner_type: contextPageOwnerType,
          context_page_owner_id: contextPageOwnerId,
          flow:
            source === "PARTNER_OFFER"
              ? "Partner offer"
              : mode === "BUY"
                ? "Buy now"
                : "Make offer",
          credit_card_wallet_type: walletType,
        }

        trackEvent(payload)
      },
      submittedOrder: ({
        source,
        walletType,
        mode,
      }: {
        source: string
        walletType?: string
        mode: "BUY" | "OFFER" | string
      }) => {
        const expressCheckoutValues = walletType
          ? { credit_card_wallet_type: walletType }
          : {}

        const [action, flow] = buyOrOfferValue(
          mode,
          [ActionType.submittedOrder, ActionType.submittedOffer],
          [
            source === "PARTNER_OFFER" ? "Partner offer" : "Buy now",
            "Make offer",
          ],
        )
        const payload: SubmittedOrder | SubmittedOffer = {
          context_page_owner_type: contextPageOwnerType,
          order_id: contextPageOwnerId,
          action,
          flow,
          ...expressCheckoutValues,
        }

        trackEvent(payload)
      },

      clickedPaymentMethod: ({
        mode,
        source,
        paymentMethod,
        amountMinor,
        currency,
      }: {
        mode: string
        source: string
        paymentMethod:
          | "US_BANK_ACCOUNT"
          | "CREDIT_CARD"
          | "WIRE_TRANSFER"
          | string
        amountMinor: number | null
        currency: string
      }) => {
        const [flow] = buyOrOfferValue(mode, [
          source === "PARTNER_OFFER" ? "Partner offer" : "Buy now",
          "Make offer",
        ])
        const payload = {
          context_page_owner_type: contextPageOwnerType,
          order_id: contextPageOwnerId,
          action: "clickedPaymentMethod",
          flow,
          subject: "click payment method",
          payment_method: paymentMethod,
          amount: amountMinor,
          currency,
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
    }
  }, [
    trackEvent,
    contextPageOwnerId,
    contextPageOwnerSlug,
    contextPageOwnerType,
  ])

  return checkoutTracking
}

const buyOrOfferValue = (
  buyOrOffer: "BUY" | "OFFER" | string,
  ...values: Array<[any, any]>
) =>
  values.map(([buyValue, offerValue]) =>
    buyOrOffer === "OFFER" ? offerValue : buyValue,
  )

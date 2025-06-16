import {
  ActionType,
  type ClickedCancelExpressCheckout,
  type ClickedExpressCheckout,
  ContextModule,
  type ErrorMessageViewed,
  type ExpressCheckoutViewed,
  type OwnerType,
  type SubmittedOffer,
  type SubmittedOrder,
} from "@artsy/cohesion"
import { useOrder2Tracking } from "Apps/Order2/Hooks/useOrder2Tracking"
import { useAnalyticsContext } from "System/Hooks/useAnalyticsContext"
import { useMemo } from "react"
import { useTracking } from "react-tracking"

export const useCheckoutTracking = ({
  source,
  mode,
}: {
  source: string
  mode: "BUY" | "OFFER" | string
}) => {
  const { trackEvent } = useTracking()
  const order2Tracking = useOrder2Tracking()
  const analytics = useAnalyticsContext()
  const contextPageOwnerId = analytics.contextPageOwnerId as string
  const contextPageOwnerSlug = analytics.contextPageOwnerSlug as string
  const contextPageOwnerType = analytics.contextPageOwnerType as OwnerType
  const flow = buyOrOfferValue(
    mode,
    source === "PARTNER_OFFER" ? "Partner offer" : "Buy now",
    "Make offer",
  )

  const checkoutTracking = useMemo(() => {
    return {
      clickedExpressCheckout: ({ walletType }: { walletType: string }) => {
        const payload: ClickedExpressCheckout = {
          action: ActionType.clickedExpressCheckout,
          context_page_owner_type: contextPageOwnerType,
          context_page_owner_id: contextPageOwnerId,
          flow,
          credit_card_wallet_type: walletType,
        }

        trackEvent(payload)
      },
      expressCheckoutViewed: ({ walletType }: { walletType: string[] }) => {
        const payload: ExpressCheckoutViewed = {
          action: ActionType.expressCheckoutViewed,
          context_page_owner_type: contextPageOwnerType,
          context_page_owner_id: contextPageOwnerId,
          context_page_owner_slug: contextPageOwnerSlug,
          flow,
          credit_card_wallet_types: walletType,
        }

        trackEvent(payload)
      },
      clickedCancelExpressCheckout: ({
        walletType,
      }: {
        walletType: string
      }) => {
        const payload: ClickedCancelExpressCheckout = {
          action: ActionType.clickedCancelExpressCheckout,
          context_page_owner_type: contextPageOwnerType,
          context_page_owner_id: contextPageOwnerId,
          // order_id: contextPageOwnerId, // TODO: Clarify whether we are using order_id
          flow,
          credit_card_wallet_type: walletType,
        }

        trackEvent(payload)
      },
      submittedOrder: (args: { walletType?: string } = {}) => {
        const { walletType } = args
        const expressCheckoutValues = walletType
          ? { credit_card_wallet_type: walletType }
          : {}

        const action = buyOrOfferValue(
          mode,
          ActionType.submittedOrder,
          ActionType.submittedOffer,
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

      clickedBuyerProtection: () =>
        order2Tracking.clickedBuyerProtection(ContextModule.ordersCheckout),

      clickedPaymentMethod: ({
        paymentMethod,
        amountMinor,
        currency,
      }: {
        paymentMethod:
          | "US_BANK_ACCOUNT"
          | "CREDIT_CARD"
          | "WIRE_TRANSFER"
          | string
        amountMinor: number | null
        currency: string
      }) => {
        const flow = buyOrOfferValue(
          mode,
          source === "PARTNER_OFFER" ? "Partner offer" : "Buy now",
          "Make offer",
        )
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
    flow,
    mode,
    source,
    order2Tracking.clickedBuyerProtection,
  ])

  return checkoutTracking
}

const buyOrOfferValue = <B, O>(
  buyOrOffer: "BUY" | "OFFER" | string,
  ifBuy: B,
  ifOffer: O,
) => (buyOrOffer === "OFFER" ? ifOffer : ifBuy)

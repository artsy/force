import {
  ActionType,
  type ClickedAddNewShippingAddress,
  type ClickedCancelExpressCheckout,
  type ClickedChangePaymentMethod,
  type ClickedChangeShippingAddress,
  type ClickedChangeShippingMethod,
  type ClickedExpressCheckout,
  type ClickedFulfillmentTab,
  type ClickedOfferOption,
  type ClickedOrderProgression,
  type ClickedPaymentMethod,
  type ClickedSelectShippingOption,
  type ClickedShippingAddress,
  ContextModule,
  type ErrorMessageViewed,
  type ExpressCheckoutViewed,
  type OrderProgressionViewed,
  type PageOwnerType,
  type SavedAddressViewed,
  type SavedPaymentMethodViewed,
  type SubmittedOffer,
  type SubmittedOrder,
  type ToggledCollapsibleOrderSummary,
} from "@artsy/cohesion"
import { useOrder2Tracking } from "Apps/Order2/Hooks/useOrder2Tracking"
import { useAnalyticsContext } from "System/Hooks/useAnalyticsContext"
import { useMemo } from "react"
import { useTracking } from "react-tracking"

export const useCheckoutTracking = ({
  source,
  mode,
}: {
  source: "PARTNER_OFFER" | unknown
  mode: "BUY" | "OFFER" | unknown
}) => {
  const { trackEvent } = useTracking()
  const order2Tracking = useOrder2Tracking(source, mode)
  const analytics = useAnalyticsContext()
  const contextPageOwnerId = analytics.contextPageOwnerId as string
  const contextPageOwnerSlug = analytics.contextPageOwnerSlug as string
  const contextPageOwnerType = analytics.contextPageOwnerType as PageOwnerType
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

      clickedFulfillmentTab: (method: "Pickup" | "Delivery") => {
        const payload: ClickedFulfillmentTab = {
          action: ActionType.clickedFulfillmentTab,
          context_page_owner_type: contextPageOwnerType,
          context_page_owner_id: contextPageOwnerId,
          method,
          flow,
        }

        trackEvent(payload)
      },

      expressCheckoutViewed: ({ walletTypes }: { walletTypes: string[] }) => {
        const payload: ExpressCheckoutViewed = {
          action: ActionType.expressCheckoutViewed,
          context_page_owner_type: contextPageOwnerType,
          context_page_owner_id: contextPageOwnerId,
          context_page_owner_slug: contextPageOwnerSlug,
          flow,
          credit_card_wallet_types: walletTypes,
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

      // Loaded from the more generic shared useOrder2Tracking hook
      clickedBuyerProtection: (contextModule?: ContextModule) =>
        order2Tracking.clickedBuyerProtection(
          contextModule || ContextModule.ordersCheckout,
        ),

      // Loaded from the more generic shared useOrder2Tracking hook
      clickedImportFees: (contextModule?: ContextModule) =>
        order2Tracking.clickedImportFees(
          contextModule || ContextModule.ordersCheckout,
        ),

      clickedPaymentMethod: ({
        paymentMethod,
        amountMinor,
        currency,
      }: {
        paymentMethod: string
        amountMinor: number
        currency: string
      }) => {
        const flow = buyOrOfferValue(
          mode,
          source === "PARTNER_OFFER" ? "Partner offer" : "Buy now",
          "Make offer",
        )
        const payload: ClickedPaymentMethod = {
          context_page_owner_type: contextPageOwnerType,
          order_id: contextPageOwnerId,
          action: ActionType.clickedPaymentMethod,
          flow,
          subject: "click payment method",
          payment_method: paymentMethod,
          amount: amountMinor,
          currency,
        }
        trackEvent(payload)
      },

      clickedChangeShippingAddress: () => {
        const payload: ClickedChangeShippingAddress = {
          action: ActionType.clickedChangeShippingAddress,
          context_module: ContextModule.ordersCheckout,
          context_page_owner_type: contextPageOwnerType,
          context_page_owner_id: contextPageOwnerId,
        }
        trackEvent(payload)
      },

      clickedShippingAddress: () => {
        const payload: ClickedShippingAddress = {
          action: ActionType.clickedShippingAddress,
          context_module: ContextModule.ordersFulfillment,
          context_page_owner_type: contextPageOwnerType,
          context_page_owner_id: contextPageOwnerId,
        }

        trackEvent(payload)
      },

      clickedAddNewShippingAddress: () => {
        const payload: ClickedAddNewShippingAddress = {
          action: ActionType.clickedAddNewShippingAddress,
          context_page_owner_type: contextPageOwnerType,
          context_page_owner_id: contextPageOwnerId,
          context_module: ContextModule.ordersFulfillment,
        }

        trackEvent(payload)
      },

      clickedSelectShippingOption: (option: string) => {
        const payload: ClickedSelectShippingOption = {
          action: ActionType.clickedSelectShippingOption,
          context_module: ContextModule.ordersShipping,
          context_page_owner_type: contextPageOwnerType,
          context_page_owner_id: contextPageOwnerId,
          subject: option,
        }

        trackEvent(payload)
      },

      clickedChangePaymentMethod: () => {
        const payload: ClickedChangePaymentMethod = {
          action: ActionType.clickedChangePaymentMethod,
          context_module: ContextModule.ordersCheckout,
          context_page_owner_type: contextPageOwnerType,
          context_page_owner_id: contextPageOwnerId,
        }
        trackEvent(payload)
      },

      clickedChangeDeliveryOptions: () => {
        const payload: ClickedChangeShippingMethod = {
          action: ActionType.clickedChangeShippingMethod,
          context_module: ContextModule.ordersCheckout,
          context_page_owner_type: contextPageOwnerType,
          context_page_owner_id: contextPageOwnerId,
        }
        trackEvent(payload)
      },

      clickedOrderProgression: (contextModule: ContextModule) => {
        const payload: ClickedOrderProgression = {
          action: ActionType.clickedOrderProgression,
          context_module: contextModule,
          context_page_owner_type: contextPageOwnerType,
          context_page_owner_id: contextPageOwnerId,
          flow,
        }
        trackEvent(payload)
      },

      orderProgressionViewed: (
        contextModule:
          | ContextModule.ordersOffer
          | ContextModule.ordersFulfillment
          | ContextModule.ordersShippingMethods
          | ContextModule.ordersPayment
          | ContextModule.ordersReview,
      ) => {
        const payload: OrderProgressionViewed = {
          action: ActionType.orderProgressionViewed,
          context_module: contextModule,
          context_page_owner_type: contextPageOwnerType,
          context_page_owner_id: contextPageOwnerId,
          flow,
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

      savedPaymentMethodViewed: (paymentMethods: string[]) => {
        const payload: SavedPaymentMethodViewed = {
          action: ActionType.savedPaymentMethodViewed,
          context_page_owner_type: contextPageOwnerType,
          context_page_owner_id: contextPageOwnerId,
          flow,
          payment_methods: paymentMethods,
        }
        trackEvent(payload)
      },

      savedAddressViewed: () => {
        const payload: SavedAddressViewed = {
          action: ActionType.savedAddressViewed,
          context_page_owner_type: contextPageOwnerType,
          context_page_owner_id: contextPageOwnerId,
          flow,
        }
        trackEvent(payload)
      },

      toggledCollapsibleOrderSummary: (expanded: boolean) => {
        const payload: ToggledCollapsibleOrderSummary = {
          action: ActionType.toggledCollapsibleOrderSummary,
          context_page_owner_type: contextPageOwnerType,
          context_page_owner_id: contextPageOwnerId,
          expanded,
          flow,
        }
        trackEvent(payload)
      },

      clickedOfferOption: (
        currencyCode: string,
        orderId: string,
        offerAmount: number,
        offerDescription?: string,
      ) => {
        const payload: ClickedOfferOption = {
          action: ActionType.clickedOfferOption,
          context_page_owner_id: contextPageOwnerId,
          context_page_owner_type: contextPageOwnerType,
          currency: currencyCode,
          order_id: orderId,
          flow: flow,
          offer: offerDescription || "Other amount",
          amount: offerAmount,
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
    order2Tracking.clickedImportFees,
  ])

  return checkoutTracking
}

const buyOrOfferValue = <B, O>(
  buyOrOffer: "BUY" | "OFFER" | unknown,
  ifBuy: B,
  ifOffer: O,
) => (buyOrOffer === "OFFER" ? ifOffer : ifBuy)

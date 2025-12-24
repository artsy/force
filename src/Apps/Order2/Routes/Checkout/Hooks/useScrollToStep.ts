import type { CheckoutStepName } from "Apps/Order2/Routes/Checkout/CheckoutContext/types"
import { useJump } from "Utils/Hooks/useJump"
import { useCallback } from "react"

export const STEP_JUMP_MAP: Record<CheckoutStepName, string> = {
  OFFER_AMOUNT: "offer-step",
  FULFILLMENT_DETAILS: "fulfillment-details-step",
  DELIVERY_OPTION: "delivery-options-step",
  PAYMENT: "payment-step",
  CONFIRMATION: "review-step",
}

// Sensible offset to position step tastefully in view
const OFFSET = 30

export const useScrollToStep = () => {
  const { jumpTo } = useJump({ behavior: "smooth" })

  const scrollToStep = useCallback(
    (stepName: CheckoutStepName) => {
      const jumpId = STEP_JUMP_MAP[stepName]
      if (!jumpId) return

      // Small delay to allow DOM to update after state change
      setTimeout(() => {
        jumpTo(jumpId, { behavior: "smooth", offset: OFFSET })
      }, 100)
    },
    [jumpTo],
  )

  return { scrollToStep }
}

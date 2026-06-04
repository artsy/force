import { CheckoutStepName } from "Apps/Order2/Routes/Checkout/CheckoutContext/types"
import { useCheckoutContext } from "Apps/Order2/Routes/Checkout/Hooks/useCheckoutContext"
import type { KnownErrorCodes } from "Apps/Order2/Utils/errors"

/**
 * Reads the FULFILLMENT_DETAILS section banner error from the checkout
 * context and exposes convenience flags for the codes the form views
 * branch on. Centralised so consumers don't repeat the section-messages
 * lookup or the magic string comparison.
 */
export const useFulfillmentDetailsError = () => {
  const { messages } = useCheckoutContext()
  const error = messages?.[CheckoutStepName.FULFILLMENT_DETAILS]?.error ?? null

  return {
    error,
    isMissingPostalCode:
      error?.code === ("missing_postal_code" satisfies KnownErrorCodes),
  }
}

import { useSetPaymentByStripeIntent } from "Apps/Order/Mutations/useSetPaymentByStripeIntentMutation"
import { CheckoutStepName } from "Apps/Order2/Routes/Checkout/CheckoutContext/types"
import { fetchAndSetConfirmationToken } from "Apps/Order2/Utils/confirmationTokenUtils"
import { useRouter } from "System/Hooks/useRouter"
import createLogger from "Utils/logger"
import { useEffect } from "react"
import { useRelayEnvironment } from "react-relay"
import { useCheckoutContext } from "./useCheckoutContext"

const logger = createLogger("useStripePaymentBySetupIntentId")

/*
 * Hook to handle Stripe redirect for newly-linked bank account in Order2
 * pulls necessary params from Stripe redirect URL and sets payment by intentId
 */
export function useStripePaymentBySetupIntentId(
  orderId: string,
  onComplete: () => void
) {
  const { submitMutation: setPaymentByStripeIntentMutation } =
    useSetPaymentByStripeIntent()
  const { router } = useRouter()
  const environment = useRelayEnvironment()
  const { setConfirmationToken, setPaymentComplete, setStepErrorMessage } =
    useCheckoutContext()

  useEffect(() => {
    const handleRedirect = async () => {
      // pull necessary params from Stripe redirect URL
      const urlParams = new URLSearchParams(window.location.search)
      const setup_intent = urlParams.get("setup_intent")
      const redirect_status = urlParams.get("redirect_status")
      const save_bank_account = urlParams.get("save_bank_account")
      const confirmation_token = urlParams.get("confirmation_token")

      // If no Stripe redirect params, call onComplete immediately
      if (!setup_intent || redirect_status !== "succeeded") {
        onComplete()
        return
      }

      // Convert string to boolean - URLSearchParams returns string "false" or "true"
      const shouldSaveBankAccount = save_bank_account === "true"
      const oneTimeUse = !shouldSaveBankAccount

      try {
        // Handle confirmation token from Stripe redirect
        if (confirmation_token) {
          fetchAndSetConfirmationToken(
            confirmation_token,
            environment,
            setConfirmationToken
          )
        }

        // Call Exchange to save the bank account and trigger emails
        await setPaymentBySetupIntentId(setup_intent, oneTimeUse)

        // Mark payment as complete after successful Stripe redirect
        // Note: Prior steps (offer, fulfillment, delivery) are already marked complete
        // by initialStateForOrder based on order data
        setPaymentComplete()

        // Clean up URL parameters
        const newUrl = new URL(window.location.href)
        newUrl.searchParams.delete("setup_intent")
        newUrl.searchParams.delete("setup_intent_client_secret")
        newUrl.searchParams.delete("redirect_status")
        newUrl.searchParams.delete("save_bank_account")
        newUrl.searchParams.delete("confirmation_token")
        router.replace(newUrl.pathname + newUrl.search)
      } finally {
        onComplete?.()
      }
    }

    handleRedirect()
  }, [
    router,
    setConfirmationToken,
    setPaymentComplete,
    environment,
    onComplete,
    setPaymentBySetupIntentId,
  ])

  const setPaymentBySetupIntentId = async (
    setupIntentId: string,
    oneTimeUse: boolean
  ) => {
    try {
      const orderOrError = (
        await setPaymentByStripeIntentMutation({
          variables: {
            input: {
              id: orderId,
              oneTimeUse,
              setupIntentId,
            },
          },
        })
      ).commerceSetPaymentByStripeIntent?.orderOrError

      if (orderOrError?.error) throw orderOrError.error

      logger.log("Successfully set payment by setup intent")
    } catch (error) {
      logger.error("Failed to set payment by setup intent:", error)
      // TODO: placeholder message
      setStepErrorMessage({
        step: CheckoutStepName.PAYMENT,
        error: {
          title: "Payment could not be processed",
          message:
            "Please try again or use a different payment method to complete your purchase.",
        },
      })
      onComplete()
    }
  }
}

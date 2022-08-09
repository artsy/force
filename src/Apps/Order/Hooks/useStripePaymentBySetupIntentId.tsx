import { useState, useEffect } from "react"
import { useSystemContext } from "System"
import { useRouter } from "System/Router/useRouter"
import { SetPaymentByStripeIntent } from "Apps/Order/Mutations/SetPaymentByStripeIntent"

/*
 * Hook to handle Stripe redirect for newly-linked bank account
 * pulls necessary params from Stripe redirect URL and sets payment by intentId
 */
export function useStripePaymentBySetupIntentId(orderId: string) {
  const { relayEnvironment } = useSystemContext()
  const { match } = useRouter()

  const [isProcessingRedirect, setIsProcessingRedirect] = useState(true)
  const [stripeSetupIntentId, setStripeSetupIntentId] = useState<null | string>(
    null
  )
  const [isPaymentSetupSuccessful, setIsPaymentSetupSuccessful] = useState(
    false
  )

  useEffect(() => {
    const setPaymentBySetupIntentId = async (
      setupIntentId: string,
      oneTimeUse: boolean
    ) => {
      try {
        if (!relayEnvironment) return

        const error = (
          await SetPaymentByStripeIntent(relayEnvironment, {
            id: orderId,
            oneTimeUse,
            setupIntentId,
          })
        ).commerceSetPaymentByStripeIntent?.orderOrError?.error

        if (error) throw error
        setIsPaymentSetupSuccessful(true)
      } catch (error) {
        setIsPaymentSetupSuccessful(false)
      }
    }

    // pull necessary params from Stripe redirect URL
    const saveAccount = match.location.query.save_account

    const setupIntentId = match.location.query.setup_intent
    const setupIntentClientSecret =
      match.location.query.setup_intent_client_secret
    const redirectSuccess = match.location.query.redirect_status === "succeeded"

    if (setupIntentId && setupIntentClientSecret && redirectSuccess) {
      setStripeSetupIntentId(setupIntentId)
      // set payment with new bank account by Setup Intent ID
      setPaymentBySetupIntentId(setupIntentId, saveAccount !== "true")
    }

    setIsProcessingRedirect(false)
  }, [orderId, relayEnvironment, match])

  return {
    isProcessingRedirect,
    stripeSetupIntentId,
    isPaymentSetupSuccessful,
  }
}

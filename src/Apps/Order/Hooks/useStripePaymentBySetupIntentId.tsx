import { useState, useEffect } from "react"
import { useRouter } from "System/Router/useRouter"
import { useSetPaymentByStripeIntent } from "Apps/Order/Mutations/useSetPaymentByStripeIntentMutation"

/*
 * Hook to handle Stripe redirect for newly-linked bank account
 * pulls necessary params from Stripe redirect URL and sets payment by intentId
 */
export function useStripePaymentBySetupIntentId(orderId: string) {
  const {
    submitMutation: setPaymentByStripeIntentMutation,
  } = useSetPaymentByStripeIntent()
  const { match } = useRouter()

  const [isProcessingRedirect, setIsProcessingRedirect] = useState(true)
  const [stripeSetupIntentId, setStripeSetupIntentId] = useState<null | string>(
    null
  )
  const [isPaymentSetupSuccessful, setIsPaymentSetupSuccessful] = useState(
    false
  )

  useEffect(() => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderId, match])

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
      setIsPaymentSetupSuccessful(true)
    } catch (error) {
      setIsPaymentSetupSuccessful(false)
    }
  }

  return {
    isProcessingRedirect,
    stripeSetupIntentId,
    isPaymentSetupSuccessful,
  }
}

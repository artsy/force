import { useState, useEffect } from "react"
import { useRouter } from "System/Hooks/useRouter"
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

  const [isProcessingRedirect, setIsProcessingRedirect] = useState(false)
  const [stripeSetupIntentId, setStripeSetupIntentId] = useState<null | string>(
    null
  )
  const [isPaymentSetupSuccessful, setIsPaymentSetupSuccessful] = useState(
    false
  )
  const [paymentSetupError, setPaymentSetupError] = useState<null | object>(
    null
  )

  useEffect(() => {
    // pull necessary params from Stripe redirect URL
    const {
      save_account,
      setup_intent,
      setup_intent_client_secret,
      redirect_status,
    } = match.location.query

    let oneTimeUse = false

    if (
      save_account === "false" ||
      (typeof save_account === "boolean" && !save_account)
    ) {
      oneTimeUse = true
    }

    if (
      setup_intent &&
      setup_intent_client_secret &&
      redirect_status === "succeeded"
    ) {
      setIsProcessingRedirect(true)
      setStripeSetupIntentId(setup_intent)
      // set payment with new bank account by Setup Intent ID
      setPaymentBySetupIntentId(setup_intent, oneTimeUse)
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
      setPaymentSetupError(error)
    }
  }

  return {
    isProcessingRedirect,
    stripeSetupIntentId,
    isPaymentSetupSuccessful,
    paymentSetupError,
  }
}

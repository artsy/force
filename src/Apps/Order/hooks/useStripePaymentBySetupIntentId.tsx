import { useState, useEffect } from "react"
import { useSystemContext } from "System"
import { getClientParam } from "Utils/getClientParam"
import { SetPaymentByStripeIntent } from "Apps/Order/Mutations/SetPaymentByStripeIntent"

export function useStripePaymentBySetupIntentId(orderId: string) {
  const { relayEnvironment } = useSystemContext()

  const [isProcessingRedirect, setIsProcessingRedirect] = useState(true)
  const [stripeSetupIntentId, setStripeSetupIntentId] = useState<null | string>(
    null
  )
  const [isPaymentSuccessfullySet, setIsPaymentSuccessfullySet] = useState(
    false
  )

  useEffect(() => {
    const setPaymentBySetupIntentId = async (
      setupIntentId: string,
      oneTimeUse: boolean
    ) => {
      if (!relayEnvironment) return

      const orderOrError = (
        await SetPaymentByStripeIntent(relayEnvironment, {
          id: orderId,
          oneTimeUse,
          setupIntentId,
        })
      ).commerceSetPaymentByStripeIntent?.orderOrError

      if (orderOrError?.error) {
        throw orderOrError.error
      }
      setIsPaymentSuccessfullySet(true)
    }

    const saveAccount = getClientParam("save_account")
    const setupIntentId = getClientParam("setup_intent")
    const setupIntentClientSecret = getClientParam("setup_intent_client_secret")
    const redirectSuccess = getClientParam("redirect_status") === "succeeded"

    if (setupIntentId && setupIntentClientSecret && redirectSuccess) {
      setStripeSetupIntentId(setupIntentId)
      setPaymentBySetupIntentId(setupIntentId, saveAccount !== "true")
    }

    setIsProcessingRedirect(false)
  }, [orderId, relayEnvironment])

  return {
    isProcessingRedirect,
    stripeSetupIntentId,
    isPaymentSuccessfullySet,
  }
}

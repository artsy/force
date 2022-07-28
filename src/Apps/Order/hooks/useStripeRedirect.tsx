import { useState, useEffect } from "react"
import { getClientParam } from "Utils/getClientParam"

export const useStripeRedirect = () => {
  const [isProcessingRedirect, setIsProcessingRedirect] = useState(true)
  const [stripeSetupIntentId, setStripeSetupIntentId] = useState<null | string>(
    null
  )

  const [shouldSaveBankAccount, setShouldSaveBankAccount] = useState(false)

  useEffect(() => {
    const saveAccount = getClientParam("save_account")
    if (saveAccount === "true") {
      setShouldSaveBankAccount(true)
    }

    const setupIntentId = getClientParam("setup_intent")
    const setupIntentClientSecret = getClientParam("setup_intent_client_secret")
    const redirectSuccess = getClientParam("redirect_status") === "succeeded"

    if (setupIntentId && setupIntentClientSecret && redirectSuccess) {
      setStripeSetupIntentId(setupIntentId)
    }

    setIsProcessingRedirect(false)
  }, [])

  return {
    isProcessingRedirect,
    stripeSetupIntentId,
    shouldSaveBankAccount,
  }
}

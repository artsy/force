import { fetchStripeClientSecret } from "Apps/CollectorProfile/Routes/Sales/Utils/fetchStripeClientSecret"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { getENV } from "Utils/getENV"
import { loadConnectAndInitialize } from "@stripe/connect-js"
import {
  ConnectAccountOnboarding,
  ConnectComponentsProvider,
} from "@stripe/react-connect-js"
import { useState } from "react"

interface SalesStripeOnboardingProps {
  onExit: () => void
  onError: () => void
}

export const SalesStripeOnboarding: React.FC<SalesStripeOnboardingProps> = ({
  onExit,
  onError,
}) => {
  const { user } = useSystemContext()

  const [stripeConnectInstance] = useState(() => {
    return loadConnectAndInitialize({
      publishableKey: getENV("STRIPE_PUBLISHABLE_KEY"),
      fetchClientSecret: async () => {
        try {
          return await fetchStripeClientSecret({
            accessToken: user?.accessToken,
          })
        } catch (error) {
          console.error(error)
          onError()
          throw error
        }
      },
    })
  })

  return (
    <ConnectComponentsProvider connectInstance={stripeConnectInstance}>
      <ConnectAccountOnboarding onExit={onExit} />
    </ConnectComponentsProvider>
  )
}

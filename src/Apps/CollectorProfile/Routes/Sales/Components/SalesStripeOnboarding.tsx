import { fetchStripeClientSecret } from "Apps/CollectorProfile/Routes/Sales/Utils/fetchStripeClientSecret"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { getENV } from "Utils/getENV"
// The pure entry doesn't inject Stripe's script on import. The main entry would
// load it for every collector profile page, since they share one chunk.
import { loadConnectAndInitialize } from "@stripe/connect-js/pure"
import {
  ConnectAccountOnboarding,
  ConnectComponentsProvider,
} from "@stripe/react-connect-js"
import { useEffect, useRef, useState } from "react"

interface SalesStripeOnboardingProps {
  onExit: () => void
  onLoaderStart: () => void
  onLoadError: () => void
}

export const SalesStripeOnboarding: React.FC<SalesStripeOnboardingProps> = ({
  onExit,
  onLoaderStart,
  onLoadError,
}) => {
  const { user } = useSystemContext()

  // The Connect instance is created once, so its client secret callback needs
  // the latest handler, not the one from the first render.
  const onLoadErrorRef = useRef(onLoadError)

  useEffect(() => {
    onLoadErrorRef.current = onLoadError
  }, [onLoadError])

  // Initializing requests a client secret right away, which creates the
  // seller's Stripe account on first use. So this only runs once the user
  // opts in to onboarding, and each onboarding gets a fresh instance (and
  // session) for the account at that time.
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
          onLoadErrorRef.current()
          throw error
        }
      },
    })
  })

  return (
    <ConnectComponentsProvider connectInstance={stripeConnectInstance}>
      <ConnectAccountOnboarding
        onExit={onExit}
        onLoaderStart={onLoaderStart}
        onLoadError={onLoadError}
      />
    </ConnectComponentsProvider>
  )
}

import { Message, Spacer, Text } from "@artsy/palette"
import { fetchStripeClientSecret } from "Apps/CollectorProfile/Routes/Sales/Utils/fetchStripeClientSecret"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { getENV } from "Utils/getENV"
import { loadConnectAndInitialize } from "@stripe/connect-js"
import {
  ConnectAccountOnboarding,
  ConnectComponentsProvider,
} from "@stripe/react-connect-js"
import { useState } from "react"

export const SalesStripeOnboarding: React.FC = () => {
  const { user } = useSystemContext()
  const [hasError, setHasError] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

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
          setHasError(true)
          throw error
        }
      },
    })
  })

  if (hasError) {
    return (
      <Message variant="error">
        Something went wrong setting up payouts. Please try again later.
      </Message>
    )
  }

  if (isComplete) {
    return (
      <Message variant="success">
        Your payout account is set up. You’re ready to sell.
      </Message>
    )
  }

  const handleExit = () => {
    setIsComplete(true)
  }

  return (
    <>
      <Text variant="lg-display">Set up payouts</Text>

      <Text variant="sm" color="mono60">
        Connect a bank account with Stripe to receive payments for your sales.
      </Text>

      <Spacer y={2} />

      <ConnectComponentsProvider connectInstance={stripeConnectInstance}>
        <ConnectAccountOnboarding onExit={handleExit} />
      </ConnectComponentsProvider>
    </>
  )
}

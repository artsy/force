import { Button, Flex, Message, Spacer, Spinner, Text } from "@artsy/palette"
import { SalesDeleteAccountDialog } from "Apps/CollectorProfile/Routes/Sales/Components/SalesDeleteAccountDialog"
import { SalesStripeOnboarding } from "Apps/CollectorProfile/Routes/Sales/Components/SalesStripeOnboarding"
import { useSellerAccount } from "Apps/CollectorProfile/Routes/Sales/hooks/useSellerAccount"
import { useState } from "react"

const ONBOARDING_ERROR_MESSAGE =
  "Something went wrong setting up payouts. Please try again later."

const DELETE_ERROR_MESSAGE =
  "Something went wrong deleting your payout account. Please try again later."

export const SalesSellerAccount: React.FC = () => {
  const {
    sellerAccount,
    isLoading,
    hasLoadFailed,
    isDeleting,
    reload,
    deleteAccount,
  } = useSellerAccount()

  const [isOnboarding, setIsOnboarding] = useState(false)
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleStartOnboarding = () => {
    setErrorMessage(null)
    setIsOnboarding(true)
  }

  const handleOnboardingError = () => {
    setIsOnboarding(false)
    setErrorMessage(ONBOARDING_ERROR_MESSAGE)
  }

  const handleOnboardingExit = () => {
    setIsOnboarding(false)
    reload()
  }

  const handleDelete = async () => {
    setErrorMessage(null)

    try {
      await deleteAccount()
    } catch {
      setErrorMessage(DELETE_ERROR_MESSAGE)
    } finally {
      setIsConfirmingDelete(false)
    }
  }

  const getContent = () => {
    if (isOnboarding) {
      return (
        <SalesStripeOnboarding
          onExit={handleOnboardingExit}
          onError={handleOnboardingError}
        />
      )
    }

    if (sellerAccount) {
      return (
        <>
          <Text variant="sm" color="mono60">
            Stripe account
          </Text>

          <Text variant="sm">{sellerAccount.external_id}</Text>

          <Spacer y={2} />

          <Flex flexWrap="wrap" gap={1}>
            {sellerAccount.action_needed === true && (
              <Button onClick={handleStartOnboarding}>
                Complete payout details
              </Button>
            )}

            <Button
              variant="secondaryBlack"
              onClick={() => {
                setIsConfirmingDelete(true)
              }}
            >
              Delete account
            </Button>
          </Flex>
        </>
      )
    }

    return (
      <>
        <Text variant="sm" color="mono60">
          Connect a bank account with Stripe to receive payments for your sales.
        </Text>

        <Spacer y={2} />

        <Button onClick={handleStartOnboarding}>Set up payouts</Button>
      </>
    )
  }

  if (isLoading) {
    return <Spinner position="relative" />
  }

  if (hasLoadFailed) {
    return (
      <Message variant="error">
        Something went wrong loading your payout account. Please try again
        later.
      </Message>
    )
  }

  return (
    <>
      <Text variant="lg-display">Payouts</Text>

      <Spacer y={2} />

      {errorMessage && (
        <>
          <Message variant="error">{errorMessage}</Message>

          <Spacer y={2} />
        </>
      )}

      {getContent()}

      {isConfirmingDelete && (
        <SalesDeleteAccountDialog
          isDeleting={isDeleting}
          onCancel={() => {
            setIsConfirmingDelete(false)
          }}
          onConfirm={handleDelete}
        />
      )}
    </>
  )
}

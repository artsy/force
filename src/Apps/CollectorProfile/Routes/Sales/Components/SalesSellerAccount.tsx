import {
  Box,
  Button,
  Flex,
  Message,
  Spacer,
  Spinner,
  Text,
} from "@artsy/palette"
import { SalesDeleteAccountDialog } from "Apps/CollectorProfile/Routes/Sales/Components/SalesDeleteAccountDialog"
import { SalesStripeOnboarding } from "Apps/CollectorProfile/Routes/Sales/Components/SalesStripeOnboarding"
import { useSellerAccount } from "Apps/CollectorProfile/Routes/Sales/hooks/useSellerAccount"
import { useState } from "react"

const ONBOARDING_ERROR_MESSAGE =
  "Something went wrong setting up payouts. Please try again later."

const DELETE_ERROR_MESSAGE =
  "Something went wrong deleting your payout account. Please try again later."

// "loading" is from the click until Stripe displays its own UI. The component
// mounts out of sight then, while the button that was clicked shows its loading
// state, so the user sees one loading style and then Stripe's.
type OnboardingStatus = "idle" | "loading" | "ready"

const HIDDEN_PROPS = {
  position: "absolute",
  opacity: 0,
  width: "100%",
} as const

export const SalesSellerAccount: React.FC = () => {
  const {
    sellerAccount,
    isLoading,
    hasLoadFailed,
    isDeleting,
    reload,
    deleteAccount,
  } = useSellerAccount()

  const [onboardingStatus, setOnboardingStatus] =
    useState<OnboardingStatus>("idle")
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const isOnboardingLoading = onboardingStatus === "loading"

  const handleStartOnboarding = () => {
    setErrorMessage(null)
    setOnboardingStatus("loading")
  }

  const handleOnboardingLoaderStart = () => {
    setOnboardingStatus("ready")
  }

  // Once Stripe's UI is showing it renders its own errors. Before that nothing
  // is shown, so surface the error here.
  const handleOnboardingLoadError = () => {
    if (!isOnboardingLoading) {
      return
    }

    setOnboardingStatus("idle")
    setErrorMessage(ONBOARDING_ERROR_MESSAGE)
  }

  const handleOnboardingExit = () => {
    setOnboardingStatus("idle")
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
              <Button
                onClick={handleStartOnboarding}
                loading={isOnboardingLoading}
              >
                Complete payout details
              </Button>
            )}

            <Button
              variant="secondaryBlack"
              disabled={isOnboardingLoading}
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

        <Button onClick={handleStartOnboarding} loading={isOnboardingLoading}>
          Set up payouts
        </Button>
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

      {onboardingStatus !== "ready" && getContent()}

      {/* Keep this in one place in the tree: moving it would remount it and
          restart Stripe's loading. */}
      {onboardingStatus !== "idle" && (
        <Box
          aria-hidden={isOnboardingLoading}
          {...(isOnboardingLoading && HIDDEN_PROPS)}
        >
          <SalesStripeOnboarding
            onExit={handleOnboardingExit}
            onLoaderStart={handleOnboardingLoaderStart}
            onLoadError={handleOnboardingLoadError}
          />
        </Box>
      )}

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

import { Button, Flex, ModalDialog, Text } from "@artsy/palette"
import { useCheckoutContext } from "Apps/Order2/Routes/Checkout/Hooks/useCheckoutContext"
import { useRouter } from "System/Hooks/useRouter"
import { CheckoutStepName } from "../CheckoutContext/types"

export enum CheckoutModalError {
  LOADING_TIMEOUT = "loading_timeout",
  ARTWORK_VERSION_MISMATCH = "artwork_version_mismatch",
  ARTWORK_NOT_FOR_SALE = "artwork_not_for_sale",
  SUBMIT_ERROR = "submit_error",
  STRIPE_AUTHENTICATION_FAILURE = "stripe_authentication_failure",
  OTHER_ERROR = "other_error",
}

export const CheckoutModal: React.FC<{
  error: CheckoutModalError | null
}> = ({ error }) => {
  const {
    artworkPath,
    setCheckoutModalError,
    setStepErrorMessage,
    editPayment,
  } = useCheckoutContext()
  const { router } = useRouter()

  if (!error) {
    return null
  }

  const handleReload = () => {
    window.location.reload()
  }

  // Determine modal behavior based on error type
  let canReload = false
  let canDismiss = false
  let onDismiss = () => {}

  let title = "Checkout Error"
  let description: string

  switch (error) {
    case CheckoutModalError.LOADING_TIMEOUT:
      description = "There was an error loading your checkout."
      canReload = true
      break
    case CheckoutModalError.ARTWORK_VERSION_MISMATCH:
      title = "Work has been updated"
      description =
        "Something about the work changed since you started checkout. Please review the work before submitting your order."
      break
    case CheckoutModalError.ARTWORK_NOT_FOR_SALE:
      title = "Not available"
      description = "Sorry, the work is no longer available."
      break
    case CheckoutModalError.SUBMIT_ERROR:
      title = "An error occurred"
      description =
        "Something went wrong while submitting your order. Please try again."
      canDismiss = true
      break
    case CheckoutModalError.STRIPE_AUTHENTICATION_FAILURE:
      title = "Payment authentication error"
      description =
        "We are unable to authenticate your payment method. Please choose a different payment method and try again."
      canDismiss = true
      onDismiss = () => {
        editPayment()
        setStepErrorMessage({
          step: CheckoutStepName.PAYMENT,
          error: {
            title: "Payment error",
            message: "Please update your payment method",
          },
        })
      }
      break
    default:
      description =
        "There was an error with your checkout. Please return to the artwork and try again."
  }

  const handleClose = () => {
    if (canDismiss) {
      setCheckoutModalError(null)
      if (onDismiss) {
        onDismiss()
      }
    } else {
      router.replace(artworkPath)
    }
  }

  const primaryButtonText = canDismiss ? "Continue" : "Return to Artwork"

  return (
    <ModalDialog title={title} width="450px" onClose={handleClose}>
      <Text variant="sm" mb={2}>
        {description}
      </Text>
      <Flex gap={1} justifyContent="center">
        {canReload && (
          <Button variant="secondaryBlack" onClick={handleReload}>
            Reload
          </Button>
        )}
        <Button variant="primaryBlack" onClick={handleClose}>
          {primaryButtonText}
        </Button>
      </Flex>
    </ModalDialog>
  )
}

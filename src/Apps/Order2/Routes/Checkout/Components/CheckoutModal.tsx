import { Button, Flex, ModalDialog, Text } from "@artsy/palette"
import { useCheckoutContext } from "Apps/Order2/Routes/Checkout/Hooks/useCheckoutContext"
import { useCheckoutModal } from "Apps/Order2/Routes/Checkout/Hooks/useCheckoutModal"
import { useRouter } from "System/Hooks/useRouter"

export enum CheckoutModalError {
  LOADING_TIMEOUT = "loading_timeout",
  ARTWORK_VERSION_MISMATCH = "artwork_version_mismatch",
  ARTWORK_NOT_FOR_SALE = "artwork_not_for_sale",
  SUBMIT_ERROR = "submit_error",
  PAYMENT_PROCESSING_FAILED = "payment_processing_failed",
  OTHER_ERROR = "other_error",
}

export const CheckoutModal: React.FC<{
  error: CheckoutModalError | null
  overrideTitle?: string
  overrideDescription?: string
}> = ({ error, overrideTitle, overrideDescription }) => {
  const { artworkPath } = useCheckoutContext()
  const { dismissCheckoutErrorModal } = useCheckoutModal()
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

  let defaultTitle = "Checkout error"
  let defaultDescription: string

  switch (error) {
    case CheckoutModalError.LOADING_TIMEOUT:
      defaultDescription = "There was an error loading your checkout."
      canReload = true
      break
    case CheckoutModalError.ARTWORK_VERSION_MISMATCH:
      defaultTitle = "Work has been updated"
      defaultDescription =
        "Something about the work changed since you started checkout. Please review the work before submitting your order."
      break
    case CheckoutModalError.ARTWORK_NOT_FOR_SALE:
      defaultTitle = "Not available"
      defaultDescription = "Sorry, the work is no longer available."
      break
    case CheckoutModalError.SUBMIT_ERROR:
      defaultTitle = "An error occurred"
      defaultDescription =
        "Something went wrong while submitting your order. Please try again."
      canDismiss = true
      break
    case CheckoutModalError.PAYMENT_PROCESSING_FAILED:
      defaultTitle = "An error occurred while processing your payment"
      defaultDescription =
        "We are unable to authenticate your payment method. Please choose a different payment method and try again."
      canDismiss = true
      break
    default:
      defaultDescription =
        "There was an error with your checkout. Please return to the artwork and try again."
  }

  // Use override values if provided, otherwise fall back to defaults
  const title = overrideTitle ?? defaultTitle
  const description = overrideDescription ?? defaultDescription

  const handleClose = () => {
    if (canDismiss) {
      dismissCheckoutErrorModal()
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

import { Button, Flex, ModalDialog, Text } from "@artsy/palette"
import { useRespondContext } from "Apps/Order2/Routes/Respond/Hooks/useRespondContext"
import { useEffect } from "react"

export enum RespondErrorModalType {
  SUBMIT_ERROR = "submit_error",
  PAYMENT_PROCESSING_FAILED = "payment_processing_failed",
  OFFER_NO_LONGER_AVAILABLE = "offer_no_longer_available",
}

type RespondErrorModalCtaAction = "close" | "fixPayment" | "viewOrderDetails"

const MODAL_CONTENT: Record<
  RespondErrorModalType,
  {
    title: string
    description: string
    ctaText: string
    ctaAction: RespondErrorModalCtaAction
  }
> = {
  [RespondErrorModalType.SUBMIT_ERROR]: {
    title: "An error occurred",
    description:
      "Something went wrong while submitting your response. Please try again.",
    ctaText: "Continue",
    ctaAction: "close",
  },
  [RespondErrorModalType.PAYMENT_PROCESSING_FAILED]: {
    title: "An error occurred while processing your payment",
    description:
      "We are unable to authenticate your payment method. Please choose a different payment method and try again.",
    ctaText: "Update payment method",
    ctaAction: "fixPayment",
  },
  [RespondErrorModalType.OFFER_NO_LONGER_AVAILABLE]: {
    title: "This offer is no longer available",
    description:
      "The offer has expired or the order is no longer awaiting your response. Please review your order for the latest details.",
    ctaText: "Continue",
    ctaAction: "viewOrderDetails",
  },
}

export interface Order2RespondErrorModalProps {
  error: RespondErrorModalType | null
  overrideDescription?: string | null
  onClose: () => void
  onFixPayment: () => void
  onViewOrderDetails: () => void
}

export const Order2RespondErrorModal: React.FC<
  Order2RespondErrorModalProps
> = ({
  error,
  overrideDescription,
  onClose,
  onFixPayment,
  onViewOrderDetails,
}) => {
  const { checkoutTracking } = useRespondContext()

  const content = error ? MODAL_CONTENT[error] : null
  const title = content?.title
  const description = overrideDescription ?? content?.description

  useEffect(() => {
    if (!error || !title || !description) {
      return
    }

    checkoutTracking.errorMessageViewed({
      error_code: error,
      title,
      message: description,
    })
  }, [error, title, description, checkoutTracking])

  if (!error || !content || !title || !description) {
    return null
  }

  const ctaHandlers: Record<RespondErrorModalCtaAction, () => void> = {
    close: onClose,
    fixPayment: onFixPayment,
    viewOrderDetails: onViewOrderDetails,
  }

  return (
    <ModalDialog title={title} width="450px" onClose={onClose}>
      <Text variant="sm" mb={2}>
        {description}
      </Text>
      <Flex justifyContent="center">
        <Button variant="primaryBlack" onClick={ctaHandlers[content.ctaAction]}>
          {content.ctaText}
        </Button>
      </Flex>
    </ModalDialog>
  )
}

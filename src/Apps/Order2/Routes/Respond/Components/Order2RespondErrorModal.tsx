import { Button, Flex, ModalDialog, Text } from "@artsy/palette"
import { useRespondContext } from "Apps/Order2/Routes/Respond/Hooks/useRespondContext"
import { useEffect } from "react"

export enum RespondErrorModalType {
  SUBMIT_ERROR = "submit_error",
  PAYMENT_PROCESSING_FAILED = "payment_processing_failed",
}

const MODAL_CONTENT: Record<
  RespondErrorModalType,
  { title: string; description: string; ctaText: string }
> = {
  [RespondErrorModalType.SUBMIT_ERROR]: {
    title: "An error occurred",
    description:
      "Something went wrong while submitting your response. Please try again.",
    ctaText: "Continue",
  },
  [RespondErrorModalType.PAYMENT_PROCESSING_FAILED]: {
    title: "An error occurred while processing your payment",
    description: "Please choose a different payment method and try again.",
    ctaText: "Update payment method",
  },
}

export interface Order2RespondErrorModalProps {
  error: RespondErrorModalType | null
  overrideDescription?: string | null
  onClose: () => void
  onFixPayment: () => void
}

export const Order2RespondErrorModal: React.FC<
  Order2RespondErrorModalProps
> = ({ error, overrideDescription, onClose, onFixPayment }) => {
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

  const isPaymentFailure =
    error === RespondErrorModalType.PAYMENT_PROCESSING_FAILED

  return (
    <ModalDialog title={title} width="450px" onClose={onClose}>
      <Text variant="sm" mb={2}>
        {description}
      </Text>
      <Flex justifyContent="center">
        <Button
          variant="primaryBlack"
          onClick={isPaymentFailure ? onFixPayment : onClose}
        >
          {content.ctaText}
        </Button>
      </Flex>
    </ModalDialog>
  )
}

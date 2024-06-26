import { ContextModule, Intent } from "@artsy/cohesion"
import { Box, Button, Flex } from "@artsy/palette"
import { useSellFlowContext } from "Apps/Sell/SellFlowContext"
import { useAuthDialog } from "Components/AuthDialog"
import { useSystemContext } from "System/Hooks/useSystemContext"
import createLogger from "Utils/logger"
import { useFormikContext } from "formik"
import { useState } from "react"

const logger = createLogger("BottomFormNavigation.tsx")

export const BottomFormNavigation = () => {
  return (
    <Flex
      width="100%"
      p={[2, 4]}
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
    >
      <BottomFormBackButton />
      <BottomFormNextButton />
    </Flex>
  )
}

const BottomFormBackButton = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { submitForm } = useFormikContext()
  const {
    actions,
    state: { isFirstStep, loading },
  } = useSellFlowContext()

  const onBack = async () => {
    setIsSubmitting(true)
    try {
      await submitForm()

      actions.goToPreviousStep()
    } catch (error) {
      logger.error("Error submitting form", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isFirstStep) {
    return <Box />
  }

  return (
    <Button
      loading={isSubmitting}
      onClick={onBack}
      variant="tertiary"
      disabled={loading || isSubmitting}
    >
      Back
    </Button>
  )
}

const BottomFormNextButton = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { isValid, submitForm } = useFormikContext()
  const { isLoggedIn } = useSystemContext()
  const { showAuthDialog } = useAuthDialog()
  const {
    state: { loading },
  } = useSellFlowContext()

  const {
    actions,
    state: { isSubmitStep },
  } = useSellFlowContext()

  const onNext = async () => {
    if (!isLoggedIn) {
      showAuthDialog({
        mode: "Login",
        options: {
          title: () => {
            return "Log in to submit an artwork for sale"
          },
        },
        analytics: {
          contextModule: ContextModule.consignSubmissionFlow,
          intent: Intent.login,
        },
      })

      return
    }

    setIsSubmitting(true)

    try {
      await submitForm()

      isSubmitStep ? actions.finishFlow() : actions.goToNextStep()
    } catch (error) {
      logger.error("Error submitting form", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Button
      variant="primaryBlack"
      disabled={!isValid}
      loading={isSubmitting || loading}
      onClick={onNext}
      data-testid="bottom-form-next-button"
    >
      {isSubmitStep ? "Submit" : "Continue"}
    </Button>
  )
}

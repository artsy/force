import { ContextModule, Intent } from "@artsy/cohesion"
import { Box, Button, Flex } from "@artsy/palette"
import { AppContainer } from "Apps/Components/AppContainer"
import { Z } from "Apps/Components/constants"
import { useSubmissionTracking } from "Apps/Sell/Hooks/useSubmissionTracking"
import { useAssociateSubmission } from "Apps/Sell/Mutations/useAssociateSubmission"
import {
  INITIAL_EDIT_STEP,
  useSellFlowContext,
} from "Apps/Sell/SellFlowContext"
import { useAuthDialog } from "Components/AuthDialog"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { useAuthIntent } from "Utils/Hooks/useAuthIntent"
import createLogger from "Utils/logger"
import { useFormikContext } from "formik"
import { useCallback, useEffect, useState } from "react"

const logger = createLogger("BottomFormNavigation.tsx")

export const BOTTOM_FORM_NAVIGATION_SAVE_AREA = 140

export const BottomFormNavigation = () => {
  return (
    <Flex
      position="absolute"
      bottom={0}
      left={0}
      width="100%"
      maxWidth="100vw"
      background="rgba(255, 255, 255, 0.8)"
      alignItems="center"
      zIndex={Z.globalNav}
    >
      <AppContainer>
        <Flex
          width="100%"
          p={[2, 4]}
          pt={[2, 2]}
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          borderTop="1px solid"
          borderColor="black5"
        >
          <BottomFormBackButton />
          <BottomFormNextButton />
        </Flex>
      </AppContainer>
    </Flex>
  )
}

const BottomFormBackButton = () => {
  const { trackTappedSubmissionBack } = useSubmissionTracking()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { submitForm } = useFormikContext()
  const {
    actions: { goToPreviousStep },
    state: { loading, isFirstStep, submission, step },
  } = useSellFlowContext()

  const onBack = async () => {
    setIsSubmitting(true)

    trackTappedSubmissionBack(submission?.internalID, step)

    try {
      await submitForm()

      await goToPreviousStep()
    } catch (error) {
      logger.error("Error submitting form", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Don't show back button on first step or "Title" step to not allow editing of the artist
  if (isFirstStep || step === INITIAL_EDIT_STEP) {
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
  const { trackTappedContinueSubmission } = useSubmissionTracking()
  const {
    submitMutation: associateSubmissionMutation,
  } = useAssociateSubmission()
  const { value, clearValue } = useAuthIntent()

  const {
    actions: { goToNextStep },
    state: { submission, isSubmitStep, nextStep, loading },
  } = useSellFlowContext()

  const onContinue = async () => {
    trackTappedContinueSubmission(submission?.internalID, nextStep)

    if (!isLoggedIn && isSubmitStep) {
      await submitForm()

      showAuthDialog({
        mode: "SignUp",
        options: {
          title: mode =>
            mode === "Login"
              ? "Log in to complete your submission"
              : "Sign up to complete your submission",
          afterAuthAction: {
            action: "submitSubmission",
            kind: "submission",
            objectId: submission?.externalId as string,
          },
        },
        analytics: {
          contextModule: ContextModule.sell,
          intent: Intent.consign,
          trigger: "click",
        },
      })

      return
    } else {
      await submitAndNavigateToNextStepCallback()
    }
  }

  const goToNextStepCallback = useCallback(async () => {
    await goToNextStep()
  }, [goToNextStep])

  const submitAndNavigateToNextStepCallback = useCallback(async () => {
    setIsSubmitting(true)

    try {
      await submitForm()

      await goToNextStepCallback()
    } catch (error) {
      logger.error("Error submitting form", error)
    } finally {
      setIsSubmitting(false)
    }
  }, [submitForm, goToNextStepCallback])

  const onAfterAuthCallback = useCallback(async () => {
    try {
      setIsSubmitting(true)
      await associateSubmissionMutation({
        variables: { input: { id: submission?.externalId as string } },
      })
      await submitAndNavigateToNextStepCallback()
    } catch (error) {
      logger.error("Something went wrong.", error)
    } finally {
      setIsSubmitting(false)
    }
  }, [
    associateSubmissionMutation,
    submitAndNavigateToNextStepCallback,
    submission,
  ])

  useEffect(() => {
    if (value?.action === "submitSubmission") {
      clearValue()

      onAfterAuthCallback()
    }
  }, [value, clearValue, onAfterAuthCallback])

  return (
    <Button
      variant="primaryBlack"
      disabled={!isValid || isSubmitting || loading}
      loading={isSubmitting || loading}
      onClick={onContinue}
      data-testid="bottom-form-next-button"
    >
      {isSubmitStep ? "Submit Artwork" : "Continue"}
    </Button>
  )
}

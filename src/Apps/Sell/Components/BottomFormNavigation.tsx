import { Box, Button, Flex } from "@artsy/palette"
import { useSellFlowContext } from "Apps/Sell/SellFlowContext"
import createLogger from "Utils/logger"
import { useFormikContext } from "formik"

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
  const { isSubmitting, submitForm } = useFormikContext()
  const {
    actions,
    state: { isFirstStep },
  } = useSellFlowContext()

  const onBack = async () => {
    try {
      await submitForm()

      actions.goToPreviousStep()
    } catch (error) {
      logger.error("Error submitting form", error)
    }
  }

  if (isFirstStep) {
    return <Box />
  }

  return (
    <Button loading={isSubmitting} onClick={onBack} variant="tertiary">
      Back
    </Button>
  )
}

const BottomFormNextButton = () => {
  const { isValid, isSubmitting, submitForm } = useFormikContext()
  const {
    actions,
    state: { isSubmitStep },
  } = useSellFlowContext()

  const onNext = async () => {
    try {
      await submitForm()

      isSubmitStep ? actions.finishFlow() : actions.goToNextStep()
    } catch (error) {
      logger.error("Error submitting form", error)
    }
  }

  return (
    <Button
      variant="primaryBlack"
      disabled={!isValid}
      loading={isSubmitting}
      onClick={onNext}
    >
      {isSubmitStep ? "Submit" : "Continue"}
    </Button>
  )
}

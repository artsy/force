import { Box, Button, Flex } from "@artsy/palette"
import { useSellFlowContext } from "Apps/Sell/SellFlowContext"
import { useRouter } from "System/Hooks/useRouter"
import { useFormikContext } from "formik"
import { useState } from "react"

export const BottomFormNavigation = () => {
  const { isValid, submitForm } = useFormikContext()
  const { router } = useRouter()
  const {
    actions,
    state: { isFirstStep, isLastStep, submissionID },
  } = useSellFlowContext()

  const [isLoadingBack, setIsLoadingBack] = useState(false)
  const [isLoadingContinue, setIsLoadingContinue] = useState(false)

  const onBack = async () => {
    setIsLoadingBack(true)

    try {
      await submitForm()

      actions.goToPreviousStep()
    } catch (error) {
      console.error("Error submitting form", error)
    } finally {
      setIsLoadingBack(false)
    }
  }

  const onNext = (navigationAction: Function) => async () => {
    setIsLoadingContinue(true)

    try {
      await submitForm()

      navigationAction()
    } catch (error) {
      console.error("Error submitting form", error)
    } finally {
      setIsLoadingContinue(false)
    }
  }

  const onContinue = onNext(actions.goToNextStep)

  const onSubmit = onNext(() =>
    router.push(`/sell2/submissions/${submissionID}/thank-you`)
  )

  return (
    <>
      <Flex
        width="100%"
        p={[2, 4]}
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        {isFirstStep ? (
          <Box />
        ) : (
          <Button loading={isLoadingBack} onClick={onBack} variant="tertiary">
            Back
          </Button>
        )}

        {isLastStep ? (
          <Button
            variant="primaryBlack"
            disabled={!isValid}
            loading={isLoadingContinue}
            onClick={onSubmit}
          >
            Submit
          </Button>
        ) : (
          <Button
            variant="primaryBlack"
            disabled={!isValid}
            loading={isLoadingContinue}
            onClick={onContinue}
          >
            Continue
          </Button>
        )}
      </Flex>
    </>
  )
}

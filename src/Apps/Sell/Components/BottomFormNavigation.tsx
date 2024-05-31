import { Flex, Button } from "@artsy/palette"
import { useSellFlowContext } from "Apps/Sell/SellFlowContext"
import { useFormikContext } from "formik"
import { useRouter } from "found"

export const BottomFormNavigation = () => {
  const { router } = useRouter()
  const { actions, state } = useSellFlowContext()
  const formik = useFormikContext()
  if (!formik) return null
  const { isValid, isSubmitting, submitForm } = formik

  if (state.currentStep === "thank-you") return null

  const onContinue = async () => {
    await submitForm()

    actions.goToNextStep()
  }

  const onSubmit = async () => {
    await submitForm()

    router.push(`/sell2/submissions/${state.submissionID}/thank-you`)
  }

  return (
    <>
      <Flex
        width="100%"
        p={2}
        flexDirection="row"
        justifyContent="space-between"
      >
        <Button
          disabled={state.isFirstStep}
          variant="secondaryBlack"
          onClick={actions.goToPreviousStep}
        >
          Back
        </Button>
        {state.isLastStep ? (
          <Button
            variant="primaryBlack"
            loading={isSubmitting}
            onClick={onSubmit}
          >
            Submit
          </Button>
        ) : (
          <Button
            variant="primaryBlack"
            disabled={!isValid}
            loading={isSubmitting}
            onClick={onContinue}
          >
            Continue
          </Button>
        )}
      </Flex>
    </>
  )
}

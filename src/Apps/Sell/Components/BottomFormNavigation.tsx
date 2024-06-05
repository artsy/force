import { Flex, Button } from "@artsy/palette"
import { useSellFlowContext } from "Apps/Sell/SellFlowContext"
import { useRouter } from "System/Router/useRouter"
import { useFormikContext } from "formik"

export const BottomFormNavigation = () => {
  const { isValid, isSubmitting, submitForm } = useFormikContext()
  const { router } = useRouter()
  const { actions, state: { isFirstStep, isLastStep, submissionID } } = useSellFlowContext()


  const onContinue = async () => {
    await submitForm()

    actions.goToNextStep()
  }

  const onSubmit = async () => {
    await submitForm()

    router.push(`/sell2/submissions/${submissionID}/thank-you`)
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
          disabled={isFirstStep}
          variant="secondaryBlack"
          onClick={actions.goToPreviousStep}
        >
          Back
        </Button>
        {isLastStep ? (
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

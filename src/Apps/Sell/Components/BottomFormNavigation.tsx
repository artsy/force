import { Button, Flex, Link } from "@artsy/palette"
import { useSellFlowContext } from "Apps/Sell/SellFlowContext"
import { useRouter } from "System/Router/useRouter"
import { useFormikContext } from "formik"

export const BottomFormNavigation = () => {
  const { isValid, isSubmitting, submitForm } = useFormikContext()
  const { router } = useRouter()
  const {
    actions,
    state: { isLastStep, submissionID },
  } = useSellFlowContext()

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
        p={[2, 4]}
        flexDirection="row"
        justifyContent="space-between"
        alignItems={"center"}
      >
        <Link onClick={actions.goToPreviousStep}>Back</Link>

        {isLastStep ? (
          <Button
            variant="primaryBlack"
            disabled={!isValid}
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

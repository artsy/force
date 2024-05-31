import { Flex, Button } from "@artsy/palette"
import { useArtworkFormContext } from "Apps/Sell/ArtworkFormContext"
import { useFormikContext } from "formik"
import { useRouter } from "found"

export const BottomFormNavigation = () => {
  const { router } = useRouter()
  const { actions, state } = useArtworkFormContext()
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
          disabled={state.atFirstStep}
          variant="secondaryBlack"
          onClick={actions.goToPreviousStep}
        >
          Back
        </Button>
        {state.atLastStep ? (
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
import { Flex, Button } from "@artsy/palette"
import { useArtworkFormContext } from "Apps/Sell/ArtworkFormContext"
import { useFormikContext } from "formik"
import { useRouter } from "found"
import styled from "styled-components"
import { themeGet } from "@styled-system/theme-get"

export const BottomFormNavigation = () => {
  const { router } = useRouter()
  const { actions, state } = useArtworkFormContext()
  const { isValid, isSubmitting, submitForm } = useFormikContext()

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
    <FooterContainer>
      <Flex
        m={2}
        p={2}
        width="100%"
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
    </FooterContainer>
  )
}

const FooterContainer = styled(Flex)`
  height: calc(86px + env(safe-area-inset-bottom));
  background-color: ${themeGet("colors.white100")};
  bottom: 0;
  left: 0;
  position: fixed;
  width: 100%;
  border-top: 1px solid ${themeGet("colors.black10")};
  align-items: center;
  justify-content: center;
  padding-bottom: env(safe-area-inset-bottom);
  padding: env(safe-area-inset-top) env(safe-area-inset-right)
    env(safe-area-inset-bottom) env(safe-area-inset-left);
`
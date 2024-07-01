import ArtsyLogoIcon from "@artsy/icons/ArtsyLogoIcon"
import CloseIcon from "@artsy/icons/CloseIcon"
import { Button, Flex, FullBleed } from "@artsy/palette"
import { AppContainer } from "Apps/Components/AppContainer"
import { HorizontalPadding } from "Apps/Components/HorizontalPadding"
import { useSubmissionTracking } from "Apps/Sell/Hooks/useSubmissionTracking"
import { useSellFlowContext } from "Apps/Sell/SellFlowContext"
import { storePreviousSubmission } from "Apps/Sell/Utils/previousSubmissionUtils"
import { Sticky } from "Components/Sticky"
import { RouterLink } from "System/Components/RouterLink"
import { useRouter } from "System/Hooks/useRouter"
import { Media } from "Utils/Responsive"
import createLogger from "Utils/logger"
import { useFormikContext } from "formik"
import { useState } from "react"

const logger = createLogger("BottomFormNavigation.tsx")

export const SubmissionHeader: React.FC = () => {
  const { router } = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { trackTappedSubmissionSaveExit } = useSubmissionTracking()
  const context = useSellFlowContext()
  const formik = useFormikContext()
  const isLastStep = context?.state?.isLastStep
  const submissionID = context?.state?.submissionID
  const step = context?.state?.step

  const handleSaveAndExit = async () => {
    if (!submissionID) return

    setIsSubmitting(true)

    try {
      await formik?.submitForm()
    } catch (error) {
      logger.error("Something went wrong.", error)
    }

    // Save the submission and current step to local storage
    storePreviousSubmission(submissionID, step)

    trackTappedSubmissionSaveExit(submissionID, step)

    setIsSubmitting(false)

    router.push("/sell")
  }

  return (
    <Sticky withoutHeaderOffset>
      {() => {
        return (
          <FullBleed backgroundColor="white100">
            <AppContainer>
              <HorizontalPadding>
                <Flex
                  flexDirection="row"
                  justifyContent={[
                    submissionID ? "end" : "space-between",
                    "space-between",
                  ]}
                  alignItems="center"
                  py={[1, 4]}
                  mt={[0.5, 0]}
                >
                  <Media greaterThan="xs">
                    <RouterLink to={"/sell"} display="block">
                      <ArtsyLogoIcon display="block" />
                    </RouterLink>
                  </Media>

                  {submissionID && !isLastStep ? (
                    <Button
                      variant="tertiary"
                      onClick={handleSaveAndExit}
                      display="block"
                      loading={isSubmitting}
                    >
                      Save & Exit
                    </Button>
                  ) : (
                    <RouterLink
                      to={"/sell"}
                      display="block"
                      textDecoration={["none", "underline"]}
                      data-testid="exit-link"
                    >
                      <Media at="xs">
                        {isLastStep ? "Exit" : <CloseIcon />}
                      </Media>

                      <Media greaterThan="xs">
                        {isLastStep || !submissionID ? "Exit" : ""}
                      </Media>
                    </RouterLink>
                  )}
                </Flex>
              </HorizontalPadding>
            </AppContainer>
          </FullBleed>
        )
      }}
    </Sticky>
  )
}

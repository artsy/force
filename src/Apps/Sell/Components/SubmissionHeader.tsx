import { AuthIntent, ContextModule } from "@artsy/cohesion"
import ArtsyLogoIcon from "@artsy/icons/ArtsyLogoIcon"
import CloseIcon from "@artsy/icons/CloseIcon"
import { Button, Flex, FullBleed } from "@artsy/palette"
import { AppContainer } from "Apps/Components/AppContainer"
import { HorizontalPadding } from "Apps/Components/HorizontalPadding"
import { useSubmissionTracking } from "Apps/Sell/Hooks/useSubmissionTracking"
import { useAssociateSubmission } from "Apps/Sell/Mutations/useAssociateSubmission"
import { useSellFlowContext } from "Apps/Sell/SellFlowContext"
import { storePreviousSubmission } from "Apps/Sell/Utils/previousSubmissionUtils"
import { useAuthDialog } from "Components/AuthDialog"
import { Sticky } from "Components/Sticky"
import { RouterLink } from "System/Components/RouterLink"
import { useRouter } from "System/Hooks/useRouter"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { useAuthIntent } from "Utils/Hooks/useAuthIntent"
import { Media } from "Utils/Responsive"
import createLogger from "Utils/logger"
import { useFormikContext } from "formik"
import { useCallback, useEffect, useState } from "react"

const HEADER_HEIGHT = 40
const logger = createLogger("BottomFormNavigation.tsx")

export const SubmissionHeader: React.FC = () => {
  const {
    router: { push: routerPush },
  } = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { trackTappedSubmissionSaveExit } = useSubmissionTracking()
  const { isLoggedIn } = useSystemContext()
  const { showAuthDialog } = useAuthDialog()
  const { value, clearValue } = useAuthIntent()
  const {
    submitMutation: associateSubmissionMutation,
  } = useAssociateSubmission()
  const context = useSellFlowContext()
  const formik = useFormikContext()
  const { isLastStep, submission, step } = context?.state || {}

  const exitURL = submission?.myCollectionArtworkID
    ? `/my-collection/artwork/${submission?.myCollectionArtworkID}`
    : "/sell"

  const handleSaveAndExit = async () => {
    if (!submission?.externalId) return

    trackTappedSubmissionSaveExit(submission?.internalID, step)

    if (isLoggedIn) {
      await submitAndSaveCallback()
    } else {
      await submitForm()

      showAuthDialog({
        mode: "SignUp",
        options: {
          title: mode =>
            mode === "Login"
              ? "Log in to save your submission"
              : "Sign up to save your submission",
          afterAuthAction: {
            action: "saveAndExitSubmission",
            kind: "submission",
            objectId: submission?.externalId as string,
            step,
          },
        },
        analytics: {
          contextModule: ContextModule.sell,
          // TODO: Add to artsy/cohesion to use Intent.saveAndExit here
          intent: "saveAndExitSubmission" as AuthIntent,
          trigger: "click",
        },
      })
    }
  }

  const submitForm = formik?.submitForm

  const submitAndSaveCallback = useCallback(async () => {
    if (!submission) return

    setIsSubmitting(true)

    try {
      await submitForm()

      // Save the submission and current step to local storage
      storePreviousSubmission(submission?.externalId as string, step)

      routerPush(exitURL)
    } catch (error) {
      logger.error("Something went wrong.", error)
    } finally {
      setIsSubmitting(false)
    }
  }, [submitForm, submission, step, routerPush])

  const onAfterAuthCallback = useCallback(async () => {
    try {
      setIsSubmitting(true)
      await associateSubmissionMutation({
        variables: { input: { id: submission?.externalId as string } },
      })
      await submitAndSaveCallback()
    } catch (error) {
      logger.error("Something went wrong.", error)
    } finally {
      setIsSubmitting(false)
    }
  }, [associateSubmissionMutation, submitAndSaveCallback, submission])

  useEffect(() => {
    if (value?.action === "saveAndExitSubmission") {
      clearValue()

      onAfterAuthCallback()
    }
  }, [value, clearValue, onAfterAuthCallback])

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
                    submission?.externalId ? "end" : "space-between",
                    "space-between",
                  ]}
                  alignItems="center"
                  my={[0.5, 4]}
                  pt={[1, 0]}
                  height={HEADER_HEIGHT}
                >
                  <Media greaterThan="xs">
                    <ArtsyLogoIcon display="block" />
                  </Media>

                  {submission?.externalId && !isLastStep ? (
                    <>
                      <Media at="xs">
                        <RouterLink
                          to={null}
                          textDecoration={["none", "underline"]}
                          onClick={handleSaveAndExit}
                          display="block"
                        >
                          Save & Exit
                        </RouterLink>
                      </Media>
                      <Media greaterThan="xs">
                        <Button
                          variant="tertiary"
                          // @ts-ignore
                          as={RouterLink}
                          to={null}
                          onClick={handleSaveAndExit}
                          loading={isSubmitting}
                        >
                          Save & Exit
                        </Button>
                      </Media>
                    </>
                  ) : (
                    <>
                      <Media at="xs">
                        <RouterLink
                          to={exitURL}
                          display="block"
                          textDecoration={["none", "underline"]}
                          data-testid="exit-link"
                        >
                          {isLastStep ? "Exit" : <CloseIcon />}
                        </RouterLink>
                      </Media>

                      <Media greaterThan="xs">
                        <Button
                          variant="tertiary"
                          // @ts-ignore
                          as={RouterLink}
                          to={exitURL}
                          data-testid="exit-link"
                        >
                          {isLastStep || !submission?.externalId ? "Exit" : ""}
                        </Button>
                      </Media>
                    </>
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

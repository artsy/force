import { AuthIntent, ContextModule } from "@artsy/cohesion"
import ArtsyLogoIcon from "@artsy/icons/ArtsyLogoIcon"
import ArtsyMarkIcon from "@artsy/icons/ArtsyMarkIcon"
import CloseIcon from "@artsy/icons/CloseIcon"
import { Box, Button, Clickable, Flex, FullBleed } from "@artsy/palette"
import { AppContainer } from "Apps/Components/AppContainer"
import { HorizontalPadding } from "Apps/Components/HorizontalPadding"
import { ArtworkFormExitConfirmationDialog } from "Apps/MyCollection/Routes/EditArtwork/Components/ArtworkFormExitConfirmationDialog"
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

export const SubmissionHeader: React.FC<
  React.PropsWithChildren<unknown>
> = () => {
  const {
    router: { push: routerPush },
  } = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { trackTappedSubmissionSaveExit } = useSubmissionTracking()
  const { isLoggedIn } = useSystemContext()
  const { showAuthDialog } = useAuthDialog()
  const { value, clearValue } = useAuthIntent()
  const { submitMutation: associateSubmissionMutation } =
    useAssociateSubmission()
  const context = useSellFlowContext()
  const formik = useFormikContext()
  const { isLastStep, submission, step } = context?.state || {}

  const exitURL = submission?.myCollectionArtworkID
    ? `/my-collection/artwork/${submission?.myCollectionArtworkID}`
    : "/sell"

  const isFirstOrLastStep = !submission?.externalId || isLastStep

  const handleSaveAndExit = async () => {
    if (!submission?.externalId) return

    trackTappedSubmissionSaveExit(submission?.internalID, step)

    if (isLoggedIn) {
      await submitAndSaveCallback()
    } else {
      await submitForm()

      showAuthDialog({
        options: {
          title: "Sign up or log in to save your submission",
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
    // FIXME:
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
                    submission?.externalId && isLoggedIn
                      ? "end"
                      : "space-between",
                    "space-between",
                  ]}
                  alignItems="center"
                  my={[0.5, 4]}
                  pt={[1, 0]}
                  height={HEADER_HEIGHT}
                >
                  <HeaderArtsyLogo withExitConfirmation={!isFirstOrLastStep} />

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
                          {isFirstOrLastStep ? "Exit" : ""}
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

const HeaderArtsyLogo: React.FC<
  React.PropsWithChildren<{ withExitConfirmation }>
> = ({ withExitConfirmation }) => {
  const { router } = useRouter()
  const { isLoggedIn } = useSystemContext()

  const [showExitConfirmationModal, setShowExitConfirmationModal] =
    useState(false)

  const handleClick = () => {
    withExitConfirmation
      ? setShowExitConfirmationModal(true)
      : router.push("/sell")
  }

  // When logged in, it's possible to easily exit the flow by clicking on "Save & Exit"
  // and the Artsy logo should not be clickable.
  if (isLoggedIn) {
    return (
      <Media greaterThan="xs">
        <Box data-testid="artsy-logo">
          <ArtsyLogoIcon display="block" />
        </Box>
      </Media>
    )
  }

  return (
    <>
      <Clickable display="block" onClick={handleClick}>
        <Box data-testid="artsy-logo">
          <Media greaterThanOrEqual="sm">
            <ArtsyLogoIcon display="block" />
          </Media>
          <Media lessThan="sm">
            <ArtsyMarkIcon display="block" />
          </Media>
        </Box>
      </Clickable>

      {showExitConfirmationModal && (
        <ArtworkFormExitConfirmationDialog
          onClose={() => setShowExitConfirmationModal(false)}
          onLeave={() => router.push("/sell")}
        />
      )}
    </>
  )
}

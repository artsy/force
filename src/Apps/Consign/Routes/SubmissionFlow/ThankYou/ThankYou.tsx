import * as DeprecatedAnalyticsSchema from "@artsy/cohesion/dist/DeprecatedSchema"
import { Button, Flex, Text, Spacer } from "@artsy/palette"
import { RouterLink } from "System/Router/RouterLink"
import { DownloadApp } from "./Components/DownloadApp"
import { useSystemContext } from "System"
import { ContextModule, OwnerType } from "@artsy/cohesion"
import { useRouter } from "System/Router/useRouter"
import {
  SoldRecentlyOnArtsyQueryRenderer,
  FAQ,
} from "Apps/Consign/Routes/MarketingLanding/Components"
import { useTracking } from "react-tracking"
import { ConfirmationScreenComponent } from "Components/ConfirmationScreenComponent"

export const ThankYou: React.FC = () => {
  const { user, isLoggedIn } = useSystemContext()
  const { match } = useRouter()
  const { trackEvent } = useTracking()

  const trackSubmitAnotherWorkClick = () =>
    trackEvent({
      action_type: DeprecatedAnalyticsSchema.ActionType.SubmitAnotherArtwork,
      context_module: ContextModule.consignSubmissionFlow,
      context_owner_type: OwnerType.consignmentSubmission,
      submission_id: match.params.id,
      user_email: isLoggedIn ? user?.email : undefined,
      user_id: isLoggedIn ? user?.id : undefined,
    })

  return (
    <>
      {isLoggedIn ? (
        <ConfirmationScreenComponent
          title="Your artwork has been submitted"
          customSubtitle={
            <>
              <Text>
                We will email you within 1-3 days to confirm if your artwork has
                been accepted or not. In the meantime your submission will
                appear in the feature, My Collection.
              </Text>
              <Text mt={2}>
                With low fees, informed pricing, and multiple sales options, why
                not submit another piece with Artsy.
              </Text>
            </>
          }
        />
      ) : (
        <ConfirmationScreenComponent
          title="Thank you for submitting a work"
          customSubtitle={
            <>
              <Text>
                We’ll email you within 1–3 business days to let you know the
                status of your submission.
              </Text>
              <Text mt={2}>
                In the meantime, feel free to submit another work—and benefit
                from Artsy’s low fees, informed pricing, and multiple selling
                options.
              </Text>
            </>
          }
        />
      )}

      <Flex
        pb={2}
        flexDirection={["column", "row"]}
        alignItems={["stretch", "center"]}
      >
        <RouterLink to="/sell/submission">
          <Button
            mr={[0, 150]}
            width={["100%", "auto"]}
            data-test-id="submit-another-work"
            size="large"
            variant="primaryBlack"
            onClick={trackSubmitAnotherWorkClick}
          >
            Submit Another Work
          </Button>
        </RouterLink>

        <RouterLink to="/">
          <Button
            mt={[4, 0]}
            width={["100%", "auto"]}
            data-test-id="go-to-artsy-homepage"
            size="large"
            variant="tertiary"
          >
            Back to Artsy Homepage
          </Button>
        </RouterLink>
      </Flex>

      <DownloadApp mb={[2, 6]} />

      <SoldRecentlyOnArtsyQueryRenderer />
      <Spacer y={6} />
      <FAQ shouldTrackClickEvent />
    </>
  )
}

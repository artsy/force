import { Button, Flex, Text, Spacer, Box } from "@artsy/palette"
import { FAQ } from "../../MarketingLanding/Components/FAQ"
import { SoldRecentlyQueryRenderer } from "../../MarketingLanding/Components/SoldRecently"
import { RouterLink } from "v2/System/Router/RouterLink"
import { DownloadApps } from "./Components/DownloadApps"
import { AnalyticsSchema, useSystemContext, useTracking } from "v2/System"
import { ContextModule, OwnerType } from "@artsy/cohesion"
import { useRouter } from "v2/System/Router/useRouter"
import { useFeatureFlag } from "v2/System/useFeatureFlag"

export const ThankYou: React.FC = () => {
  const { user, isLoggedIn } = useSystemContext()
  const { match } = useRouter()
  const { trackEvent } = useTracking()
  const isSWAMCEnabled = useFeatureFlag("swa_my_collection")

  const trackSubmitAnotherWorkClick = () =>
    trackEvent({
      action_type: AnalyticsSchema.ActionType.SubmitAnotherArtwork,
      context_module: ContextModule.consignSubmissionFlow,
      context_owner_type: OwnerType.consignmentSubmission,
      submission_id: match.params.id,
      user_email: isLoggedIn ? user?.email : undefined,
      user_id: isLoggedIn ? user?.id : undefined,
    })

  return (
    <>
      {isSWAMCEnabled && isLoggedIn ? (
        <>
          <Text variant="xxl" mt={4}>
            Your artwork has been submitted
          </Text>
          <Box maxWidth="720px" mt={4}>
            <Text variant="lg" color="black60">
              We will email you within 1-3 days to confirm if your artwork has
              been accepted or not. In the meantime your submission will appear
              in the feature, My Collection, on the Artsy app.
            </Text>
            <Text variant="lg" mt={2} color="black60">
              With low fees, informed pricing, and multiple sales options, why
              not submit another piece with Artsy.
            </Text>
          </Box>
        </>
      ) : (
        <>
          <Text variant="xxl" mt={4}>
            Thank you for submitting a work
          </Text>
          <Box maxWidth="720px" mt={4}>
            <Text variant="lg">
              We’ll email you within 1–3 business days to let you know the
              status of your submission.
            </Text>
            <Text variant="lg" mt={2}>
              In the meantime, feel free to submit another work—and benefit from
              Artsy’s low fees, informed pricing, and multiple selling options.
            </Text>
          </Box>
        </>
      )}

      <Flex
        py={2}
        my={4}
        mb={0}
        flexDirection={["column", "row"]}
        alignItems={["stretch", "center"]}
      >
        <RouterLink to="/consign/submission/artwork-details">
          <Button
            mr={[0, 150]}
            width={["100%", "auto"]}
            data-test-id="submit-another-work"
            size="medium"
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
            size="medium"
            variant="noOutline"
          >
            Back to Artsy Homepage
          </Button>
        </RouterLink>
      </Flex>

      <DownloadApps mb={[2, 6]} />

      <SoldRecentlyQueryRenderer />
      <Spacer mt={6} />
      <FAQ />
    </>
  )
}

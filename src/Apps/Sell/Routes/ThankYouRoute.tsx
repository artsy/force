import { Button, FullBleed, Join, Message, Spacer, Text } from "@artsy/palette"
import { AppContainer } from "Apps/Components/AppContainer"
import { SubmissionLayout } from "Apps/Sell/Components/SubmissionLayout"
import { SubmissionStepTitle } from "Apps/Sell/Components/SubmissionStepTitle"
import { useSubmissionTracking } from "Apps/Sell/Hooks/useSubmissionTracking"
import { RouterLink } from "System/Components/RouterLink"
import { ThankYouRoute_submission$key } from "__generated__/ThankYouRoute_submission.graphql"
import * as React from "react"
import { graphql, useFragment } from "react-relay"

const FRAGMENT = graphql`
  fragment ThankYouRoute_submission on ConsignmentSubmission {
    internalID
  }
`
interface ThankYouRouteProps {
  submission: ThankYouRoute_submission$key
}

export const ThankYouRoute: React.FC<ThankYouRouteProps> = props => {
  const submission = useFragment(FRAGMENT, props.submission)

  const {
    trackTappedSubmitAnotherWork,
    trackTappedViewArtworkInMyCollection,
  } = useSubmissionTracking()

  return (
    <FullBleed>
      <AppContainer>
        <SubmissionLayout hideNavigation>
          <Join separator={<Spacer y={4} />}>
            <Join separator={<Spacer y={2} />}>
              <SubmissionStepTitle>
                Thank you for submitting your artwork
              </SubmissionStepTitle>

              <Text variant="sm">
                An Artsy Advisor will email you within 3-5 days to review your
                submission and discuss next steps. In the meantime your
                submission will appear in the feature, My Collection.
              </Text>

              <Message variant="success" title="What happens next?">
                If your artwork is accepted, we will guide you in selecting the
                best selling option. Additional information may be requested.
              </Message>
            </Join>

            <Join separator={<Spacer y={2} />}>
              <Button
                // @ts-ignore
                as={RouterLink}
                to="/sell/submissions/new"
                onClick={() => {
                  trackTappedSubmitAnotherWork(submission.internalID)
                }}
                width="100%"
                data-testid="submit-another-work"
              >
                Submit Another Work
              </Button>

              <Button
                // @ts-ignore
                as={RouterLink}
                to="/my-collection"
                onClick={() => {
                  trackTappedViewArtworkInMyCollection(submission.internalID)
                }}
                variant="secondaryBlack"
                width="100%"
                data-testid="view-collection"
              >
                View Artwork in My Collection
              </Button>
            </Join>
          </Join>
        </SubmissionLayout>
      </AppContainer>
    </FullBleed>
  )
}

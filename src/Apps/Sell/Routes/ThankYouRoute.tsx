import * as React from "react"
import { Button, FullBleed, Join, Message, Spacer, Text } from "@artsy/palette"
import { SubmissionLayout } from "Apps/Sell/Components/SubmissionLayout"
import { RouterLink } from "System/Components/RouterLink"
import { AppContainer } from "Apps/Components/AppContainer"
import { SubmissionStepTitle } from "Apps/Sell/Components/SubmissionStepTitle"

export const ThankYouRoute: React.FC = () => {
  return (
    <FullBleed>
      <AppContainer>
        <SubmissionLayout hideNavigation>
          <Join separator={<Spacer y={4} />}>
            <Join separator={<Spacer y={2} />}>
              <SubmissionStepTitle>
                Thank you for submitting your artwork
              </SubmissionStepTitle>

              <Text variant="xs">
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
                to="/sell2/submissions/new"
                width="100%"
                data-testid="submit-another-work"
              >
                Submit Another Work
              </Button>

              <Button
                // @ts-ignore
                as={RouterLink}
                to="/my-collection"
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

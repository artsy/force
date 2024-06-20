import * as React from "react"
import { Button, FullBleed, Join, Message, Spacer, Text } from "@artsy/palette"
import { SubmissionLayout } from "Apps/Sell/Components/SubmissionLayout"
import { RouterLink } from "System/Components/RouterLink"
import { AppContainer } from "Apps/Components/AppContainer"

interface ThankYouRouteProps {
  children: React.ReactNode
}

export const ThankYouRoute: React.FC<ThankYouRouteProps> = props => {
  return (
    <FullBleed>
      <AppContainer>
        <SubmissionLayout hideNavigation>
          <Join separator={<Spacer y={4} />}>
            <Join separator={<Spacer y={2} />}>
              <Text variant="lg-display">
                Thank you for submitting your artwork
              </Text>

              <Text variant="xs">
                An Artsy Advisor will email you within 3-5 days to review your
                submission and discuss next steps. In the meantime your
                submission will appear in the feature, My Collection.
              </Text>

              <Message variant="success" title="What happens next?">
                <Text variant="xs">
                  If your artwork is accepted, we will guide you in selecting
                  the best selling option. Additional information may be
                  requested.
                </Text>
              </Message>
            </Join>

            <Join separator={<Spacer y={2} />}>
              <Button // @ts-ignore
                as={RouterLink}
                to="/sell2/submissions/new"
                width="100%"
              >
                Submit Another Work
              </Button>

              <Button
                // @ts-ignore
                as={RouterLink}
                to="/collector-profile/my-collection"
                variant="secondaryBlack"
                width="100%"
              >
                View Artwork in My Collections
              </Button>
            </Join>
          </Join>
        </SubmissionLayout>
      </AppContainer>
    </FullBleed>
  )
}

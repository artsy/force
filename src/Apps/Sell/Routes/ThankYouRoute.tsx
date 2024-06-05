import * as React from "react"
import { Message, Spacer, Text } from "@artsy/palette"
import { graphql, useFragment } from "react-relay"
import { ThankYouRoute_submission$key } from "__generated__/ThankYouRoute_submission.graphql"
import { SubmissionLayout } from "Apps/Sell/Components/SubmissionLayout"

const FRAGMENT = graphql`
  fragment ThankYouRoute_submission on ConsignmentSubmission {
    externalId
  }
`
interface ThankYouRouteProps {
  submission: ThankYouRoute_submission$key
  children: React.ReactNode
}

export const ThankYouRoute: React.FC<ThankYouRouteProps>= (props) => {
  const submission = useFragment(FRAGMENT, props.submission)

  return (
    <SubmissionLayout hideNavigation>
      <Text variant="lg-display">Thank you for submitting your artwork </Text>
      <Spacer y={2}/>
      <Text variant="xs">ID: {submission.externalId}</Text>
      <Spacer y={2}/>
      <Text variant="xs">
        An Artsy Advisor will email you within 3-5 days to review your submission
        and discuss next steps. In the meantime your submission will appear in the
        feature, My Collection.
      </Text>
      <Spacer y={2}/>
      <Message variant="info" title="What happens next?">
        <Text variant="xs">
          If your artwork is accepted, we will send you a sales offer and guide
          you in selecting the best selling option. Additional information may be
          requested.
        </Text>
      </Message>
    </SubmissionLayout>
  )
}

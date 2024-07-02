import { FullBleed } from "@artsy/palette"
import { AppContainer } from "Apps/Components/AppContainer"
import { SellMeta } from "Apps/Consign/Routes/MarketingLanding/Components/SellMeta"
import { SellFlowContextProvider } from "Apps/Sell/SellFlowContext"
import { SubmissionRoute_submission$key } from "__generated__/SubmissionRoute_submission.graphql"
import { HttpError } from "found"
import { graphql, useFragment } from "react-relay"

const FRAGMENT = graphql`
  fragment SubmissionRoute_submission on ConsignmentSubmission {
    internalID
    externalId
  }
`

interface SubmissionRouteProps {
  submission: SubmissionRoute_submission$key
  children: React.ReactNode
}

export const SubmissionRoute: React.FC<SubmissionRouteProps> = props => {
  const submission = useFragment(FRAGMENT, props.submission)

  if (!submission?.externalId) throw new HttpError(404)

  return (
    <FullBleed>
      <AppContainer>
        <SellMeta />

        <SellFlowContextProvider submissionID={submission.externalId}>
          {props.children}
        </SellFlowContextProvider>
      </AppContainer>
    </FullBleed>
  )
}

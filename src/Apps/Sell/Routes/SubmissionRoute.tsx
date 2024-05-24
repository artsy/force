import { Box, Column, Flex, GridColumns } from "@artsy/palette"
import { AppContainer } from "Apps/Components/AppContainer"
import { ArtworkFormContextProvider } from "Apps/Sell/ArtworkFormContext"
import { StepsNavigation } from "Apps/Sell/Components/StepsNavigation"
import { SubmissionHeader } from "Apps/Sell/Components/SubmissionHeader"
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

export const SubmissionRoute: React.FC<SubmissionRouteProps> = (props) => {
  const submission = useFragment(FRAGMENT, props.submission)

  if (!submission?.externalId) throw new HttpError(404)

  return (
    <>
      <AppContainer>
        <ArtworkFormContextProvider submissionID={submission.externalId}>
          <SubmissionHeader />
          <Flex py={4} flexDirection="column" alignItems="center">
          <GridColumns>
            <Column span={[4]}>
              <StepsNavigation />
            </Column>
            <Column span={[8]}>
              <Box width={800}>
                {props.children}
              </Box>
            </Column>
          </GridColumns>
          </Flex>
        </ArtworkFormContextProvider>
      </AppContainer>
    </>
  )
}


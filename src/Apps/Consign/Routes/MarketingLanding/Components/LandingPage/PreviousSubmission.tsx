import { Clickable, Flex, Text } from "@artsy/palette"
import { INITIAL_STEP, SellFlowStep } from "Apps/Sell/SellFlowContext"
import { usePreviousSubmission } from "Apps/Sell/Utils/previousSubmissionUtils"
import { EntityHeaderSubmissionFragmentContainer } from "Components/EntityHeaders/EntityHeaderSubmission"
import { FadeInBox } from "Components/FadeInBox"
import { PreviousSubmissionQuery } from "__generated__/PreviousSubmissionQuery.graphql"
import { useRouter } from "found"
import { Suspense } from "react"
import { graphql, useLazyLoadQuery } from "react-relay"

export const PreviousSubmissionQueryRenderer: React.FC = () => {
  const { submissionID, step } = usePreviousSubmission()

  if (!submissionID) return null

  return (
    <Suspense fallback={null}>
      <PreviousSubmission
        submissionID={submissionID}
        currentStep={step as SellFlowStep}
      />
    </Suspense>
  )
}

interface PreviousSubmissionProps {
  submissionID: string
  currentStep: SellFlowStep
}

const PreviousSubmission: React.FC<PreviousSubmissionProps> = ({
  submissionID,
  currentStep = INITIAL_STEP,
}) => {
  const { router } = useRouter()

  const { submission } = useLazyLoadQuery<PreviousSubmissionQuery>(
    QUERY,
    {
      id: submissionID,
    },
    { fetchPolicy: "store-and-network" }
  )

  const handlePreviousSubmissionClick = () => {
    if (!submissionID) return

    router.push(`/sell/submissions/${submissionID}/${currentStep}`)
  }

  if (!submission || submission.state !== "DRAFT") return null

  return (
    <FadeInBox
      mt={[1, 1, 2]}
      mb={[2, 1, 2]}
      flex={[0, 0, 1]}
      width="100%"
      flexDirection="column"
      display="flex"
    >
      <Text color="black60" variant="xs" mb={1}>
        Finish previous submission:
      </Text>

      <Clickable onClick={handlePreviousSubmissionClick}>
        <Flex borderWidth={1} borderColor="black10" borderRadius="50%">
          <EntityHeaderSubmissionFragmentContainer submission={submission} />
        </Flex>
      </Clickable>
    </FadeInBox>
  )
}

const QUERY = graphql`
  query PreviousSubmissionQuery($id: ID!) {
    submission(id: $id) {
      state
      ...EntityHeaderSubmission_submission
    }
  }
`

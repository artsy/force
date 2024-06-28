import { Clickable, Flex, Text } from "@artsy/palette"
import { INITIAL_STEP, SellFlowStep } from "Apps/Sell/SellFlowContext"
import { usePreviousSubmission } from "Apps/Sell/Utils/previousSubmissionUtils"
import { EntityHeaderSubmissionFragmentContainer } from "Components/EntityHeaders/EntityHeaderSubmission"
import { FinishPreviousSubmissionQuery } from "__generated__/FinishPreviousSubmissionQuery.graphql"
import { useRouter } from "found"
import { Suspense } from "react"
import { graphql, useLazyLoadQuery } from "react-relay"

export const FinishPreviousSubmissionQueryRenderer: React.FC = () => {
  const { submissionID, step } = usePreviousSubmission()

  if (!submissionID) return null

  return (
    <Suspense fallback={null}>
      <FinishPreviousSubmission
        submissionID={submissionID}
        currentStep={step as SellFlowStep}
      />
    </Suspense>
  )
}

interface FinishPreviousSubmissionProps {
  submissionID: string
  currentStep: SellFlowStep
}

const FinishPreviousSubmission: React.FC<FinishPreviousSubmissionProps> = ({
  submissionID,
  currentStep = INITIAL_STEP,
}) => {
  const { router } = useRouter()

  const { submission } = useLazyLoadQuery<FinishPreviousSubmissionQuery>(
    QUERY,
    {
      id: submissionID,
    }
  )

  const handlePreviousSubmissionClick = () => {
    if (!submissionID) return

    router.push(`/sell/submission/${submissionID}/${currentStep}`)
  }

  if (!submission) return null

  return (
    <Flex my={2} flex={1} width="100%" flexDirection="column">
      <Text color="black60" variant="xs" mb={1}>
        Finish previous submission:
      </Text>

      <Clickable onClick={handlePreviousSubmissionClick}>
        <Flex borderWidth={1} borderColor="black10" borderRadius="50%">
          <EntityHeaderSubmissionFragmentContainer submission={submission} />
        </Flex>
      </Clickable>
    </Flex>
  )
}

const QUERY = graphql`
  query FinishPreviousSubmissionQuery($id: ID!) {
    submission(id: $id) {
      ...EntityHeaderSubmission_submission
    }
  }
`

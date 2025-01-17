import AlertFillIcon from "@artsy/icons/AlertFillIcon"
import { Flex, Text } from "@artsy/palette"
import type { ConsignmentSubmissionStatus_artwork$data } from "__generated__/ConsignmentSubmissionStatus_artwork.graphql"
import { createFragmentContainer, graphql } from "react-relay"

interface ConsignmentSubmissionStatusProps {
  artwork: ConsignmentSubmissionStatus_artwork$data
}

const ConsignmentSubmissionStatus: React.FC<
  React.PropsWithChildren<ConsignmentSubmissionStatusProps>
> = ({ artwork }) => {
  const submission = artwork.consignmentSubmission

  if (!submission) return null

  return (
    <Flex flexDirection="column">
      <Text
        variant="xs"
        fontWeight="bold"
        color={submission?.stateLabelColor ?? "black100"}
      >
        {artwork?.isListed ? "Listed" : submission?.stateLabel}
      </Text>

      {!artwork?.isListed && submission?.actionLabel && (
        <Flex flexDirection="row" alignItems="center">
          <AlertFillIcon width={16} height={16} fill="orange100" />

          <Text variant="xs" fontWeight="bold" color="orange100">
            &nbsp;{submission?.actionLabel}
          </Text>
        </Flex>
      )}
    </Flex>
  )
}

export const ConsignmentSubmissionStatusFragmentContainer =
  createFragmentContainer(ConsignmentSubmissionStatus, {
    artwork: graphql`
      fragment ConsignmentSubmissionStatus_artwork on Artwork {
        internalID
        isListed
        consignmentSubmission {
          internalID
          state
          stateLabel
          actionLabel
          stateLabelColor
        }
      }
    `,
  })

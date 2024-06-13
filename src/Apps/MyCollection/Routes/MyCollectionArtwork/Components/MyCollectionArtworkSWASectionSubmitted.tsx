import { Button, Clickable, Flex, ModalDialog, Text } from "@artsy/palette"

import { MyCollectionArtworkSWASectionSubmitted_submissionState$key } from "__generated__/MyCollectionArtworkSWASectionSubmitted_submissionState.graphql"

import { useState } from "react"
import { graphql, useFragment } from "react-relay"
import { RouterLink } from "System/Components/RouterLink"
import { Media } from "Utils/Responsive"

interface Props {
  artwork: MyCollectionArtworkSWASectionSubmitted_submissionState$key
}

export const MyCollectionArtworkSWASectionSubmitted: React.FC<Props> = ({
  artwork,
}) => {
  const [
    isSubmissionStatusModalOpen,
    setIsSubmissionStatusModalOpen,
  ] = useState(false)

  const { consignmentSubmission } = useFragment(
    submissionStateFragment,
    artwork
  )
  if (!consignmentSubmission) return null

  const { state, stateLabel, stateHelpMessage } = consignmentSubmission
  if (!state) return null

  let stateLabelColor = "yellow150"
  if (["APPROVED", "REJECTED", "CLOSED", "PUBLISHED"].includes(state))
    stateLabelColor = "orange150"

  const article =
    "https://support.artsy.net/s/topic/0TO3b000000UevOGAS/sell-with-artsy"

  return (
    <>
      <SubmissionStatusModal
        show={isSubmissionStatusModalOpen}
        onClose={() => setIsSubmissionStatusModalOpen(false)}
      />

      <Flex
        flexDirection={["column", "row"]}
        alignItems={["normal", "stretch"]}
        my={2}
      >
        <Flex alignItems={["center", "flex-start"]} flex={[1, 0]}>
          <Text
            variant={["xs", "sm"]}
            minWidth={[100, 100, 190]}
            mr={2}
            flex={1}
          >
            Submission Status
          </Text>
          <Media lessThan="sm">
            <Clickable
              onClick={() => setIsSubmissionStatusModalOpen(true)}
              data-test-id="open-rarity-modal"
            >
              <Text variant="xs" color="black60">
                <u>What is this?</u>
              </Text>
            </Clickable>
          </Media>
        </Flex>

        <Flex flex={1} flexDirection="column">
          <Text variant="sm" color={stateLabelColor}>
            {stateLabel}
          </Text>
        </Flex>
      </Flex>

      <Media greaterThanOrEqual="sm">
        <Text mb={2} color="black60" variant="xs">
          {stateHelpMessage}
        </Text>

        <Text mb={2} color="black60" variant="xs">
          Have a question? Visit our{" "}
          <RouterLink to={article} target="_blank" color="black100">
            help center
          </RouterLink>{" "}
          or get in touch with one of our specialists at{" "}
          <RouterLink to={"mailto:sell@artsy.net"} color="black100">
            sell@artsy.net
          </RouterLink>
        </Text>
      </Media>
    </>
  )
}

const submissionStateFragment = graphql`
  fragment MyCollectionArtworkSWASectionSubmitted_submissionState on Artwork {
    consignmentSubmission {
      state
      stateLabel
      stateHelpMessage
    }
  }
`

interface SubmissionStatusModalProps {
  show: boolean
  onClose(): void
}

const SubmissionStatusModal: React.FC<SubmissionStatusModalProps> = ({
  show,
  onClose,
}) => {
  if (!show) return null
  const article = "https://support.artsy.net/s/article/What-items-do-you-accept"

  return (
    <ModalDialog
      onClose={onClose}
      title="Submission Status"
      footer={
        <Button onClick={onClose} width="100%">
          Close
        </Button>
      }
    >
      <Text variant="xs" mb={2}>
        {`What does my Artwork’s status mean?`.toUpperCase()}
      </Text>
      <Text as="li" variant="sm-display">
        <Text display="inline-block" fontWeight="bold">
          Submission in Progress
        </Text>{" "}
        - the artwork is being reviewed or is in the sale process.
      </Text>
      <Text as="li" variant="sm-display" mt={2}>
        <Text display="inline-block" fontWeight="bold">
          Evaluation Complete
        </Text>{" "}
        - our specialists have reviewed this submission and determined that we
        do not currently have a market for it.
      </Text>
      <Text variant="xs" my={2}>
        {`Find out more`.toUpperCase()}
      </Text>
      <Text variant="sm-display" mb={2}>
        For more information, see our Collector Help Center article{" "}
        <RouterLink inline to={article}>
          What items do you accept?
        </RouterLink>
      </Text>
      <Text variant="sm-display">
        Or get in touch with one of our specialists at{" "}
        <RouterLink inline to={"mailto:sell@artsy.net"}>
          sell@artsy.net
        </RouterLink>
        .
      </Text>
    </ModalDialog>
  )
}

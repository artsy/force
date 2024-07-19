import {
  Box,
  Button,
  ButtonProps,
  ModalDialog,
  Separator,
  Spacer,
  Text,
} from "@artsy/palette"
import { MyCollectionArtworkSWASubmissionStatus_artwork$key } from "__generated__/MyCollectionArtworkSWASubmissionStatus_artwork.graphql"
import { MyCollectionArtworkSWAHelpSection } from "Apps/MyCollection/Routes/MyCollectionArtwork/Components/MyCollectionArtworkSWAHelpSection"
import { INITIAL_POST_APPROVAL_STEP } from "Apps/Sell/SellFlowContext"
import { useState } from "react"
import { graphql, useFragment } from "react-relay"
import { RouterLink } from "System/Components/RouterLink"
import { extractNodes } from "Utils/extractNodes"

interface Props {
  artwork: MyCollectionArtworkSWASubmissionStatus_artwork$key
}

export const MyCollectionArtworkSWASubmissionStatus: React.FC<Props> = props => {
  const [
    isSubmissionStatusModalOpen,
    setIsSubmissionStatusModalOpen,
  ] = useState(false)

  const artwork = useFragment(submissionStateFragment, props.artwork)

  const { consignmentSubmission: submission } = artwork

  if (!submission) return null

  const getButtonLink = (): {
    label: string
    to: string
    variant: ButtonProps["variant"]
  } | null => {
    switch (submission.state) {
      case "DRAFT":
        return {
          label: "Complete Submission",
          to: `/sell/submissions/${submission.internalID}`,
          variant: "primaryBlack",
        }
      case "SUBMITTED":
        return {
          label: "Edit Submission",
          to: `/sell/submissions/${submission.internalID}`,
          variant: "secondaryBlack",
        }
      case "APPROVED":
        return {
          label: "Add Additional Information",
          to: `/sell/submissions/${submission.internalID}/${INITIAL_POST_APPROVAL_STEP}`,
          variant: "primaryBlack",
        }
      case "PUBLISHED":
        return {
          label: "View Listing",
          to: `/artwork/${
            extractNodes(artwork.listedArtworksConnection)[0]?.internalID
          }`,
          variant: "secondaryBlack",
        }
      default:
        return null
    }
  }

  const buttonLink = getButtonLink()

  return (
    <Box>
      <Separator my={4} />

      <Text variant="xs" mb={1}>
        Submission Status
      </Text>

      <Text variant="md" fontWeight="400">
        {submission.stateLabel} (state: {submission.state})
      </Text>

      {submission.state === "APPROVED" && (
        <Text variant="md" fontWeight="400" color="orange100">
          Complete Listing
        </Text>
      )}

      <Spacer y={1} />

      <Text variant="sm" color="black60">
        {submission.stateHelpMessage}
      </Text>

      {!!buttonLink && (
        <Button
          variant={buttonLink.variant}
          my={2}
          // @ts-ignore
          as={RouterLink}
          onClick={() => {
            // TODO: Tracking
          }}
          to={buttonLink.to}
          data-testid="start-new-submission"
        >
          {buttonLink.label}
        </Button>
      )}

      <MyCollectionArtworkSWAHelpSection />

      <SubmissionStatusModal
        show={isSubmissionStatusModalOpen}
        onClose={() => setIsSubmissionStatusModalOpen(false)}
      />
    </Box>
  )
}

const submissionStateFragment = graphql`
  fragment MyCollectionArtworkSWASubmissionStatus_artwork on Artwork {
    listedArtworksConnection(first: 1) {
      edges {
        node {
          internalID
        }
      }
    }
    consignmentSubmission {
      internalID
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

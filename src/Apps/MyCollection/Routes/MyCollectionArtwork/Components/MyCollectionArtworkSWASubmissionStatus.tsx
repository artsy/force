import ChevronRightIcon from "@artsy/icons/ChevronRightIcon"
import {
  Box,
  Button,
  ButtonProps,
  Clickable,
  Flex,
  ModalDialog,
  Separator,
  Spacer,
  Text,
} from "@artsy/palette"
import {
  MyCollectionArtworkSWASubmissionStatus_artwork$data,
  MyCollectionArtworkSWASubmissionStatus_artwork$key,
} from "__generated__/MyCollectionArtworkSWASubmissionStatus_artwork.graphql"
import {
  INITIAL_POST_APPROVAL_STEP,
  INITIAL_STEP,
} from "Apps/Sell/SellFlowContext"
import React, { useState } from "react"
import { graphql, useFragment } from "react-relay"
import { RouterLink } from "System/Components/RouterLink"
import { extractNodes } from "Utils/extractNodes"
import { Media } from "Utils/Responsive"

interface Props {
  artwork: MyCollectionArtworkSWASubmissionStatus_artwork$key
}

export const MyCollectionArtworkSWASubmissionStatus: React.FC<Props> = props => {
  const [
    isSubmissionStatusModalOpen,
    setIsSubmissionStatusModalOpen,
  ] = useState(false)

  const artwork = useFragment(submissionStatusFragment, props.artwork)

  const { consignmentSubmission: submission } = artwork

  if (!submission) return null

  const buttonURL = getButtonURL(artwork)
  const buttonVariant = ["DRAFT", "APPROVED"].includes(submission.state)
    ? "primaryBlack"
    : "secondaryBlack"

  return (
    <Box>
      <Media greaterThanOrEqual="sm">
        <Separator my={4} />
      </Media>

      <Text variant="xs" mb={1}>
        <Flex justifyContent="space-between">
          Submission Status
          <Media lessThan="sm">
            <Clickable
              onClick={() => setIsSubmissionStatusModalOpen(true)}
              textDecoration="underline"
              color="black60"
            >
              What is this?
            </Clickable>
          </Media>
        </Flex>
      </Text>

      <Text variant="md" fontWeight="400">
        {submission.stateLabel}
      </Text>

      <Media lessThan="sm">
        {!!submission.actionLabel && !!buttonURL && (
          <RouterLink
            onClick={() => {
              // TODO: Tracking
            }}
            to={buttonURL}
            textDecoration="none"
            color="orange100"
          >
            <Flex alignItems="center">
              <Text variant="sm-display">{submission.actionLabel}</Text>

              <ChevronRightIcon ml={0.5} size={16} />
            </Flex>
          </RouterLink>
        )}

        <SubmissionStatusModal
          buttonURL={buttonURL}
          buttonVariant={buttonVariant}
          submission={submission}
          show={isSubmissionStatusModalOpen}
          onClose={() => setIsSubmissionStatusModalOpen(false)}
        />
      </Media>

      <Media greaterThanOrEqual="sm">
        {!!submission.actionLabel && (
          <Text variant="md" fontWeight="400" color="orange100">
            {submission.actionLabel}
          </Text>
        )}

        <Spacer y={1} />

        <Text variant="sm" color="black60">
          {submission.stateHelpMessage}
        </Text>

        <Spacer y={2} />

        {!!buttonURL && (
          <Button
            variant={buttonVariant}
            // @ts-ignore
            as={RouterLink}
            onClick={() => {
              // TODO: Tracking
            }}
            to={buttonURL}
          >
            {submission.buttonLabel}
          </Button>
        )}
      </Media>
    </Box>
  )
}

const submissionStatusFragment = graphql`
  fragment MyCollectionArtworkSWASubmissionStatus_artwork on Artwork {
    listedArtworksConnection(first: 1) {
      edges {
        node {
          internalID
        }
      }
    }
    consignmentSubmission {
      actionLabel
      buttonLabel
      internalID
      state
      stateLabel
      stateHelpMessage
    }
  }
`

interface SubmissionStatusModalProps {
  buttonURL: string | null
  buttonVariant: ButtonProps["variant"] | null
  show: boolean
  onClose(): void
  submission: MyCollectionArtworkSWASubmissionStatus_artwork$data["consignmentSubmission"]
}

const SubmissionStatusModal: React.FC<SubmissionStatusModalProps> = ({
  buttonURL,
  buttonVariant,
  onClose,
  show,
  submission,
}) => {
  if (!show || !submission) return null

  return (
    <ModalDialog onClose={onClose}>
      <Box>
        <Text variant="xs" mb={1}>
          Submission Status
        </Text>

        <Text variant="md" fontWeight="400">
          {submission.stateLabel}
        </Text>

        {!!submission.actionLabel && (
          <Text variant="md" fontWeight="400" color="orange100">
            {submission.actionLabel}
          </Text>
        )}

        <Spacer y={1} />

        <Text variant="sm" color="black60">
          {submission.stateHelpMessage}
        </Text>

        <Spacer y={2} />

        {!!buttonURL && (
          <Button
            variant={buttonVariant}
            // @ts-ignore
            as={RouterLink}
            onClick={() => {
              // TODO: Tracking
            }}
            to={buttonURL}
            width="100%"
            mb={2}
          >
            {submission.buttonLabel}
          </Button>
        )}
      </Box>
    </ModalDialog>
  )
}

const getButtonURL = (
  artwork: MyCollectionArtworkSWASubmissionStatus_artwork$data
): string | null => {
  const submission = artwork.consignmentSubmission

  const listedArtwork = extractNodes(artwork.listedArtworksConnection)[0]

  // The artwork has been listed on Artsy.
  if (listedArtwork) {
    return `/artwork/${listedArtwork?.internalID}`
  }

  if (!submission) return null

  if (
    ["DRAFT", "SUBMITTED", "RESUBMITTED", "PUBLISHED"].includes(
      submission.state
    )
  ) {
    return `/sell/submissions/${submission.internalID}/${INITIAL_STEP}`
  }

  if (["APPROVED"].includes(submission.state)) {
    return `/sell/submissions/${submission.internalID}/${INITIAL_POST_APPROVAL_STEP}`
  }

  return null
}

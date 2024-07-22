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

type SubmissionData = {
  button?: {
    label: string
    to: string
    variant: ButtonProps["variant"]
  }
  stateLabel: string | null | undefined
  actionLabel?: string
  description?: string | React.ReactNode
}

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

  const submissionData = getSubmissionData(artwork)

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
        {submissionData.stateLabel}
      </Text>

      <Media lessThan="sm">
        {!!submissionData.button && !!submissionData.actionLabel && (
          <RouterLink
            onClick={() => {
              // TODO: Tracking
            }}
            to={submissionData.button.to}
            textDecoration="none"
            color="orange100"
          >
            <Flex alignItems="center">
              <Text variant="sm-display">{submissionData.actionLabel}</Text>

              <ChevronRightIcon ml={0.5} size={16} />
            </Flex>
          </RouterLink>
        )}

        <SubmissionStatusModal
          submissionData={submissionData}
          show={isSubmissionStatusModalOpen}
          onClose={() => setIsSubmissionStatusModalOpen(false)}
        />
      </Media>

      <Media greaterThanOrEqual="sm">
        {!!submissionData.actionLabel && (
          <Text variant="md" fontWeight="400" color="orange100">
            {submissionData.actionLabel}
          </Text>
        )}

        <Spacer y={1} />

        <Text variant="sm" color="black60">
          {submissionData.description}
        </Text>

        <Spacer y={2} />

        {!!submissionData.button && (
          <Button
            variant={submissionData.button.variant}
            // @ts-ignore
            as={RouterLink}
            onClick={() => {
              // TODO: Tracking
            }}
            to={submissionData.button.to}
          >
            {submissionData.button.label}
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
  submissionData: SubmissionData
}

const SubmissionStatusModal: React.FC<SubmissionStatusModalProps> = ({
  show,
  onClose,
  submissionData,
}) => {
  if (!show) return null

  return (
    <ModalDialog onClose={onClose}>
      <Box>
        <Text variant="xs" mb={1}>
          Submission Status
        </Text>

        <Text variant="md" fontWeight="400">
          {submissionData.stateLabel}
        </Text>

        {!!submissionData.actionLabel && (
          <Text variant="md" fontWeight="400" color="orange100">
            {submissionData.actionLabel}
          </Text>
        )}

        <Spacer y={1} />

        <Text variant="sm" color="black60">
          {submissionData.description}
        </Text>

        <Spacer y={2} />

        {!!submissionData.button && (
          <Button
            variant={submissionData.button.variant}
            // @ts-ignore
            as={RouterLink}
            onClick={() => {
              // TODO: Tracking
            }}
            to={submissionData.button.to}
            width="100%"
            mb={2}
          >
            {submissionData.button.label}
          </Button>
        )}
      </Box>
    </ModalDialog>
  )
}

const getSubmissionData = (
  artwork: MyCollectionArtworkSWASubmissionStatus_artwork$data
): SubmissionData => {
  const submission = artwork.consignmentSubmission

  if (!submission) return { stateLabel: null }

  switch (submission.state) {
    case "DRAFT":
      return {
        button: {
          label: "Complete Submission",
          to: `/sell/submissions/${submission.internalID}/${INITIAL_STEP}`,
          variant: "primaryBlack",
        },
        description:
          "You’ve started a submission to sell with Artsy but have not yet completed it.",
        stateLabel: null,
        actionLabel: "Complete Submission",
      }
    case "SUBMITTED":
      return {
        button: {
          label: "Edit Submission",
          to: `/sell/submissions/${submission.internalID}/${INITIAL_STEP}`,
          variant: "secondaryBlack",
        },
        description:
          "Your submission is currently being reviewed by our team. You will receive a response within 3 to 5 days.",
        stateLabel: submission.stateLabel,
      }
    case "APPROVED":
      return {
        button: {
          label: "Add Additional Information",
          to: `/sell/submissions/${submission.internalID}/${INITIAL_POST_APPROVAL_STEP}`,
          variant: "primaryBlack",
        },
        description:
          "Congratulations, your submission has been approved. Please provide additional information so we can list your work and match it with the best selling opportunity.",
        stateLabel: "Approved",
        actionLabel: "Complete Listing",
      }
    case "PUBLISHED":
      const listedArtwork = extractNodes(artwork.listedArtworksConnection)[0]

      return {
        button: listedArtwork
          ? {
              label: "View Listing",
              to: `/artwork/${listedArtwork?.internalID}`,
              variant: "secondaryBlack",
            }
          : undefined,
        stateLabel: submission.stateLabel,
      }
    case "REJECTED":
      return {
        description: (
          <>
            Our specialists have reviewed this submission and determined that we
            do not currently have a market for it. Find out more about our{" "}
            <RouterLink
              to="https://support.artsy.net/s/article/What-items-do-you-accept"
              inline
              color="black60"
            >
              submission criteria
            </RouterLink>
            .
          </>
        ),
        stateLabel: submission.stateLabel,
      }
    default:
      return {
        stateLabel: submission.stateLabel,
      }
  }
}

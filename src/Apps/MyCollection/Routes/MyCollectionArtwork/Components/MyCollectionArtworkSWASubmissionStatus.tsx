import { OwnerType } from "@artsy/cohesion"
import ChevronRightIcon from "@artsy/icons/ChevronRightIcon"
import {
  Box,
  Button,
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
  BASIC_STEPS,
  INITIAL_EDIT_STEP,
  INITIAL_POST_APPROVAL_STEP,
  INITIAL_STEP,
  PRE_SUBMITTED_STEPS,
} from "Apps/Sell/SellFlowContext"
import { usePreviousSubmission } from "Apps/Sell/Utils/previousSubmissionUtils"
import React, { useState } from "react"
import { graphql, useFragment } from "react-relay"
import { useTracking } from "react-tracking"
import { RouterLink } from "System/Components/RouterLink"
import { extractNodes } from "Utils/extractNodes"
import { Media } from "Utils/Responsive"

interface Props {
  artwork: MyCollectionArtworkSWASubmissionStatus_artwork$key
}

export const MyCollectionArtworkSWASubmissionStatus: React.FC<Props> = props => {
  const { trackEvent } = useTracking()
  const [
    isSubmissionStatusModalOpen,
    setIsSubmissionStatusModalOpen,
  ] = useState(false)

  const artwork = useFragment(submissionStatusFragment, props.artwork)

  const { consignmentSubmission: submission } = artwork

  const buttonURL = useGetButtonURL(artwork)

  if (!submission) return null

  const isListed = extractNodes(artwork.listedArtworksConnection).length > 0
  const stateLabel = isListed ? "Listed" : submission.stateLabel
  const buttonLabel = isListed ? "View Listing" : submission.buttonLabel

  const buttonVariant = PRE_SUBMITTED_STEPS.includes(submission.state)
    ? "primaryBlack"
    : "secondaryBlack"
  const stateHelpMessage = getStateHelpMessage(submission, isListed)

  const trackEditSubmission = () => {
    trackEvent({
      action: "tappedEditSubmission",
      context_page_owner_type: OwnerType.myCollectionArtwork,
      context_page_owner_id: artwork.internalID,
      destination_page_owner_type: OwnerType.consignmentFlow,
      submission_id: submission.internalID,
      submission_state: submission.state,
      subject: buttonLabel,
      platform: "web",
    })
  }

  return (
    <Box>
      <Media greaterThanOrEqual="sm">
        <Separator my={4} />
      </Media>

      <Text variant="xs" mb={[0.5, 1]}>
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

      <Text variant={["sm", "md"]} fontWeight="400">
        {stateLabel}
      </Text>

      <Media lessThan="sm">
        {!!submission.actionLabel && !!buttonURL && (
          <RouterLink
            onClick={() => {
              trackEditSubmission()
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

        {!!isSubmissionStatusModalOpen && (
          <ModalDialog onClose={() => setIsSubmissionStatusModalOpen(false)}>
            <Box>
              <Text variant="xs" mb={1}>
                Submission Status
              </Text>

              <Text variant="md" fontWeight="400">
                {stateLabel}
              </Text>

              {!!submission.actionLabel && (
                <Text variant="md" fontWeight="400" color="orange100">
                  {submission.actionLabel}
                </Text>
              )}

              <Spacer y={1} />

              <Text variant="sm" color="black60">
                {stateHelpMessage}
              </Text>

              <Spacer y={2} />

              {!!buttonURL && (
                <Button
                  variant={buttonVariant}
                  // @ts-ignore
                  as={RouterLink}
                  onClick={() => {
                    trackEditSubmission()
                  }}
                  to={buttonURL}
                  width="100%"
                  mb={2}
                >
                  {buttonLabel}
                </Button>
              )}
            </Box>
          </ModalDialog>
        )}
      </Media>

      <Media greaterThanOrEqual="sm">
        {!!submission.actionLabel && (
          <Text variant="md" fontWeight="400" color="orange100">
            {submission.actionLabel}
          </Text>
        )}

        <Spacer y={1} />

        <Text variant="sm" color="black60">
          {stateHelpMessage}
        </Text>

        <Spacer y={2} />

        {!!buttonURL && (
          <Button
            variant={buttonVariant}
            // @ts-ignore
            as={RouterLink}
            onClick={() => {
              trackEditSubmission()
            }}
            to={buttonURL}
          >
            {buttonLabel}
          </Button>
        )}
      </Media>
    </Box>
  )
}

const submissionStatusFragment = graphql`
  fragment MyCollectionArtworkSWASubmissionStatus_artwork on Artwork {
    internalID
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
      externalID
      internalID
      state
      stateLabel
      stateHelpMessage
    }
  }
`

const useGetButtonURL = (
  artwork: MyCollectionArtworkSWASubmissionStatus_artwork$data
): string | null => {
  const { submissionID, step } = usePreviousSubmission()

  const submission = artwork.consignmentSubmission

  const listedArtwork = extractNodes(artwork.listedArtworksConnection)[0]

  // The artwork has been listed on Artsy.
  if (listedArtwork) {
    return `/artwork/${listedArtwork?.internalID}`
  }

  if (!submission) return null

  // Do not link to the initial artist step.
  const previousStep =
    submissionID === submission.externalID && step !== INITIAL_STEP && step

  // Linking to the previous step does not work in all cases because we only store the current step for the most recent submission.
  const currentStep = previousStep || INITIAL_EDIT_STEP
  const currentPostApprovalStep =
    (!BASIC_STEPS.includes(previousStep as any) && previousStep) ||
    INITIAL_POST_APPROVAL_STEP

  if (
    ["DRAFT", "SUBMITTED", "RESUBMITTED", "PUBLISHED"].includes(
      submission.state
    )
  ) {
    return `/sell/submissions/${submission.internalID}/${currentStep}`
  }

  if (["APPROVED"].includes(submission.state)) {
    return `/sell/submissions/${submission.internalID}/${currentPostApprovalStep}`
  }

  return null
}

const getStateHelpMessage = (submission, isListed): JSX.Element => {
  if (isListed) {
    return <>Your artwork has been successfully listed on Artsy.</>
  }

  if (submission.state === "REJECTED") {
    return (
      <>
        {submission.stateHelpMessage} Find out more about our{" "}
        <RouterLink
          to="https://support.artsy.net/s/article/What-items-do-you-accept"
          color="black60"
          inline
        >
          submission criteria
        </RouterLink>
        .
      </>
    )
  }

  return submission.stateHelpMessage
}

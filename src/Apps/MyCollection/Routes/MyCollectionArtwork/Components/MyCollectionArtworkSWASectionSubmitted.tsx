import {
  Button,
  Clickable,
  Flex,
  ModalDialog,
  Text,
  WinningBidIcon,
} from "@artsy/palette"
import { useState } from "react"
import { RouterLink } from "System/Router/RouterLink"
import { useFeatureFlag } from "System/useFeatureFlag"
import { Media } from "Utils/Responsive"

interface Props {
  submissionStatus: string
}

export const MyCollectionArtworkSWASectionSubmitted: React.FC<Props> = ({
  submissionStatus,
}) => {
  const [
    isSubmissionStatusModalOpen,
    setIsSubmissionStatusModalOpen,
  ] = useState(false)

  const isMyCollectionPhase8Enabled = useFeatureFlag(
    "my-collection-web-phase-8-submission-status"
  )

  const article =
    "https://support.artsy.net/hc/en-us/sections/360008311913-Sell-with-Artsy"

  if (submissionStatus && isMyCollectionPhase8Enabled) {
    return (
      <>
        <SubmissionStatusModal
          show={isSubmissionStatusModalOpen}
          onClose={() => setIsSubmissionStatusModalOpen(false)}
        />
        <Flex
          alignItems="stretch"
          flexDirection={["column", "row"]}
          mb={2}
          mt={2}
        >
          <Flex alignItems={["center", "flex-start"]} flex={1}>
            <Text variant={["xs", "sm"]} flex={1}>
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
          <Text variant="sm" flex={1} color="orange150">
            {submissionStatus}
          </Text>
        </Flex>
        <Media greaterThanOrEqual="sm">
          <Text mb={2} color="black60" variant="xs">
            Our specialists have reviewed this submission and determined taht we
            do not currently have a market for it.
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
  return (
    <>
      <Flex alignItems="center" flexDirection="row" mb={1} mt={2}>
        <WinningBidIcon />
        <Text variant="sm" ml={0.5}>
          Artwork has been submitted for sale
        </Text>
      </Flex>

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
    </>
  )
}

interface SubmissionStatusModalProps {
  show: boolean
  onClose(): void
}

const SubmissionStatusModal: React.FC<SubmissionStatusModalProps> = ({
  show,
  onClose,
}) => {
  if (!show) return null

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
      <Text variant="sm-display">What does my Artwork’s status mean?</Text>
      <Text as="li" variant="sm-display">
        Submission in Progress - the artwork is being reviewed or is in the
        sales process.
      </Text>
      <Text as="li" variant="sm-display" mt={2}>
        Evaluation Complete - our specialists have reviewed this submission and
        determined that we do not currently have a market for it.
      </Text>
      <Text variant="sm-display" mt={2}>
        Have a question?
      </Text>
      <Text variant="sm-display">
        Visit our help center or get in touch with one of our specialists at
        sell@artsymail.com.
      </Text>
    </ModalDialog>
  )
}

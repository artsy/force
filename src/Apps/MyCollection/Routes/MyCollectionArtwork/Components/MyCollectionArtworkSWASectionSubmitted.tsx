import {
  Button,
  Clickable,
  Flex,
  ModalDialog,
  Text,
  WinningBidIcon,
} from "@artsy/palette"
import { toTitleCase } from "@artsy/to-title-case"

import { useState } from "react"
import { RouterLink } from "System/Router/RouterLink"
import { useFeatureFlag } from "System/useFeatureFlag"
import { Media } from "Utils/Responsive"

// TODO:- We are using displayText for Statuses for now. Consider changing the logic when proper statuses are made available on Metaphysics.
// See https://artsyproduct.atlassian.net/browse/SWA-217
// same as on Eigen
const STATUSES: {
  [key: string]: { color: string; text: string; description?: string }
} = {
  "submission in progress": {
    color: "yellow150",
    text: "In Progress",
    description: "The artwork is being reviewd or is in the sale process",
  },
  "submission evaluated": {
    color: "orange150",
    text: "Evaluation Complete",
    description:
      "Our specialists have reviewed this submission and determined that we do not currently have a market for it.  ",
  },
  sold: { color: "black100", text: "Artwork Sold" },
}

interface Props {
  displayText: string
}

export const MyCollectionArtworkSWASectionSubmitted: React.FC<Props> = ({
  displayText,
}) => {
  const [
    isSubmissionStatusModalOpen,
    setIsSubmissionStatusModalOpen,
  ] = useState(false)

  const isMyCollectionPhase8Enabled = useFeatureFlag(
    "my-collection-web-phase-8-submission-status"
  )

  if (!Boolean(displayText)) {
    return null
  }

  const article =
    "https://support.artsy.net/hc/en-us/sections/360008311913-Sell-with-Artsy"

  const approvedDisplayText = STATUSES[displayText!.toLowerCase()]?.text
  const statusDescription =
    STATUSES[displayText!.toLowerCase()]?.description || ""

  if (!Boolean(approvedDisplayText)) {
    return null
  }

  if (isMyCollectionPhase8Enabled) {
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
            <Text
              variant="sm"
              color={STATUSES[displayText!.toLowerCase()]?.color ?? "black100"}
            >
              {toTitleCase(approvedDisplayText)}
            </Text>
          </Flex>
        </Flex>

        <Media greaterThanOrEqual="sm">
          <Text mb={2} color="black60" variant="xs">
            {statusDescription}
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
  const article =
    "https://support.artsy.net/hc/en-us/articles/360046646494-What-items-do-you-accept-"

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
        <RouterLink to={article}>What items do you accept?</RouterLink>
      </Text>
      <Text variant="sm-display">
        Or get in touch with one of our specialists at{" "}
        <RouterLink to={"mailto:sell@artsy.net"}>sell@artsy.net</RouterLink>.
      </Text>
    </ModalDialog>
  )
}

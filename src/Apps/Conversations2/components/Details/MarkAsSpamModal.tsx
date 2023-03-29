import {
  Button,
  Flex,
  ModalDialog,
  Spacer,
  Text,
  useToasts,
} from "@artsy/palette"
import { useRouter } from "next/router"
import { useDeleteConversation } from "pages/conversations/mutations/useDeleteConversation"
import { useMarkAsSpam } from "pages/conversations/mutations/useMarkAsSpam"
import { useState } from "react"
import { useTracking } from "react-tracking"
import { useSystemContext } from "system/SystemContext"
import {
  ActionType,
  ClickedMarkSpam,
  OwnerType,
  PageOwnerType,
} from "@artsy/cohesion"
import { graphql, useFragment } from "react-relay"
import { MarkAsSpamModal_conversation$key } from "__generated__/MarkAsSpamModal_conversation.graphql"

interface MarkAsSpamModalProps {
  conversation: MarkAsSpamModal_conversation$key
  onClose: () => void
}

export const MarkAsSpamModal: React.FC<MarkAsSpamModalProps> = ({
  conversation,
  onClose,
}) => {
  const { query, replace } = useRouter()
  const { sendToast } = useToasts()
  const [isLoading, setIsLoading] = useState(false)
  const [commitMarkAsSpam] = useMarkAsSpam()
  const [commitDeleteConversation] = useDeleteConversation()
  const { trackEvent } = useTracking()
  const { user } = useSystemContext()

  const data = useFragment(
    graphql`
      fragment MarkAsSpamModal_conversation on Conversation {
        items {
          item {
            ... on Artwork {
              id
            }
          }
        }
      }
    `,
    conversation
  )

  const trackingData = {
    conversation_id: query.conversationId as string,
    context_module: "conversations",
    context_page_owner_type: OwnerType.conversation as PageOwnerType,
    artwork_id: data?.items?.[0]?.item?.id ?? "",
    partner_id: user?.currentPartner?._id ?? "",
  }

  const handleMarkAsSpam = async () => {
    setIsLoading(true)

    commitMarkAsSpam({
      variables: {
        input: {
          id: query.conversationId as string,
          spam: true,
        },
      },
      onError: handleError,
      onCompleted() {
        commitDeleteConversation({
          variables: {
            input: {
              id: query.conversationId as string,
            },
          },
          onError: handleError,
          onCompleted: handleSuccess,
        })
      },
    })
  }

  const handleError = (error: Error) => {
    console.error("Error marking as spam:", error)

    setIsLoading(false)

    sendToast({
      variant: "error",
      message: "Error marking as spam. Please try again.",
    })
  }

  const handleSuccess = () => {
    setIsLoading(false)

    sendToast({
      variant: "success",
      message: "Successfully marked as spam.",
    })

    const trackingPayload: ClickedMarkSpam = {
      action: ActionType.clickedMarkSpam,
      label: "Mark as spam",
      ...trackingData,
    }
    trackEvent(trackingPayload)

    // TODO: This moves to the root, which will refetch conversation lists. We
    // will likely need to fine-tune this at some point.
    replace("/conversations")

    onClose()
  }

  const handleCancelMarkAsSpam = () => {
    const trackingPayload: ClickedMarkSpam = {
      action: ActionType.clickedMarkSpam,
      label: "Cancel mark as spam",
      ...trackingData,
    }
    trackEvent(trackingPayload)
    onClose()
  }

  return (
    <ModalDialog title="Mark as spam" onClose={handleCancelMarkAsSpam}>
      <Text variant="sm">
        This will delete this inquiry and notify our Trust and Safety team.
      </Text>

      <Spacer y={4} />

      <Flex justifyContent="space-between">
        <Button
          variant="secondaryBlack"
          width="40%"
          mr={1}
          onClick={handleCancelMarkAsSpam}
        >
          Cancel
        </Button>
        <Button
          variant="primaryBlack"
          width="60%"
          loading={isLoading}
          onClick={handleMarkAsSpam}
        >
          Delete And Mark as Spam
        </Button>
      </Flex>
    </ModalDialog>
  )
}

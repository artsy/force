import { Box, Button, Separator, Spacer, Text } from "@artsy/palette"
import { useState } from "react"
import { useTracking } from "react-tracking"
import { DismissInquiryModal } from "./DismissInquiryModal"
import { MarkAsSpamModal } from "./MarkAsSpamModal"
import { graphql, useFragment } from "react-relay"
import { ConversationManageThisInquiry_conversation$key } from "__generated__/ConversationManageThisInquiry_conversation.graphql"

interface ConversationManageThisInquiryProps {
  conversation: ConversationManageThisInquiry_conversation$key
}

export const ConversationManageThisInquiry: React.FC<
  ConversationManageThisInquiryProps
> = ({ conversation }) => {
  const { trackEvent } = useTracking()
  const [showMarkAsSpamModal, setShowMarkAsSpamModal] = useState(false)
  const [showDismissInquiryModal, setShowDismissInquiryModal] = useState(false)

  const data = useFragment(
    graphql`
      fragment ConversationManageThisInquiry_conversation on Conversation {
        items {
          item {
            ... on Artwork {
              id
            }
          }
        }
        ...MarkAsSpamModal_conversation
        ...DismissInquiryModal_conversation
      }
    `,
    conversation
  )

  return (
    <Box>
      <Text variant="lg">Manage This Inquiry</Text>
      <Text variant="sm">
        Mark as spam to delete this inquiry and notify our Trust and Safety
        team.
      </Text>
      <Spacer y={1} />
      <Button
        variant="secondaryBlack"
        size="small"
        onClick={() => {
          trackEvent({
            action: "Click",
            label: "Open Mark as Spam modal",
            context_module: "conversations",
            artwork_id: data.items?.[0]?.item?.id,
          })
          setShowMarkAsSpamModal(true)
        }}
      >
        Mark as spam
      </Button>

      <Separator my={2} />

      <Text variant="sm">
        Dismiss an inquiry to leave it unanswered without affecting your
        response rate. You can still see and reply to the conversation.
      </Text>
      <Spacer y={1} />
      <Button
        variant="secondaryBlack"
        size="small"
        onClick={() => {
          trackEvent({
            action: "Click",
            label: "Open Dismiss Inquiry modal",
            context_module: "conversations",
            artwork_id: data.items?.[0]?.item?.id,
          })
          setShowDismissInquiryModal(true)
        }}
      >
        Dismiss inquiry
      </Button>

      {showMarkAsSpamModal && (
        <MarkAsSpamModal
          conversation={data}
          onClose={() => setShowMarkAsSpamModal(false)}
        />
      )}
      {showDismissInquiryModal && (
        <DismissInquiryModal
          conversation={data}
          onClose={() => setShowDismissInquiryModal(false)}
        />
      )}
    </Box>
  )
}

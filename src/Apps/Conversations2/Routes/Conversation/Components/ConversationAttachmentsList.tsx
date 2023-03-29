import { FC } from "react"
import { Clickable, Flex, Spinner, Text, CloseIcon, Box } from "@artsy/palette"
import { Attachment } from "pages/conversations/hooks/useAttachments"

interface ConversationAttachmentsListProps {
  attachments?: Attachment[]
  onRemoveAttachment: (id: string) => void
}

export const ConversationAttachmentsList: FC<
  ConversationAttachmentsListProps
> = ({ attachments, onRemoveAttachment }) => {
  if (!attachments || !attachments.length) {
    return null
  }

  return (
    <Flex
      flexDirection="column"
      borderBottom="1px solid"
      borderBottomColor="black15"
      maxHeight={230}
      overflowY="scroll"
    >
      {attachments.map((attachment, idx) => (
        <Flex
          p={1}
          justifyContent="space-between"
          key={`attachment_${idx}_${attachment.name}`}
        >
          <Flex
            alignItems="center"
            overflow="hidden"
            style={{ whiteSpace: "nowrap" }}
          >
            <Text
              variant="sm"
              overflowEllipsis
              overflow="hidden"
              style={{ whiteSpace: "nowrap" }}
            >
              {attachment.name}
            </Text>
            <Text variant="xs" mx={0.5} flex={1}>
              ({attachment.size})
            </Text>
            {!attachment.url && (
              <Box position="relative" mx={2}>
                <Spinner
                  size="small"
                  color="blue100"
                  data-testid="attachment-spinner"
                />
              </Box>
            )}
          </Flex>
          <Clickable
            onClick={() => {
              onRemoveAttachment(attachment.id)
            }}
            display="flex"
            alignItems="center"
            aria-label="Remove"
            data-testid="remove-icon"
          >
            <CloseIcon />
          </Clickable>
        </Flex>
      ))}
    </Flex>
  )
}

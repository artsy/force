import { Button, Clickable, Flex, Text } from "@artsy/palette"
import type { StoredArtAssistantConversation } from "Apps/ArtAssistant/utils/artAssistantStorage"
import type { FC } from "react"

interface ArtAssistantHistoryProps {
  conversations: StoredArtAssistantConversation[]
  activeConversationID: string
  onSelect: (id: string) => void
  onDelete: (id: string) => void
  onNewChat: () => void
}

export const ArtAssistantHistory: FC<ArtAssistantHistoryProps> = ({
  conversations,
  activeConversationID,
  onSelect,
  onDelete,
  onNewChat,
}) => {
  return (
    <Flex
      as="nav"
      aria-label="Chat history"
      flexDirection="column"
      gap={2}
      p={2}
    >
      <Text variant="sm-display">Chat history</Text>
      <Button variant="secondaryNeutral" onClick={onNewChat}>
        New chat
      </Button>
      {!conversations.length && (
        <Text variant="xs" color="mono60">
          Your chats will appear here.
        </Text>
      )}
      {conversations.map(conversation => {
        return (
          <Flex key={conversation.id} gap={1} alignItems="center">
            <Clickable
              textAlign="left"
              flex={1}
              minWidth={0}
              p={1}
              bg={conversation.id === activeConversationID ? "mono10" : "mono0"}
              aria-current={
                conversation.id === activeConversationID ? "true" : undefined
              }
              onClick={() => onSelect(conversation.id)}
            >
              <Text
                variant="xs"
                lineClamp={2}
                style={{ overflowWrap: "anywhere" }}
              >
                {conversation.title}
              </Text>
            </Clickable>
            <Button
              variant="tertiary"
              size="small"
              aria-label={`Delete chat: ${conversation.title}`}
              onClick={() => onDelete(conversation.id)}
            >
              Delete
            </Button>
          </Flex>
        )
      })}
      <Text variant="xxs" color="mono60">
        Chats are saved in this browser.
      </Text>
    </Flex>
  )
}

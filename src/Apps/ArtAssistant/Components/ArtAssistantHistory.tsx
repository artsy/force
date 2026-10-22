import { Button, Clickable, Flex, Text } from "@artsy/palette"
import EditIcon from "@artsy/icons/EditIcon"
import type { StoredArtAssistantConversation } from "Apps/ArtAssistant/utils/artAssistantStorage"
import type { FC } from "react"

interface ArtAssistantHistoryProps {
  conversations: StoredArtAssistantConversation[]
  activeConversationID: string
  onSelect: (id: string) => void
  onNewChat: () => void
}

export const ArtAssistantHistory: FC<ArtAssistantHistoryProps> = ({
  conversations,
  activeConversationID,
  onSelect,
  onNewChat,
}) => {
  return (
    <Flex
      as="nav"
      aria-label="Recents"
      flexDirection="column"
      gap={2}
      p={2}
      height="100%"
      minHeight={0}
    >
      <Button
        size="small"
        Icon={EditIcon}
        alignSelf="flex-start"
        flexShrink={0}
        variant="secondaryNeutral"
        onClick={onNewChat}
      >
        New chat
      </Button>
      <Text variant="sm-display">Recents</Text>
      <Flex
        flexDirection="column"
        gap={2}
        flex={1}
        minHeight={0}
        overflowY="auto"
      >
        {!conversations.length && (
          <Text variant="xs" color="mono60">
            Your chats will appear here.
          </Text>
        )}
        {conversations.map(conversation => {
          return (
            <Clickable
              key={conversation.id}
              textAlign="left"
              width="100%"
              flexShrink={0}
              minWidth={0}
              p={1}
              aria-current={
                conversation.id === activeConversationID ? "true" : undefined
              }
              onClick={() => onSelect(conversation.id)}
            >
              <Text variant="xs" overflowEllipsis>
                {conversation.title}
              </Text>
            </Clickable>
          )
        })}
      </Flex>
    </Flex>
  )
}

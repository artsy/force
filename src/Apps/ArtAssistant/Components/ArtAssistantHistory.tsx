import { Button, Clickable, Flex, Text } from "@artsy/palette"
import EditIcon from "@artsy/icons/EditIcon"
import type { StoredArtAssistantConversation } from "Apps/ArtAssistant/utils/artAssistantStorage"
import type { FC } from "react"

interface ArtAssistantHistoryProps {
  conversations: StoredArtAssistantConversation[]
  activeConversationID: string
  onSelect: (id: string) => void
  onDelete: (id: string) => void
  onNewChat: () => void
  isDebugEnabled?: boolean
  onToggleDebug?: () => void
}

export const ArtAssistantHistory: FC<ArtAssistantHistoryProps> = ({
  conversations,
  activeConversationID,
  onSelect,
  onDelete,
  onNewChat,
  isDebugEnabled = false,
  onToggleDebug,
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
            <Flex key={conversation.id} gap={1} alignItems="center">
              <Clickable
                textAlign="left"
                flex={1}
                minWidth={0}
                p={1}
                bg={
                  conversation.id === activeConversationID ? "mono10" : "mono0"
                }
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
      </Flex>
      {onToggleDebug && (
        <Button
          size="small"
          variant="tertiary"
          alignSelf="flex-start"
          flexShrink={0}
          aria-pressed={isDebugEnabled}
          onClick={onToggleDebug}
        >
          Debug
        </Button>
      )}
    </Flex>
  )
}

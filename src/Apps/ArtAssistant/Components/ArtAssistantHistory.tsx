import { Button, Clickable, Flex, Text } from "@artsy/palette"
import EditIcon from "@artsy/icons/EditIcon"
import { themeGet } from "@styled-system/theme-get"
import type { StoredArtAssistantConversation } from "Apps/ArtAssistant/utils/artAssistantStorage"
import type { FC } from "react"
import styled from "styled-components"

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
        mx={-1}
      >
        {!conversations.length && (
          <Text variant="xs" color="mono60" px={1}>
            Your chats will appear here.
          </Text>
        )}
        {conversations.map(conversation => {
          return (
            <ConversationButton
              key={conversation.id}
              textAlign="left"
              width="100%"
              flexShrink={0}
              minWidth={0}
              p={1}
              bg={
                conversation.id === activeConversationID ? "mono5" : undefined
              }
              borderRadius="4px"
              aria-current={
                conversation.id === activeConversationID ? "true" : undefined
              }
              onClick={() => onSelect(conversation.id)}
            >
              <Text variant="xs" overflowEllipsis>
                {conversation.title}
              </Text>
            </ConversationButton>
          )
        })}
      </Flex>
    </Flex>
  )
}

const ConversationButton = styled(Clickable)`
  &:hover,
  &:focus-visible {
    background-color: ${themeGet("colors.mono5")};
  }
`

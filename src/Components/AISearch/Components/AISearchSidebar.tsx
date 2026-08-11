import AddIcon from "@artsy/icons/AddIcon"
import CloseIcon from "@artsy/icons/CloseIcon"
import { Box, Clickable, Flex, Stack, Text } from "@artsy/palette"
import { themeGet } from "@styled-system/theme-get"
import type { StoredAISearchConversation } from "Components/AISearch/Utils/aiSearchStorage"
import { DateTime } from "luxon"
import type { FC } from "react"
import styled from "styled-components"

interface AISearchSidebarProps {
  conversations: StoredAISearchConversation[]
  activeConversationID: string | null
  onConversationClick: (id: string) => void
  onDeleteConversation: (id: string) => void
  onNewSearchClick: () => void
}

export const AISearchSidebar: FC<AISearchSidebarProps> = ({
  conversations,
  activeConversationID,
  onConversationClick,
  onDeleteConversation,
  onNewSearchClick,
}) => {
  return (
    <Flex
      flexDirection="column"
      width={300}
      flexShrink={0}
      height="100%"
      bg="mono5"
      borderRight="1px solid"
      borderColor="mono10"
      display={["none", "none", "flex"]}
    >
      <Box p={2}>
        <NewSearchButton onClick={onNewSearchClick}>
          <Flex alignItems="center">
            <AddIcon mr={1} />

            <Text variant="sm-display">New search</Text>
          </Flex>
        </NewSearchButton>
      </Box>

      <Box flex={1} overflowY="auto" px={2} pb={2}>
        <Text variant="xs" color="mono60" px={1} mb={1}>
          Past searches
        </Text>

        {conversations.length === 0 ? (
          <Text variant="xs" color="mono60" px={1}>
            Your searches will show up here.
          </Text>
        ) : (
          <Stack gap="2px">
            {conversations.map(conversation => {
              return (
                <HistoryItem
                  key={conversation.id}
                  $isActive={conversation.id === activeConversationID}
                >
                  <HistoryItemButton
                    onClick={() => {
                      onConversationClick(conversation.id)
                    }}
                  >
                    <Text
                      variant="sm-display"
                      textAlign="left"
                      overflowEllipsis
                    >
                      {conversation.title}
                    </Text>

                    <Text variant="xs" color="mono60" textAlign="left">
                      {DateTime.fromISO(conversation.updatedAt).toRelative()}
                    </Text>
                  </HistoryItemButton>

                  <DeleteButton
                    aria-label={`Delete “${conversation.title}”`}
                    onClick={() => {
                      onDeleteConversation(conversation.id)
                    }}
                  >
                    <CloseIcon fill="mono60" />
                  </DeleteButton>
                </HistoryItem>
              )
            })}
          </Stack>
        )}
      </Box>
    </Flex>
  )
}

const NewSearchButton = styled(Clickable)`
  width: 100%;
  padding: ${themeGet("space.1")};
  border: 1px solid ${themeGet("colors.mono10")};
  border-radius: 20px;
  background-color: ${themeGet("colors.mono0")};
  transition: border-color 150ms;

  &:hover,
  &:focus-visible {
    border-color: ${themeGet("colors.mono100")};
  }
`

const DeleteButton = styled(Clickable)`
  flex-shrink: 0;
  opacity: 0;
  transition: opacity 150ms;
`

const HistoryItemButton = styled(Clickable)`
  flex: 1;
  min-width: 0;
`

const HistoryItem = styled(Flex)<{ $isActive: boolean }>`
  align-items: center;
  width: 100%;
  padding: ${themeGet("space.1")};
  border-radius: 10px;
  transition: background-color 150ms;
  background-color: ${props => {
    return props.$isActive ? themeGet("colors.mono10")(props) : "transparent"
  }};

  &:hover,
  &:focus-within {
    background-color: ${themeGet("colors.mono10")};

    ${DeleteButton} {
      opacity: 1;
    }
  }
`

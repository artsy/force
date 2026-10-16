import { Box, Button, Drawer, Flex, ModalClose, Text } from "@artsy/palette"
import { ArtAssistantComposer } from "Apps/ArtAssistant/Components/ArtAssistantComposer"
import { ArtAssistantDebugPanel } from "Apps/ArtAssistant/Components/ArtAssistantDebugPanel"
import { ArtAssistantEmptyState } from "Apps/ArtAssistant/Components/ArtAssistantEmptyState"
import { ArtAssistantHistory } from "Apps/ArtAssistant/Components/ArtAssistantHistory"
import { ArtAssistantMessage } from "Apps/ArtAssistant/Components/ArtAssistantMessage"
import { useArtAssistantTracking } from "Apps/ArtAssistant/hooks/useArtAssistantTracking"
import { useArtAssistantConversation } from "Apps/ArtAssistant/hooks/useArtAssistantConversation"
import { useArtAssistantHistory } from "Apps/ArtAssistant/hooks/useArtAssistantHistory"
import { useArtAssistantViewport } from "Apps/ArtAssistant/hooks/useArtAssistantViewport"
import { useEnableArtAssistant } from "Apps/ArtAssistant/hooks/useEnableArtAssistant"
import { useNavBarHeight } from "Components/NavBar/useNavBarHeight"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { Media } from "Utils/Responsive"
import { userIsAdmin } from "Utils/user"
import { HttpError } from "found"
import { useEffect, useRef, useState, type FC } from "react"
import { MetaTags } from "Components/MetaTags"

export const ArtAssistantApp: FC = () => {
  const isEnabled = useEnableArtAssistant()
  const { user } = useSystemContext()
  if (!isEnabled || !user?.id) throw new HttpError(404)
  return <ArtAssistantChat key={user.id} userID={user.id} />
}

const ArtAssistantChat: FC<{ userID: string }> = ({ userID }) => {
  const { user } = useSystemContext()
  const isAdmin = userIsAdmin(user)
  const { trackNewChat, trackSuggestedReplyTapped, trackSuggestionTapped } =
    useArtAssistantTracking()
  const [isDebugEnabled, setIsDebugEnabled] = useState(false)
  const conversation = useArtAssistantConversation({ isDebugEnabled })
  const history = useArtAssistantHistory({ userID, ...conversation })
  const [draft, setDraft] = useState("")
  const [isHistoryOpen, setIsHistoryOpen] = useState(false)
  const shouldFollowResponse = useRef(true)
  const scrollRef = useRef<HTMLDivElement | null>(null)
  const viewportRef = useArtAssistantViewport()
  const { mobile, desktop } = useNavBarHeight()

  // biome-ignore lint/correctness/useExhaustiveDependencies: Scroll after a new message or activity changes the layout.
  useEffect(() => {
    if (!shouldFollowResponse.current) return
    const element = scrollRef.current
    if (element) element.scrollTop = element.scrollHeight
  }, [conversation.messages])

  const handleSubmit = (text: string): boolean => {
    shouldFollowResponse.current = true
    return conversation.submit({ text })
  }
  const handleNewChat = (): void => {
    if (conversation.messages.length)
      trackNewChat({
        conversationID: conversation.conversationID,
        messageCount: conversation.messages.length,
      })
    conversation.startNewConversation()
    setDraft("")
    setIsHistoryOpen(false)
    shouldFollowResponse.current = true
  }
  const historyProps = {
    conversations: history.conversations,
    activeConversationID: conversation.conversationID,
    onSelect: (id: string): void => {
      history.selectConversation(id)
      setDraft("")
      setIsHistoryOpen(false)
      shouldFollowResponse.current = true
    },
    onDelete: history.removeConversation,
    onNewChat: handleNewChat,
  }

  return (
    <Flex
      ref={viewportRef}
      height={[`calc(100dvh - ${mobile}px)`, `calc(100dvh - ${desktop}px)`]}
      minHeight={200}
      overflow="hidden"
      data-testid="art-assistant"
    >
      <MetaTags title="Art Assistant | Artsy" blockRobots />
      <Media greaterThan="xs">
        <Box
          width={280}
          height="100%"
          overflowY="auto"
          borderRight="1px solid"
          borderColor="mono15"
        >
          <ArtAssistantHistory {...historyProps} />
        </Box>
      </Media>
      <Flex flex={1} minWidth={0} flexDirection="column">
        <Flex
          flexShrink={0}
          p={2}
          alignItems="center"
          justifyContent="space-between"
          borderBottom="1px solid"
          borderColor="mono15"
        >
          <Flex alignItems="center" gap={1}>
            <Media at="xs">
              <Button
                variant="tertiary"
                size="small"
                onClick={() => setIsHistoryOpen(true)}
              >
                History
              </Button>
            </Media>
            <Text as="h1" variant="sm-display">
              Art Assistant
            </Text>
          </Flex>
          {isAdmin && (
            <Button
              size="small"
              variant="tertiary"
              aria-pressed={isDebugEnabled}
              onClick={() => setIsDebugEnabled(previous => !previous)}
            >
              Debug
            </Button>
          )}
          <Button
            size="small"
            variant="secondaryNeutral"
            onClick={handleNewChat}
          >
            New chat
          </Button>
        </Flex>
        <Box
          ref={scrollRef}
          flex={1}
          minHeight={0}
          overflowY="auto"
          p={[2, 4]}
          onScroll={event => {
            const element = event.currentTarget
            shouldFollowResponse.current =
              element.scrollHeight - element.scrollTop - element.clientHeight <
              100
          }}
        >
          <Flex flexDirection="column" gap={3} maxWidth={900} mx="auto">
            {!conversation.messages.length && (
              <ArtAssistantEmptyState
                onSuggestion={(text, position) => {
                  shouldFollowResponse.current = true
                  trackSuggestionTapped({ suggestion: text, position })
                  conversation.submit({ text, type: "suggestion" })
                }}
              />
            )}
            {conversation.messages.map((message, index) => {
              return (
                <Box key={message.id}>
                  <ArtAssistantMessage
                    key={message.id}
                    message={message}
                    onSuggestedReply={
                      !conversation.isResponding &&
                      index === conversation.messages.length - 1
                        ? (reply, position, responseMessageID) => {
                            shouldFollowResponse.current = true
                            trackSuggestedReplyTapped({
                              conversationID: conversation.conversationID,
                              reply,
                              position,
                              responseMessageID,
                            })
                            conversation.submit({
                              text: reply,
                              type: "suggestion",
                            })
                          }
                        : undefined
                    }
                  />
                  {isAdmin &&
                    isDebugEnabled &&
                    message.role === "assistant" &&
                    message.debug && (
                      <Box mt={1}>
                        <ArtAssistantDebugPanel debug={message.debug} />
                      </Box>
                    )}
                </Box>
              )
            })}
          </Flex>
        </Box>
        <Box
          px={[2, 4]}
          pt={1}
          flexShrink={0}
          bg="mono0"
          style={{ paddingBottom: "max(16px, env(safe-area-inset-bottom))" }}
        >
          <Box maxWidth={900} mx="auto">
            <ArtAssistantComposer
              value={draft}
              onChange={setDraft}
              isResponding={conversation.isResponding}
              onSubmit={handleSubmit}
            />
            <Text variant="xxs" color="mono60" textAlign="center" mt={1}>
              Art Assistant can make mistakes. Double-check prices and
              availability.
            </Text>
          </Box>
        </Box>
      </Flex>
      {isHistoryOpen && (
        <Drawer open onClose={() => setIsHistoryOpen(false)} anchor="left">
          <Box width="min(340px, 100vw)" height="100%" overflowY="auto">
            <ModalClose onClick={() => setIsHistoryOpen(false)} />
            <ArtAssistantHistory {...historyProps} />
          </Box>
        </Drawer>
      )}
    </Flex>
  )
}

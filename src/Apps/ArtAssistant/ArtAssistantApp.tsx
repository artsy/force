import MenuIcon from "@artsy/icons/MenuIcon"
import {
  Box,
  Clickable,
  Drawer,
  Flex,
  ModalClose,
  Text,
  Toggle,
} from "@artsy/palette"
import { ArtAssistantComposer } from "Apps/ArtAssistant/Components/ArtAssistantComposer"
import { ArtAssistantCloseButton } from "Apps/ArtAssistant/Components/ArtAssistantCloseButton"
import { ArtAssistantDebugPanel } from "Apps/ArtAssistant/Components/ArtAssistantDebugPanel"
import { ArtAssistantEmptyState } from "Apps/ArtAssistant/Components/ArtAssistantEmptyState"
import { ArtAssistantHistory } from "Apps/ArtAssistant/Components/ArtAssistantHistory"
import { ArtAssistantMessage } from "Apps/ArtAssistant/Components/ArtAssistantMessage"
import { useArtAssistantConversation } from "Apps/ArtAssistant/hooks/useArtAssistantConversation"
import { useArtAssistantHistory } from "Apps/ArtAssistant/hooks/useArtAssistantHistory"
import { useArtAssistantViewport } from "Apps/ArtAssistant/hooks/useArtAssistantViewport"
import { useEnableArtAssistant } from "Apps/ArtAssistant/hooks/useEnableArtAssistant"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { Media } from "Utils/Responsive"
import { userIsAdmin } from "Utils/user"
import { HttpError } from "found"
import { useEffect, useRef, useState, type FC } from "react"
import { MetaTags } from "Components/MetaTags"
import type { ArtAssistantErrorAction } from "Apps/ArtAssistant/utils/artAssistantErrors"

export const ArtAssistantApp: FC = () => {
  const isEnabled = useEnableArtAssistant()
  const { user } = useSystemContext()
  if (!isEnabled || !user?.id) throw new HttpError(404)
  return <ArtAssistantChat key={user.id} userID={user.id} />
}

const ArtAssistantChat: FC<{ userID: string }> = ({ userID }) => {
  const { user } = useSystemContext()
  const isAdmin = userIsAdmin(user)
  const [isDebugEnabled, setIsDebugEnabled] = useState(false)
  const conversation = useArtAssistantConversation({ isDebugEnabled })
  const history = useArtAssistantHistory({ userID, ...conversation })
  const [draft, setDraft] = useState("")
  const [dismissedErrorID, setDismissedErrorID] = useState<string | null>(null)
  const composerRef = useRef<HTMLTextAreaElement | null>(null)
  const [isHistoryOpen, setIsHistoryOpen] = useState(false)
  const shouldFollowResponse = useRef(true)
  const scrollRef = useRef<HTMLDivElement | null>(null)
  const contentRef = useRef<HTMLDivElement | null>(null)
  const viewportRef = useArtAssistantViewport()

  // biome-ignore lint/correctness/useExhaustiveDependencies: Scroll after a new message or activity changes the layout.
  useEffect(() => {
    if (!shouldFollowResponse.current) return
    const element = scrollRef.current
    if (element) element.scrollTop = element.scrollHeight
  }, [conversation.messages])

  useEffect(() => {
    if (typeof ResizeObserver === "undefined" || !contentRef.current) return
    // Rails fetch after the terminal event and can change the answer's height again.
    const observer = new ResizeObserver(() => {
      const element = scrollRef.current
      if (element && shouldFollowResponse.current)
        element.scrollTop = element.scrollHeight
    })
    observer.observe(contentRef.current)
    return () => observer.disconnect()
  }, [])

  const handleSubmit = (text: string): boolean => {
    shouldFollowResponse.current = true
    return conversation.submit({ text })
  }
  const handleNewChat = (): void => {
    conversation.startNewConversation()
    setDraft("")
    setIsHistoryOpen(false)
    shouldFollowResponse.current = true
  }
  const handleErrorAction = ({
    action,
    messageID,
  }: {
    action: ArtAssistantErrorAction
    messageID: string
  }): void => {
    shouldFollowResponse.current = true
    switch (action) {
      case "retry":
        conversation.retry()
        return
      case "newChat":
        handleNewChat()
        return
      case "dismiss":
        setDismissedErrorID(messageID)
        composerRef.current?.focus()
        return
    }
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
    onNewChat: handleNewChat,
  }

  return (
    <Flex
      ref={viewportRef}
      height="100dvh"
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
          px={2}
          alignItems="center"
          justifyContent="space-between"
        >
          <Flex alignItems="center" gap={1}>
            <Media at="xs">
              <Clickable
                aria-label="Open chat history"
                display="flex"
                alignItems="center"
                justifyContent="center"
                width={44}
                height={44}
                onClick={() => setIsHistoryOpen(true)}
              >
                <MenuIcon width={22} height={22} aria-hidden />
              </Clickable>
            </Media>
          </Flex>
          <Flex alignItems="center" gap={1}>
            {isAdmin && (
              <Flex alignItems="center" gap={1}>
                <Text variant="xs">Debug {isDebugEnabled ? "on" : "off"}</Text>
                <Toggle
                  aria-label="Debug"
                  selected={isDebugEnabled}
                  onSelect={setIsDebugEnabled}
                />
              </Flex>
            )}
            <ArtAssistantCloseButton />
          </Flex>
        </Flex>
        <Box
          ref={scrollRef}
          flex={1}
          minHeight={0}
          overflowX="hidden"
          overflowY="auto"
          p={[2, 4]}
          onScroll={event => {
            const element = event.currentTarget
            shouldFollowResponse.current =
              element.scrollHeight - element.scrollTop - element.clientHeight <
              100
          }}
        >
          <Flex
            ref={contentRef}
            flexDirection="column"
            gap={[2, 4]}
            maxWidth={900}
            mx="auto"
          >
            {isAdmin &&
              isDebugEnabled &&
              !conversation.messages.some(
                message => message.role === "assistant" && message.debug,
              ) && (
                <Text variant="xs" color="mono60" role="note">
                  Send a new message to view agent debug. Debug data isn’t saved
                  in chat history.
                </Text>
              )}
            {!conversation.messages.length && (
              <ArtAssistantEmptyState
                onSuggestion={text => {
                  shouldFollowResponse.current = true
                  conversation.submit({ text })
                }}
              />
            )}
            {conversation.messages.map((message, index) => {
              return (
                <Box key={message.id}>
                  <ArtAssistantMessage
                    key={message.id}
                    message={message}
                    onErrorAction={
                      !conversation.isResponding &&
                      index === conversation.messages.length - 1 &&
                      message.id !== dismissedErrorID
                        ? action =>
                            handleErrorAction({ action, messageID: message.id })
                        : undefined
                    }
                    onSuggestedReply={
                      !conversation.isResponding &&
                      index === conversation.messages.length - 1
                        ? reply => {
                            shouldFollowResponse.current = true
                            conversation.submit({
                              text: reply,
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
              inputRef={composerRef}
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

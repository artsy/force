import MenuIcon from "@artsy/icons/MenuIcon"
import {
  Box,
  Clickable,
  Drawer,
  Flex,
  ModalClose,
  Text,
  VisuallyHidden,
} from "@artsy/palette"
import { ArtAssistantComposer } from "Apps/ArtAssistant/Components/ArtAssistantComposer"
import { ArtAssistantCloseButton } from "Apps/ArtAssistant/Components/ArtAssistantCloseButton"
import { ArtAssistantEmptyState } from "Apps/ArtAssistant/Components/ArtAssistantEmptyState"
import { ArtAssistantHistory } from "Apps/ArtAssistant/Components/ArtAssistantHistory"
import { ArtAssistantMessage } from "Apps/ArtAssistant/Components/ArtAssistantMessage"
import { useArtAssistantConversation } from "Apps/ArtAssistant/hooks/useArtAssistantConversation"
import { useArtAssistantHistory } from "Apps/ArtAssistant/hooks/useArtAssistantHistory"
import { useArtAssistantViewport } from "Apps/ArtAssistant/hooks/useArtAssistantViewport"
import { useEnableArtAssistant } from "Apps/ArtAssistant/hooks/useEnableArtAssistant"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { Media } from "Utils/Responsive"
import { HttpError } from "found"
import { useEffect, useRef, useState, type FC } from "react"
import { MetaTags } from "Components/MetaTags"
import type { ArtAssistantErrorAction } from "Apps/ArtAssistant/utils/artAssistantErrors"

export const ART_ASSISTANT_ANNOUNCEMENT_MS = 7_000

export const ArtAssistantApp: FC = () => {
  const isEnabled = useEnableArtAssistant()
  // Decided once per visit: the route re-checks the flag on every navigation, and a provider
  // poll flipping it mid-chat shouldn't swap an open conversation for a 404.
  const [isEnabledOnMount] = useState(isEnabled)
  const { user } = useSystemContext()
  if (!isEnabledOnMount || !user?.id) throw new HttpError(404)
  return <ArtAssistantChat key={user.id} userID={user.id} />
}

const ArtAssistantChat: FC<{ userID: string }> = ({ userID }) => {
  const conversation = useArtAssistantConversation()
  const history = useArtAssistantHistory({ userID, ...conversation })
  const [draft, setDraft] = useState("")
  const [dismissedErrorID, setDismissedErrorID] = useState<string | null>(null)
  const composerRef = useRef<HTMLTextAreaElement | null>(null)
  const [isHistoryOpen, setIsHistoryOpen] = useState(false)
  const shouldFollowResponse = useRef(true)
  const scrollRef = useRef<HTMLDivElement | null>(null)
  const contentRef = useRef<HTMLDivElement | null>(null)
  const viewportRef = useArtAssistantViewport()
  const latestMessage = conversation.messages[conversation.messages.length - 1]
  const completedAnswer =
    latestMessage?.role === "assistant" && latestMessage.phase === "complete"
      ? latestMessage
      : undefined
  const [announcement, setAnnouncement] = useState("")

  // Cleared after it's been read out, so reading the page in order doesn't repeat the answer.
  // biome-ignore lint/correctness/useExhaustiveDependencies: Announce each completed answer once.
  useEffect(() => {
    if (!completedAnswer) {
      setAnnouncement("")
      return
    }
    setAnnouncement(completedAnswer.text)
    const timeout = setTimeout(
      () => setAnnouncement(""),
      ART_ASSISTANT_ANNOUNCEMENT_MS,
    )
    return () => clearTimeout(timeout)
  }, [completedAnswer?.id])

  // biome-ignore lint/correctness/useExhaustiveDependencies: Scroll after a new message or activity changes the layout.
  useEffect(() => {
    if (!shouldFollowResponse.current) return
    const element = scrollRef.current
    if (element) element.scrollTop = element.scrollHeight
  }, [conversation.messages])

  useEffect(() => {
    if (
      typeof ResizeObserver === "undefined" ||
      !contentRef.current ||
      !scrollRef.current
    )
      return
    // Rails fetch after the terminal event and can change the answer's height again, and the
    // mobile keyboard or a growing composer shrinks the container without a scroll event.
    const observer = new ResizeObserver(() => {
      const element = scrollRef.current
      if (element && shouldFollowResponse.current)
        element.scrollTop = element.scrollHeight
    })
    observer.observe(contentRef.current)
    observer.observe(scrollRef.current)
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
      <VisuallyHidden>
        <h1>Art Assistant</h1>
      </VisuallyHidden>
      {/* The “Thinking…” status unmounts when a turn completes, so the answer is announced here. */}
      <VisuallyHidden aria-live="polite" data-testid="art-assistant-announcer">
        {announcement}
      </VisuallyHidden>
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
            {!conversation.messages.length && (
              <ArtAssistantEmptyState
                onSuggestion={text => {
                  handleSubmit(text)
                }}
              />
            )}
            {conversation.messages.map((message, index) => {
              const isLatestIdleMessage =
                !conversation.isResponding &&
                index === conversation.messages.length - 1
              return (
                <ArtAssistantMessage
                  key={message.id}
                  message={message}
                  onErrorAction={
                    isLatestIdleMessage && message.id !== dismissedErrorID
                      ? action =>
                          handleErrorAction({ action, messageID: message.id })
                      : undefined
                  }
                  onSuggestedReply={
                    isLatestIdleMessage
                      ? reply => {
                          handleSubmit(reply)
                        }
                      : undefined
                  }
                />
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

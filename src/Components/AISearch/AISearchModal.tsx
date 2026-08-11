import {
  Box,
  Flex,
  ModalBase,
  ModalClose,
  Text,
  useDidMount,
} from "@artsy/palette"
import { AISparklesIcon } from "Components/AISearch/AISparklesIcon"
import { AISearchComposer } from "Components/AISearch/Components/AISearchComposer"
import { AISearchConversation } from "Components/AISearch/Components/AISearchConversation"
import { AISearchSidebar } from "Components/AISearch/Components/AISearchSidebar"
import { useAISearchConversation } from "Components/AISearch/Hooks/useAISearchConversation"
import { type FC, useState } from "react"

export const AI_SEARCH_CLOSE_ANIMATION_DURATION = 200

interface AISearchModalProps {
  onClose: () => void
}

export const AISearchModal: FC<AISearchModalProps> = ({ onClose }) => {
  const isMounted = useDidMount()
  const [isClosing, setIsClosing] = useState(false)
  const [draft, setDraft] = useState("")

  const {
    conversationID,
    conversations,
    isResponding,
    loadConversation,
    messages,
    removeConversation,
    reset,
    submit,
  } = useAISearchConversation()

  const isVisible = isMounted && !isClosing

  const handleRequestClose = () => {
    setIsClosing(true)

    // Let the exit transition play out before ModalBase unmounts
    setTimeout(onClose, AI_SEARCH_CLOSE_ANIMATION_DURATION)
  }

  const handleNewSearch = () => {
    reset()
    setDraft("")
  }

  const handleConversationClick = (id: string) => {
    loadConversation(id)
    setDraft("")
  }

  return (
    <ModalBase
      onClose={handleRequestClose}
      dialogProps={{ width: "100%", height: "100%" }}
      style={{
        transition: `background-color ${AI_SEARCH_CLOSE_ANIMATION_DURATION}ms`,
        backgroundColor: isVisible ? "rgba(0, 0, 0, 0.5)" : "transparent",
      }}
    >
      <Flex
        width="100%"
        height="100%"
        bg="mono0"
        overflow="hidden"
        style={{
          transition: `opacity 150ms, transform ${AI_SEARCH_CLOSE_ANIMATION_DURATION}ms`,
          ...(isVisible
            ? { opacity: 1, transform: "translateY(0)" }
            : { opacity: 0, transform: "translateY(12px)" }),
        }}
      >
        <AISearchSidebar
          conversations={conversations}
          activeConversationID={conversationID}
          onConversationClick={handleConversationClick}
          onDeleteConversation={removeConversation}
          onNewSearchClick={handleNewSearch}
        />

        <Flex flexDirection="column" flex={1} minWidth={0} height="100%">
          <Flex
            alignItems="center"
            justifyContent="space-between"
            borderBottom="1px solid"
            borderColor="mono10"
            pl={4}
            flexShrink={0}
          >
            <Flex alignItems="center" color="mono60">
              <AISparklesIcon />

              <Text variant="sm-display" color="mono100" ml={1}>
                Artsy AI search
              </Text>
            </Flex>

            <ModalClose onClick={handleRequestClose} />
          </Flex>

          <Box flex={1} overflowY="auto" px={4} py={4}>
            <Box maxWidth={1200} mx="auto" height="100%">
              <AISearchConversation
                messages={messages}
                onSuggestionClick={setDraft}
              />
            </Box>
          </Box>

          <Box px={4} pb={4} flexShrink={0}>
            <Box maxWidth={1200} mx="auto">
              <AISearchComposer
                value={draft}
                isDisabled={isResponding}
                onChange={setDraft}
                onSubmit={submit}
              />

              <Text variant="xs" color="mono60" textAlign="center" mt={1}>
                Artsy AI can make mistakes — double-check prices and
                availability.
              </Text>
            </Box>
          </Box>
        </Flex>
      </Flex>
    </ModalBase>
  )
}

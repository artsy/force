import { Box, Button, Flex, Text } from "@artsy/palette"
import { ArtAssistantArtistRail } from "Apps/ArtAssistant/Components/ArtAssistantArtistRail"
import { ArtAssistantArtworkRail } from "Apps/ArtAssistant/Components/ArtAssistantArtworkRail"
import type { ArtAssistantMessage as Message } from "Apps/ArtAssistant/types"
import type { FC } from "react"

interface ArtAssistantMessageProps {
  message: Message
  onSuggestedReply?: (
    reply: string,
    position: number,
    messageID: string,
  ) => void
}

export const ArtAssistantMessage: FC<ArtAssistantMessageProps> = ({
  message,
  onSuggestedReply,
}) => {
  if (message.role === "assistant" && message.phase === "responding") {
    return (
      <Text as="output" aria-live="polite" variant="sm" color="mono60">
        {message.activity ?? "Thinking…"}
      </Text>
    )
  }
  const isUser = message.role === "user"
  return (
    <Flex
      flexDirection="column"
      alignItems={isUser ? "flex-end" : "flex-start"}
      gap={[2, 4]}
    >
      <Text
        variant="sm"
        bg={isUser ? "mono100" : "mono10"}
        color={isUser ? "mono0" : "mono100"}
        p={2}
        borderRadius="15px"
        maxWidth={["100%", "85%"]}
        style={{ whiteSpace: "pre-wrap", overflowWrap: "anywhere" }}
        role={
          message.role === "assistant" && message.phase === "error"
            ? "alert"
            : undefined
        }
      >
        {message.text}
      </Text>
      {message.role === "assistant" &&
        message.sections?.map((section, index) => {
          return (
            <Box width="100%" minWidth={0} key={`${message.id}-${index}`}>
              {section.type === "artworks" ? (
                <ArtAssistantArtworkRail ids={section.ids} />
              ) : (
                <ArtAssistantArtistRail ids={section.ids} />
              )}
            </Box>
          )
        })}
      {message.role === "assistant" &&
        message.phase === "complete" &&
        onSuggestedReply && (
          <Flex flexWrap="wrap" gap={1} maxWidth="100%" minWidth={0}>
            {message.suggestedReplies?.map((reply, index) => {
              return (
                <Button
                  key={`${index}-${reply}`}
                  variant="secondaryNeutral"
                  size="small"
                  maxWidth="100%"
                  height="auto"
                  minHeight={32}
                  py={0.5}
                  style={{ whiteSpace: "normal", overflowWrap: "anywhere" }}
                  onClick={() => onSuggestedReply(reply, index, message.id)}
                >
                  {reply}
                </Button>
              )
            })}
          </Flex>
        )}
    </Flex>
  )
}

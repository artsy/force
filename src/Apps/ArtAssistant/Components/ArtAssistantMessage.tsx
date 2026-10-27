import { Box, Button, Flex, Text } from "@artsy/palette"
import { ArtAssistantAttachedImage } from "Apps/ArtAssistant/Components/ArtAssistantAttachedImage"
import { ArtAssistantArtistRail } from "Apps/ArtAssistant/Components/ArtAssistantArtistRail"
import { ArtAssistantArtworkRail } from "Apps/ArtAssistant/Components/ArtAssistantArtworkRail"
import type { ArtAssistantMessage as Message } from "Apps/ArtAssistant/types"
import type { FC } from "react"
import { ArtAssistantErrorActions } from "Apps/ArtAssistant/Components/ArtAssistantErrorActions"
import type { ArtAssistantErrorAction } from "Apps/ArtAssistant/utils/artAssistantErrors"

interface ArtAssistantMessageProps {
  message: Message
  onErrorAction?: (action: ArtAssistantErrorAction) => void
  onSuggestedReply?: (
    reply: string,
    position: number,
    messageID: string,
  ) => void
}

export const ArtAssistantMessage: FC<ArtAssistantMessageProps> = ({
  message,
  onSuggestedReply,
  onErrorAction,
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
      {message.role === "user" && message.image && (
        <ArtAssistantAttachedImage image={message.image} />
      )}
      {(!isUser || message.text) && (
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
      )}
      {message.role === "assistant" && message.error && onErrorAction && (
        <ArtAssistantErrorActions
          error={message.error}
          onSelect={onErrorAction}
        />
      )}
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

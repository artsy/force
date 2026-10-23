import SparklesMessageIcon from "@artsy/icons/SparklesMessageIcon"
import { Button, Flex, Text } from "@artsy/palette"
import type { FC } from "react"

export const ART_ASSISTANT_SUGGESTIONS = [
  "Something similar to my taste, check out my saves for inspiration",
  "Large black and white paintings under $5K",
  "What’s trending right now",
]

export const ArtAssistantEmptyState: FC<{
  onSuggestion: (text: string, position: number) => void
}> = ({ onSuggestion }) => {
  return (
    <Flex flexDirection="column" gap={2} py={[2, 6]} maxWidth={600} mx="auto">
      <Flex alignItems="center" justifyContent="center" gap={1}>
        <SparklesMessageIcon fill="mono60" />
        <Text variant="sm" color="mono60">
          Art Assistant
        </Text>
        <Text
          variant="xs"
          color="mono0"
          bg="blue100"
          px={1}
          borderRadius="15px"
        >
          Beta
        </Text>
      </Flex>
      <Text variant="lg-display" textAlign="center">
        What are you looking for?
      </Text>
      <Text variant="sm" color="mono60" textAlign="center">
        Describe it the way you’d describe it to a friend — medium, mood, color,
        budget. I’ll do the filtering.
      </Text>
      {ART_ASSISTANT_SUGGESTIONS.map((suggestion, index) => {
        return (
          <Button
            key={suggestion}
            variant="secondaryNeutral"
            width="100%"
            height="auto"
            minHeight={56}
            py={1}
            onClick={() => onSuggestion(suggestion, index)}
          >
            <Text variant="sm" style={{ whiteSpace: "normal" }}>
              {suggestion}
            </Text>
          </Button>
        )
      })}
    </Flex>
  )
}

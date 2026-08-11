import { Box, Clickable, Flex, Stack, Text } from "@artsy/palette"
import { themeGet } from "@styled-system/theme-get"
import { AISparklesIcon } from "Components/AISearch/AISparklesIcon"
import { AI_SEARCH_SUGGESTIONS } from "Components/AISearch/Utils/aiSearchSuggestions"
import type { FC } from "react"
import styled from "styled-components"

interface AISearchEmptyStateProps {
  onSuggestionClick: (suggestion: string) => void
}

export const AISearchEmptyState: FC<AISearchEmptyStateProps> = ({
  onSuggestionClick,
}) => {
  return (
    <Flex
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100%"
      textAlign="center"
    >
      <Box color="mono60">
        <AISparklesIcon width={32} height={32} />
      </Box>

      <Text variant="lg-display" mt={2}>
        What are you looking for?
      </Text>

      <Text variant="sm-display" color="mono60" mt={1} maxWidth={480}>
        Describe it the way you’d describe it to a friend — medium, mood,
        colour, budget. I’ll do the filtering.
      </Text>

      <Stack gap={1} mt={4} width="100%" maxWidth={520}>
        {AI_SEARCH_SUGGESTIONS.map(suggestion => {
          return (
            <Suggestion
              key={suggestion}
              onClick={() => {
                onSuggestionClick(suggestion)
              }}
            >
              <Text variant="sm-display" textAlign="left">
                {suggestion}
              </Text>
            </Suggestion>
          )
        })}
      </Stack>
    </Flex>
  )
}

const Suggestion = styled(Clickable)`
  width: 100%;
  padding: ${themeGet("space.1")} ${themeGet("space.2")};
  border: 1px solid ${themeGet("colors.mono10")};
  border-radius: 20px;
  transition: border-color 150ms;

  &:hover,
  &:focus-visible {
    border-color: ${themeGet("colors.mono60")};
  }
`

import { Box, Flex, Text } from "@artsy/palette"
import { AISparklesIcon } from "Components/AISearch/AISparklesIcon"
import { AISearchArtistsRail } from "Components/AISearch/Components/AISearchArtistsRail"
import {
  AISearchArtworksRail,
  AISearchArtworksRailPlaceholder,
} from "Components/AISearch/Components/AISearchArtworksRail"
import { AISearchResultFooter } from "Components/AISearch/Components/AISearchResultFooter"
import { AISearchStatusList } from "Components/AISearch/Components/AISearchStatusList"
import type { AISearchMessage as AISearchMessageType } from "Components/AISearch/Hooks/useAISearchConversation"
import { getAISearchViewAll } from "Components/AISearch/Utils/aiSearchViewAllHref"
import type { FC } from "react"

const ARTWORKS_RAIL_TITLE = "Works from the results"

interface AISearchMessageProps {
  message: AISearchMessageType
}

export const AISearchMessage: FC<AISearchMessageProps> = ({ message }) => {
  if (message.role === "USER") {
    return (
      <Flex justifyContent="flex-end">
        <Box bg="mono5" borderRadius={12} py={1} px={2} maxWidth="80%">
          <Text variant="sm-display">{message.text}</Text>
        </Box>
      </Flex>
    )
  }

  const {
    artistIDs,
    artworkIDs,
    artworkFilters,
    debugEntries,
    errorMessage,
    isPreparingArtworkResults,
    phase,
    text,
  } = message

  const viewAll = phase === "RESULT" ? getAISearchViewAll(artworkFilters) : null

  const hasArtworksRail = phase === "RESULT" && artworkIDs.length > 0

  return (
    <Flex>
      <Box color="mono60" mr={1} mt="2px" flexShrink={0}>
        <AISparklesIcon />
      </Box>

      <Box flex={1} minWidth={0}>
        {phase === "THINKING" && (
          <AISearchStatusList activity={message.activity} />
        )}

        {!!text && (
          <Text variant="sm-display" mt={2} style={{ whiteSpace: "pre-wrap" }}>
            {text}
          </Text>
        )}

        {phase === "STREAMING" && isPreparingArtworkResults && (
          <Box mt={4}>
            <AISearchArtworksRailPlaceholder title={ARTWORKS_RAIL_TITLE} />
          </Box>
        )}

        {phase === "ERROR" && !!errorMessage && (
          <Text variant="sm-display" color="red100" mt={2}>
            {errorMessage}
          </Text>
        )}

        {hasArtworksRail && (
          <Box mt={4}>
            <AISearchArtworksRail
              artworkIDs={artworkIDs}
              title={ARTWORKS_RAIL_TITLE}
              debugEntries={debugEntries}
            />
          </Box>
        )}

        {!!viewAll && (
          <Box mt={2}>
            <AISearchResultFooter href={viewAll.href} label={viewAll.label} />
          </Box>
        )}

        {phase === "RESULT" && artistIDs.length > 0 && (
          <Box mt={4}>
            <AISearchArtistsRail
              artistIDs={artistIDs}
              title="Artists to explore"
            />
          </Box>
        )}
      </Box>
    </Flex>
  )
}

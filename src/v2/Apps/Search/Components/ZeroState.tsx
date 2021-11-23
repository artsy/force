import { Box, Flex, Text } from "@artsy/palette"
import { SendFeedback } from "v2/Apps/Search/Components/SendFeedback"
import { useArtworkFilterContext } from "v2/Components/ArtworkFilter/ArtworkFilterContext"
import { FC } from "react"

interface ZeroStateProps {
  term: string
}

export const ZeroState: FC<ZeroStateProps> = props => {
  const {
    hasFilters,
    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
    filters: { term = props.term },
  } = useArtworkFilterContext()

  return (
    <Flex
      width="100%"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Box m={3} textAlign="center">
        <Text variant="subtitle" mb={1}>
          {hasFilters
            ? "No results found."
            : `No results found for \u201C${term}\u201D.`}
        </Text>
        <Text variant="text">
          {hasFilters
            ? "Try removing some filters or try another search term."
            : "Try checking for spelling errors or try another search term."}
        </Text>
      </Box>
      <Box width="100%">
        <SendFeedback />
      </Box>
    </Flex>
  )
}

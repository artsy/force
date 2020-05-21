import { Box, Flex, Serif } from "@artsy/palette"
import { SendFeedback } from "v2/Apps/Search/Components/SendFeedback"
import { useArtworkFilterContext } from "v2/Components/v2/ArtworkFilter/ArtworkFilterContext"
import React, { FC } from "react"

interface ZeroStateProps {
  term: string
}

export const ZeroState: FC<ZeroStateProps> = props => {
  const {
    hasFilters,
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
        <Serif size="6">
          {hasFilters ? "No results found." : `No results found for "${term}".`}
        </Serif>
        <Serif size="3">
          {hasFilters
            ? "Try removing some filters or try another search term."
            : "Try checking for spelling errors or try another search term."}
        </Serif>
      </Box>
      <Box width="100%">
        <SendFeedback />
      </Box>
    </Flex>
  )
}

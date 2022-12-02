import { Box, Spacer, Text } from "@artsy/palette"
import { SearchInputContainer } from "Components/Search/SearchInputContainer"
import { useState, useCallback } from "react"

export const MyCollectionInsightsSelectArtistModal: React.FC = () => {
  const [query, setQuery] = useState("")

  const handleChange = useCallback(event => {
    setQuery(event.target.value)
  }, [])

  return (
    <Box>
      <Text variant={["lg-display", "lg"]}>Select Artist</Text>

      <Spacer y={[2, 4]} />

      <SearchInputContainer
        value={query}
        onChange={handleChange}
        placeholder="Search for artists in your collection"
      />

      <Spacer y={[2, 4]} />

      <Box>
        <Text variant={["sm-display", "md"]}>
          Insights currently unavailable
        </Text>
      </Box>
    </Box>
  )
}

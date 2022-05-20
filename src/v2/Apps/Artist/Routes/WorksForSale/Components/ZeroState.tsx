import { Box, Message, Text } from "@artsy/palette"
import { isEmpty } from "lodash"
import { useArtworkFilterContext } from "v2/Components/ArtworkFilter/ArtworkFilterContext"
import { ArtworkGridEmptyState } from "v2/Components/ArtworkGrid/ArtworkGridEmptyState"
import { Sticky } from "v2/Components/Sticky"

export const ZeroState: React.FC = () => {
  const { selectedFiltersCounts, resetFilters } = useArtworkFilterContext()
  const hasAppliedFilters = !isEmpty(selectedFiltersCounts)

  if (hasAppliedFilters) {
    return <ArtworkGridEmptyState onClearFilters={resetFilters} />
  }

  return (
    <Box width="100%" my={1}>
      <Sticky>
        {({ stuck }) => {
          return (
            <Box pt={stuck ? 1 : 0}>
              <Message>
                <Text>No works available by the artist at this time</Text>
                <Text textColor="black60">
                  Create an Alert to receive notifications when new works are
                  added
                </Text>
              </Message>
            </Box>
          )
        }}
      </Sticky>
    </Box>
  )
}

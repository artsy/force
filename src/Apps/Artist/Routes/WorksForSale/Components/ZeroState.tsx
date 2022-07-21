import { Box, BoxProps, Message } from "@artsy/palette"
import { isEmpty } from "lodash"
import { useArtworkFilterContext } from "Components/ArtworkFilter/ArtworkFilterContext"
import { ArtworkGridEmptyState } from "Components/ArtworkGrid/ArtworkGridEmptyState"
import { Sticky } from "Components/Sticky"

export const ZeroState: React.FC<BoxProps> = props => {
  const { selectedFiltersCounts, resetFilters } = useArtworkFilterContext()
  const hasAppliedFilters = !isEmpty(selectedFiltersCounts)

  if (hasAppliedFilters) {
    return <ArtworkGridEmptyState onClearFilters={resetFilters} {...props} />
  }

  return (
    <Box width="100%" {...props}>
      <Sticky>
        {({ stuck }) => {
          return (
            <Box pt={stuck ? 1 : 0}>
              <Message title="No works available by the artist at this time">
                Create an Alert to receive notifications when new works are
                added
              </Message>
            </Box>
          )
        }}
      </Sticky>
    </Box>
  )
}

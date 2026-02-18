import { Box, type BoxProps, Message } from "@artsy/palette"
import { useArtworkFilterContext } from "Components/ArtworkFilter/ArtworkFilterContext"
import { ArtworkGridEmptyState } from "Components/ArtworkGrid/ArtworkGridEmptyState"
import isEmpty from "lodash/isEmpty"
export const ZeroState: React.FC<React.PropsWithChildren<BoxProps>> = props => {
  const { selectedFiltersCounts, resetFilters } = useArtworkFilterContext()
  const hasAppliedFilters = !isEmpty(selectedFiltersCounts)

  if (hasAppliedFilters) {
    return <ArtworkGridEmptyState onClearFilters={resetFilters} {...props} />
  }

  return (
    <Box width="100%" {...props}>
      <Message title="No works available by the artist at this time">
        Create an Alert to receive notifications when new works are added
      </Message>
    </Box>
  )
}

import { Box, Flex, Spacer, Text } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { InsightsOverview_info$data } from "__generated__/InsightsOverview_info.graphql"

interface InsightsOverviewProps {
  info: InsightsOverview_info$data
}

const InsightsOverview: React.FC<InsightsOverviewProps> = ({ info }) => {
  if (!info) {
    return null
  }

  const { artistsCount, artworksCount } = info

  return (
    <Flex mt={[2, 4]}>
      <Box minWidth={[150, 290]}>
        <Text variant={["xs", "sm-display"]} mb={[0, 0.5]}>
          Total Artists
        </Text>
        <Text variant={["lg-display", "xl"]} color="blue100">
          {artistsCount}
        </Text>
      </Box>

      <Spacer x={2} y={2} />

      <Box minWidth={[150, 290]}>
        <Text variant={["xs", "sm-display"]} mb={[0, 0.5]}>
          Total Artworks
        </Text>
        <Text variant={["lg-display", "xl"]} color="blue100">
          {artworksCount}
        </Text>
      </Box>
    </Flex>
  )
}

export const InsightsOverviewFragmentContainer = createFragmentContainer(
  InsightsOverview,
  {
    info: graphql`
      fragment InsightsOverview_info on MyCollectionInfo {
        artworksCount
        artistsCount
      }
    `,
  }
)

import { Box, Flex, Spacer, Text } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { InsightsOverview_info } from "__generated__/InsightsOverview_info.graphql"

interface InsightsOverviewProps {
  info: InsightsOverview_info
}

const InsightsOverview: React.FC<InsightsOverviewProps> = ({ info }) => {
  const { artistsCount, artworksCount } = info

  return (
    <Flex>
      <Box minWidth={290}>
        <Text variant={"sm-display"} mb={0.5}>
          Total Artists
        </Text>
        <Text variant={"xl"} color="blue100">
          {artistsCount}
        </Text>
      </Box>

      <Spacer m={2} />

      <Box minWidth={290}>
        <Text variant={"sm-display"} mb={0.5}>
          Total Artworks
        </Text>
        <Text variant={"xl"} color="blue100">
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

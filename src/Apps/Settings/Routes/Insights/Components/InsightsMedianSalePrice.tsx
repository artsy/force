import { Box, Flex, Text } from "@artsy/palette"
import { EntityHeaderArtistFragmentContainer } from "Components/EntityHeaders/EntityHeaderArtist"
import { groupBy } from "lodash"
import { createFragmentContainer, graphql } from "react-relay"
import { extractNodes } from "Utils/extractNodes"
import { InsightsMedianSalePrice_me$data } from "__generated__/InsightsMedianSalePrice_me.graphql"

interface InsightsMedianSalePriceProps {
  me: InsightsMedianSalePrice_me$data
}

const InsightsMedianSalePrice: React.FC<InsightsMedianSalePriceProps> = ({
  me,
}) => {
  const medianSalePrices = extractNodes(me.medianSalePrices)

  if (!medianSalePrices.length) {
    return null
  }

  const groupedMedianSalePrices = Object.values(
    groupBy(medianSalePrices, msp => msp?.artist?.internalID)
  )

  return (
    <Box>
      <Text variant="md">Median Auction Price in the Last 3 Years</Text>
      {groupedMedianSalePrices.map(msps => {
        const [artistData] = msps

        return (
          <Flex mt={2}>
            <EntityHeaderArtistFragmentContainer
              flex={1}
              alignItems="flex-start"
              artist={artistData.artist!}
              displayLink={false}
              // to hide the follow button
              FollowButton={<></>}
            />

            <Flex flex={1} flexDirection="column">
              {msps.map(msp => {
                return (
                  <Flex minHeight={45} alignItems="center">
                    <Text variant="sm" color="black60" minWidth={200} mr={2}>
                      {msp.mediumType?.name}
                    </Text>
                    <Text variant="sm" fontWeight="bold">
                      {msp.marketPriceInsights?.medianSalePriceDisplayText}
                    </Text>
                  </Flex>
                )
              })}
            </Flex>
          </Flex>
        )
      })}
    </Box>
  )
}

export const InsightsMedianSalePriceFragmentContainer = createFragmentContainer(
  InsightsMedianSalePrice,
  {
    me: graphql`
      fragment InsightsMedianSalePrice_me on Me {
        medianSalePrices: myCollectionConnection(
          first: 3
          sortByLastAuctionResultDate: true
        ) {
          edges {
            node {
              internalID
              medium
              mediumType {
                name
              }
              title
              artist {
                internalID
                ...EntityHeaderArtist_artist
              }
              marketPriceInsights {
                medianSalePriceDisplayText
              }
            }
          }
        }
      }
    `,
  }
)

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

  // Grouping median sale prices by artist id to array of arrays
  const groupedMedianSalePrices = Object.values(
    groupBy(
      medianSalePrices,
      medianSalePrice => medianSalePrice?.artist?.internalID
    )
  )

  return (
    <Box>
      <Text variant={["sm-display", "md"]}>
        Median Auction Price in the Last 3 Years
      </Text>

      {groupedMedianSalePrices.map(artistMedianSalePrices => {
        const [firstElement] = artistMedianSalePrices

        return (
          <Flex mt={2} mb={[4, 0]} flexDirection={["column", "row"]}>
            <EntityHeaderArtistFragmentContainer
              flex={1}
              alignItems="flex-start"
              artist={firstElement.artist!}
              displayLink={false}
              // added this to hide the follow button
              FollowButton={<></>}
            />

            <Flex flex={1} flexDirection="column">
              {artistMedianSalePrices.map(medianSalePrice => {
                return (
                  <Flex
                    mt={[2, 0]}
                    minHeight={[0, 45]}
                    alignItems="center"
                    justifyContent={["space-between", null]}
                  >
                    <Text
                      variant={["xs", "sm"]}
                      color="black60"
                      minWidth={[0, 200]}
                      mr={2}
                    >
                      {medianSalePrice.mediumType?.name}
                    </Text>
                    <Text variant={["xs", "sm"]} fontWeight="bold">
                      {
                        medianSalePrice.marketPriceInsights
                          ?.medianSalePriceDisplayText
                      }
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

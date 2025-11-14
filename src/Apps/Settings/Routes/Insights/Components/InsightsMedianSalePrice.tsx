import { Box, Clickable, Flex, Join, Spacer, Text } from "@artsy/palette"
import { themeGet } from "@styled-system/theme-get"
import { EntityHeaderArtistFragmentContainer } from "Components/EntityHeaders/EntityHeaderArtist"
import { useFlag } from "System/FeatureFlags/useFlag"
import { useRouter } from "System/Hooks/useRouter"
import { extractNodes } from "Utils/extractNodes"
import type { InsightsMedianSalePrice_me$data } from "__generated__/InsightsMedianSalePrice_me.graphql"
import { groupBy } from "lodash"
import { Fragment } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import styled from "styled-components"

interface InsightsMedianSalePriceProps {
  me: InsightsMedianSalePrice_me$data
}

const InsightsMedianSalePrice: React.FC<
  React.PropsWithChildren<InsightsMedianSalePriceProps>
> = ({ me }) => {
  const medianSalePrices = extractNodes(me.medianSalePrices)

  if (!medianSalePrices.length) {
    return null
  }

  // Grouping median sale prices by artist id to array of arrays
  const groupedMedianSalePrices = Object.values(
    groupBy(
      medianSalePrices,
      medianSalePrice => medianSalePrice?.artist?.internalID,
    ),
  )

  return (
    <Box>
      <Text variant={["sm-display", "md"]}>
        Median Auction Price in the Last 3 Years
      </Text>

      <Spacer y={1} />

      <Join separator={<Spacer y={1} />}>
        {groupedMedianSalePrices.map(artistMedianSalePrices => {
          const [firstElement] = artistMedianSalePrices

          if (
            !firstElement.artist ||
            !firstElement.artist.internalID ||
            !firstElement.mediumType?.name
          )
            return null

          return (
            <ArtistRowWrapper
              artistID={firstElement.artist.internalID}
              medium={firstElement.mediumType?.name}
              key={firstElement.artist.internalID}
            >
              <Flex py={1} mb={[4, 0]} flexDirection={["column", "row"]}>
                <EntityHeaderArtistFragmentContainer
                  flex={1}
                  alignItems="flex-start"
                  artist={firstElement.artist}
                  displayLink={false}
                  // added this to hide the follow button
                  FollowButton={<></>}
                />

                <Flex flex={1} flexDirection="column">
                  {artistMedianSalePrices.map((medianSalePrice, index) => {
                    return (
                      <Flex
                        mt={[2, 0]}
                        minHeight={[0, 45]}
                        alignItems="center"
                        justifyContent={["space-between", null]}
                        key={[firstElement.artist?.internalID, index].join("-")}
                      >
                        <Text
                          variant={["xs", "sm"]}
                          color="mono60"
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
            </ArtistRowWrapper>
          )
        })}
      </Join>
    </Box>
  )
}

const ArtistRowWrapper: React.FC<
  React.PropsWithChildren<{
    artistID: string
    children: JSX.Element
    medium: string
  }>
> = ({ artistID, children, medium }) => {
  const { router } = useRouter()

  const enableMedianSalePriceGraphScreen = useFlag(
    "my-collection-web-phase-7-median-sale-price-graph",
  )

  if (enableMedianSalePriceGraphScreen) {
    return (
      <ClickableArtistRow
        onClick={() =>
          router.push(
            `/collector-profile/my-collection/median-sale-price-at-auction/${artistID}?medium=${medium}`,
          )
        }
      >
        {children}
      </ClickableArtistRow>
    )
  }
  return <Fragment>{children}</Fragment>
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
              artist(shallow: true) {
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
  },
)

const ClickableArtistRow = styled(Clickable)`
  &:hover {
    background-color: ${themeGet("colors.mono5")};
  }
  width: 100%;
`

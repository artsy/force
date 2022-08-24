import {
  Column,
  DecreaseIcon,
  Flex,
  GridColumns,
  IncreaseIcon,
  Spacer,
  Text,
} from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { Media } from "Utils/Responsive"
import { MyCollectionArtworkArtistMarket_marketPriceInsights } from "__generated__/MyCollectionArtworkArtistMarket_marketPriceInsights.graphql"

export const MyCollectionArtworkArtistMarket = ({
  marketPriceInsights,
}: {
  marketPriceInsights: MyCollectionArtworkArtistMarket_marketPriceInsights
}) => {
  if (!marketPriceInsights) {
    return null
  }

  const {
    annualValueSoldDisplayText,
    liquidityRankDisplayText,
    annualLotsSold,
    medianSaleOverEstimatePercentage,
    sellThroughRate,
  } = marketPriceInsights

  const formattedSellThroughRate = (Number(sellThroughRate) * 100).toFixed(2)

  return (
    <>
      <Text variant="lg-display">Artist Market</Text>
      <Text variant={["xs", "md"]} color="black60">
        Based on the last 36 months of auction sale data from top commercial
        auction houses.
      </Text>

      <Spacer mt={[2, 6]} />

      <GridColumns>
        {!!annualValueSoldDisplayText && (
          <InsightColumn
            name="Annual Value Sold"
            value={annualValueSoldDisplayText}
          />
        )}
        {annualLotsSold !== null && (
          <InsightColumn
            name="Annual Lots Sold"
            value={annualLotsSold.toString()}
          />
        )}
        {
          <InsightColumn
            name="Sell-through Rate"
            value={formattedSellThroughRate + "%"}
          />
        }

        {!!medianSaleOverEstimatePercentage && (
          <Column span={[6, 4, 2]}>
            <Flex flexDirection={"column"} justifyContent="flex-start">
              <Text variant={["xs", "md", "md"]}>Sale Price to Estimate</Text>
              <SalePriceEstimatePerformance
                value={medianSaleOverEstimatePercentage}
              />
            </Flex>
          </Column>
        )}

        {!!liquidityRankDisplayText && (
          <InsightColumn name="Liquidity" value={liquidityRankDisplayText} />
        )}
      </GridColumns>
    </>
  )
}

const InsightColumn = ({ name, value }: { name: string; value: string }) => {
  return (
    <Column span={[6, 4, 2]}>
      <Flex flexDirection={"column"} justifyContent="flex-start">
        <Text variant={["xs", "md", "md"]}>{name}</Text>
        <Text variant={["lg", "xl", "xl"]}>{value}</Text>
      </Flex>
    </Column>
  )
}

const SalePriceEstimatePerformance = ({ value }: { value: number }) => {
  const sign = value < 0 ? "down" : "up"
  const color = sign === "up" ? "green100" : "red100"
  const Arrow = sign === "up" ? IncreaseIcon : DecreaseIcon

  return (
    <Flex flexDirection="row" alignItems="baseline">
      <Media at="xs">
        <Arrow fill={color} width={15} height={15} />
      </Media>
      <Media greaterThan="xs">
        <Arrow fill={color} width={25} height={25} />
      </Media>

      <Spacer mr={1} />

      <Text variant={["lg", "xl", "xl"]} fontWeight="medium" color={color}>
        {Math.abs(value)}%
      </Text>
    </Flex>
  )
}

export const MyCollectionArtworkArtistMarketFragmentContainer = createFragmentContainer(
  MyCollectionArtworkArtistMarket,
  {
    marketPriceInsights: graphql`
      fragment MyCollectionArtworkArtistMarket_marketPriceInsights on ArtworkPriceInsights {
        annualLotsSold
        annualValueSoldDisplayText
        medianSaleOverEstimatePercentage
        liquidityRankDisplayText
        sellThroughRate
      }
    `,
  }
)

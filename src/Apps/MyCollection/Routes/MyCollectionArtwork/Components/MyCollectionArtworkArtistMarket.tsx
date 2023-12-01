import {
  Clickable,
  Column,
  Flex,
  GridColumns,
  Spacer,
  Text,
  Tooltip,
} from "@artsy/palette"
import { formatSellThroughRate } from "Apps/Artwork/Utils/insightHelpers"
import { createFragmentContainer, graphql } from "react-relay"
import { Media } from "Utils/Responsive"
import { MyCollectionArtworkArtistMarket_marketPriceInsights$data } from "__generated__/MyCollectionArtworkArtistMarket_marketPriceInsights.graphql"
import InfoIcon from "@artsy/icons/InfoIcon"
import ArrowUpIcon from "@artsy/icons/ArrowUpIcon"
import ArrowDownIcon from "@artsy/icons/ArrowDownIcon"

export const MyCollectionArtworkArtistMarket = ({
  marketPriceInsights,
}: {
  marketPriceInsights: MyCollectionArtworkArtistMarket_marketPriceInsights$data
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

  return (
    <>
      <Media greaterThanOrEqual="sm">
        <Text variant="md">Artist Market</Text>

        <Text variant="sm-display" color="black60">
          Based on the last 36 months of auction sale data from top commercial
          auction houses.
        </Text>
      </Media>

      <Media lessThan="sm">
        <Flex>
          <Text variant="sm-display">Artist Market</Text>

          <Tooltip
            placement="top-start"
            content="These statistics are based on the last 36 months of auction sale data from top commercial auction houses."
          >
            <Clickable ml={0.5} style={{ lineHeight: 0 }}>
              <InfoIcon />
            </Clickable>
          </Tooltip>
        </Flex>
        <Text variant="xs" color="black60">
          Based on the last 36 months of auction data
        </Text>
      </Media>

      <Spacer y={[2, 4]} />

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
            value={annualLotsSold?.toString() as string}
          />
        )}
        {
          <InsightColumn
            name="Sell-through Rate"
            value={formatSellThroughRate(sellThroughRate)}
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

const InsightColumn = ({
  name,
  value,
}: {
  name: string | null | undefined
  value: string | null | undefined
}) => {
  return (
    <Column span={[6, 4, 2]}>
      <Flex flexDirection={"column"} justifyContent="flex-start">
        <Text variant={["xs", "sm-display"]}>{name}</Text>
        <Text variant={["lg", "xl"]}>{value}</Text>
      </Flex>
    </Column>
  )
}

const SalePriceEstimatePerformance = ({ value }: { value: number }) => {
  const sign = value < 0 ? "down" : "up"
  const color = sign === "up" ? "green100" : "red100"
  const Arrow = sign === "up" ? ArrowUpIcon : ArrowDownIcon

  return (
    <Flex flexDirection="row" alignItems="baseline">
      <Media at="xs">
        <Arrow fill={color} width={15} height={15} />
      </Media>
      <Media greaterThan="xs">
        <Arrow fill={color} width={25} height={25} />
      </Media>

      <Spacer x={1} />

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

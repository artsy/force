import {
  Box,
  Column,
  DecreaseIcon,
  GridColumns,
  IncreaseIcon,
  Join,
  Select,
  Spacer,
  Text,
} from "@artsy/palette"
import React, { useRef, useState } from "react"
import { createFragmentContainer, graphql, QueryRenderer } from "react-relay"
import { useTracking } from "react-tracking"
import RelayModernEnvironment from "relay-runtime/lib/store/RelayModernEnvironment"
import { extractNodes } from "v2/Utils/extractNodes"
import { MarketStats_priceInsightsConnection } from "v2/__generated__/MarketStats_priceInsightsConnection.graphql"

interface MarketStatsProps {
  priceInsightsConnection: MarketStats_priceInsightsConnection
}

export const MarketStats: React.FC<MarketStatsProps> = ({
  priceInsightsConnection,
}) => {
  console.log("CONNECTION:", priceInsightsConnection)
  const { trackEvent } = useTracking()

  const priceInsights = extractNodes(priceInsightsConnection)

  if (priceInsights.length === 0) {
    return <div></div>
  }

  const [selectedPriceInsight, setSelectedPriceInsight] = useState(
    priceInsights[0]
  )

  const mediumOptions = useRef<Array<{ value: string; text: string }>>(
    priceInsights
      .filter(pI => pI.medium)
      .map(priceInsight => ({
        value: priceInsight.medium as string,
        text: priceInsight.medium as string,
      }))
  )

  const averageValueSold =
    (selectedPriceInsight.annualValueSoldCents as number) /
    100 /
    (selectedPriceInsight.annualLotsSold || 1)
  const formattedAverageValueSold = formatLargeNumber(averageValueSold)

  let deltaIcon: React.ReactNode
  const actualMedianSaleOverEstimatePercentage =
    selectedPriceInsight?.medianSaleOverEstimatePercentage || 0
  if (actualMedianSaleOverEstimatePercentage < 0) {
    deltaIcon = <DecreaseIcon />
  } else if (actualMedianSaleOverEstimatePercentage > 0) {
    deltaIcon = <IncreaseIcon />
  }
  const formattedMedianSaleOverEstimatePercentage = Math.abs(
    actualMedianSaleOverEstimatePercentage
  )

  const sellThroughRatePercentage =
    (selectedPriceInsight.sellThroughRate as number) * 100
  // show up to 2 decimal places
  const formattedSellThroughRate =
    Math.round(sellThroughRatePercentage * 100) / 100

  return (
    <>
      <Box mb={4}>
        <Text variant="lg">Market Signals</Text>
        <Text variant="lg" color="black60">
          Averages over last 36 months
        </Text>
      </Box>

      {/* Market Stats Values */}
      <GridColumns gridRowGap={[2, 0]}>
        <Column span={2}>
          <Select
            selected={selectedPriceInsight.medium || undefined}
            options={mediumOptions.current}
            title="Medium"
            onSelect={selectedMedium => {
              const priceInsight = priceInsights.find(
                p => p.medium === selectedMedium
              )
              if (priceInsight) {
                setSelectedPriceInsight(priceInsight)
              }
            }}
          />
        </Column>
        <Column span={10}>
          <GridColumns gridRowGap={[2, 0]}>
            <Column span={6}>
              <GridColumns gridRowGap={[2, 0]}>
                <Column span={[6]}>
                  <Text variant="text">Yearly lots sold</Text>
                  <Text variant="xxl" data-test-id="annualLotsSold">
                    {selectedPriceInsight.annualLotsSold}
                  </Text>
                </Column>

                <Column span={[6]}>
                  <Text variant="text">Sell-through rate</Text>
                  <Text variant="xxl">{formattedSellThroughRate}%</Text>
                </Column>
              </GridColumns>
            </Column>

            <Column span={6}>
              <GridColumns gridRowGap={[2, 0]}>
                <Column span={[6]}>
                  <Text variant="text">Sale price</Text>

                  <Text variant="xxl">${formattedAverageValueSold}</Text>
                </Column>

                <Column span={[6]}>
                  <Text variant="text">Sale price over estimate</Text>

                  <Text variant="xxl">
                    <Join separator={<Spacer mr={0.5} />}>
                      {deltaIcon}
                      {formattedMedianSaleOverEstimatePercentage}%
                    </Join>
                  </Text>
                </Column>
              </GridColumns>
            </Column>
          </GridColumns>
        </Column>
      </GridColumns>
      <Spacer mt={12} />
    </>
  )
}

export const MarketStatsFragmentContainer = createFragmentContainer(
  MarketStats,
  {
    priceInsightsConnection: graphql`
      fragment MarketStats_priceInsightsConnection on PriceInsightConnection {
        edges {
          node {
            medium
            annualLotsSold
            annualValueSoldCents
            sellThroughRate
            medianSaleOverEstimatePercentage
          }
        }
      }
    `,
  }
)

export const MarketStatsQueryRenderer: React.FC<{
  artistInternalID: string
  environment: RelayModernEnvironment
}> = ({ artistInternalID, environment }) => {
  return (
    // <QueryRenderer<MarketStatsQuery>
    <QueryRenderer<any>
      environment={environment}
      variables={{ artistInternalID }}
      query={graphql`
        query MarketStatsQuery($artistInternalID: ID!) {
          priceInsightsConnection: priceInsights(
            artistId: $artistInternalID
            sort: ANNUAL_VALUE_SOLD_CENTS_DESC
          ) {
            ...MarketStats_priceInsightsConnection
          }
        }
      `}
      render={({ props, error }) => {
        if (!props?.priceInsightsConnection) {
          console.error(error)
          return <></>
        }

        return (
          <MarketStatsFragmentContainer
            priceInsightsConnection={props.priceInsightsConnection}
          />
        )
      }}
    />
  )
}

export const tracks = {
  tapMarketStatsInfo: () => {},
  // tapMarketStatsInfo: (): TappedInfoBubbleArgs => ({
  //   contextModule: ContextModule.auctionResults,
  //   contextScreenOwnerType: OwnerType.artistAuctionResults,
  //   subject: "artistMarketStatistics",
  // }),
}

export function formatLargeNumber(number: number, decimalPlaces: number = 0) {
  if (number < 1000) {
    return number.toString()
  } else if (number < 1000000) {
    return `${(number / 1000).toFixed(decimalPlaces)}k`
  } else if (number < 1000000000) {
    return `${(number / 1000000).toFixed(decimalPlaces)}M`
  } else {
    return `${(number / 1000000000).toFixed(decimalPlaces)}B`
  }
}

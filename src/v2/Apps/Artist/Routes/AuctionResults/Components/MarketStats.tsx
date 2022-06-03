import { ContextModule, OwnerType } from "@artsy/cohesion"
import { Box, Column, GridColumns, Select, Text } from "@artsy/palette"
import { rest } from "lodash"
import { useEffect, useRef, useState } from "react"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useTracking } from "react-tracking"
import type RelayModernEnvironment from "relay-runtime/lib/store/RelayModernEnvironment"
import { AnalyticsSchema, Type } from "v2/System"
import { SystemQueryRenderer } from "v2/System/Relay/SystemQueryRenderer"
import { extractNodes } from "v2/Utils/extractNodes"
import { formatLargeNumber } from "v2/Utils/formatLargeNumber"
import { MarketStatsQuery } from "v2/__generated__/MarketStatsQuery.graphql"
import { MarketStats_priceInsightsConnection } from "v2/__generated__/MarketStats_priceInsightsConnection.graphql"
import { MarketStatsInfoButton } from "./MarketStatsInfoButton"
import { MarketStatsPlaceholder } from "./MarketStatsPlaceholder"
import { setImmediate } from "timers"

interface MarketStatsProps {
  priceInsightsConnection: MarketStats_priceInsightsConnection
  onRendered?: (visible: boolean) => void
}

export const MarketStats: React.FC<MarketStatsProps> = ({
  priceInsightsConnection,
  onRendered,
}) => {
  const { trackEvent } = useTracking()

  const priceInsights = extractNodes(priceInsightsConnection)

  useEffect(() => onRendered?.(priceInsights.length > 0), [priceInsights])

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

  if (priceInsights.length === 0) {
    return <></>
  }

  const averageValueSold =
    (selectedPriceInsight.annualValueSoldCents as number) /
    100 /
    (selectedPriceInsight.annualLotsSold || 1)
  const formattedAverageValueSold = formatLargeNumber(averageValueSold)

  let deltaIcon: React.ReactNode
  let deltaColor = "black"
  const actualMedianSaleOverEstimatePercentage =
    selectedPriceInsight?.medianSaleOverEstimatePercentage || 0
  if (actualMedianSaleOverEstimatePercentage < 0) {
    deltaIcon = "↓"
    deltaColor = "red100"
  } else if (actualMedianSaleOverEstimatePercentage > 0) {
    deltaIcon = "↑"
    deltaColor = "green100"
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
    <Box mb={[4, 12]} mt={[0, 6]}>
      <Text variant={["sm-display", "lg-display"]}>
        Market Signals{" "}
        <MarketStatsInfoButton
          onClick={() => {
            trackEvent(tracks.clickMarketStatsInfo())
          }}
        />
      </Text>

      <Text variant={["sm-display", "lg-display"]} color="black60" mb={[2, 4]}>
        Averages over the last 36 months
      </Text>

      {/* Market Stats Values */}
      <GridColumns gridRowGap={[2, 2]} gridColumnGap={[0, 2]}>
        <Column
          span={3}
          justifyContent="flex-end"
          display="flex"
          flexDirection="column"
          pt={0.5}
        >
          <Select
            selected={selectedPriceInsight.medium || undefined}
            options={mediumOptions.current}
            mb={0.5}
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
        <Column span={9}>
          <GridColumns gridRowGap={[2, 2]} gridColumnGap={[0, 2]}>
            <Column
              span={6}
              justifyContent="flex-end"
              display="flex"
              flexDirection="column"
            >
              <GridColumns gridRowGap={[2, 2]} gridColumnGap={[0, 2]}>
                <Column
                  span={[6]}
                  justifyContent="flex-end"
                  display="flex"
                  flexDirection="column"
                >
                  <Text variant={["xs", "sm"]} pb={[0.5, 1]} textAlign="right">
                    Yearly lots sold
                  </Text>
                  <Text
                    variant={["xxl", "xxl"]}
                    style={{ whiteSpace: "nowrap" }}
                    textAlign="right"
                  >
                    {selectedPriceInsight.annualLotsSold}
                  </Text>
                </Column>

                <Column
                  span={[6]}
                  justifyContent="flex-end"
                  display="flex"
                  flexDirection="column"
                >
                  <Text variant={["xs", "sm"]} pb={[0.5, 1]} textAlign="right">
                    Sell-through rate
                  </Text>
                  <Text
                    variant={["xxl", "xxl"]}
                    style={{ whiteSpace: "nowrap" }}
                    textAlign="right"
                  >
                    {formattedSellThroughRate}%
                  </Text>
                </Column>
              </GridColumns>
            </Column>

            <Column span={6}>
              <GridColumns gridRowGap={[2, 2]} gridColumnGap={[0, 2]}>
                <Column
                  span={[6]}
                  justifyContent="flex-end"
                  display="flex"
                  flexDirection="column"
                >
                  <Text variant={["xs", "sm"]} pb={[0.5, 1]} textAlign="right">
                    Sale price
                  </Text>

                  <Text
                    variant={["xxl", "xxl"]}
                    style={{ whiteSpace: "nowrap" }}
                    textAlign="right"
                  >
                    ${formattedAverageValueSold}
                  </Text>
                </Column>

                <Column
                  span={[6]}
                  justifyContent="flex-end"
                  display="flex"
                  flexDirection="column"
                >
                  <Text variant={["xs", "sm"]} pb={[0.5, 1]} textAlign="right">
                    Price over estimate
                  </Text>

                  <Text
                    variant={["xxl", "xxl"]}
                    color={deltaColor}
                    style={{ whiteSpace: "nowrap" }}
                    textAlign="right"
                  >
                    {deltaIcon}
                    &#8202;
                    {formattedMedianSaleOverEstimatePercentage}%
                  </Text>
                </Column>
              </GridColumns>
            </Column>
          </GridColumns>
        </Column>
      </GridColumns>
    </Box>
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
  onRendered?: (visible: boolean) => void
}> = ({ artistInternalID, environment, onRendered }) => {
  const [hasRendered, setHasRendered] = useState(false)

  const onRender = (visible: boolean) => {
    if (hasRendered) return

    setImmediate(() => setHasRendered(true))
    onRendered?.(visible)
  }

  return (
    <SystemQueryRenderer<MarketStatsQuery>
      lazyLoad
      environment={environment}
      variables={{ artistInternalID }}
      placeholder={<MarketStatsPlaceholder {...rest} />}
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
        if (error) {
          onRender(false)

          console.error(error)
          return null
        }

        if (!props) {
          return <MarketStatsPlaceholder {...rest} />
        }

        return (
          <MarketStatsFragmentContainer
            priceInsightsConnection={props.priceInsightsConnection!}
            onRendered={onRender}
          />
        )
      }}
    />
  )
}

export const tracks = {
  clickMarketStatsInfo: () => ({
    action_type: AnalyticsSchema.ActionType.Click,
    context_module: ContextModule.marketInsights,
    context_page_owner_type: OwnerType.artist,
    type: Type.Button,
  }),
}

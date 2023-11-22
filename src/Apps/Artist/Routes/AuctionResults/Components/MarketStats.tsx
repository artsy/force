import { ContextModule, OwnerType } from "@artsy/cohesion"
import * as DeprecatedAnalyticsSchema from "@artsy/cohesion/dist/DeprecatedSchema"
import {
  Column,
  GridColumns,
  Select,
  SkeletonBox,
  SkeletonText,
  Spacer,
  Text,
} from "@artsy/palette"
import { formatSellThroughRate } from "Apps/Artwork/Utils/insightHelpers"
import { FC, ReactNode, useEffect, useRef, useState } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useTracking } from "react-tracking"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { extractNodes } from "Utils/extractNodes"
import { formatLargeNumber } from "Utils/formatLargeNumber"
import { MarketStatsQuery } from "__generated__/MarketStatsQuery.graphql"
import { MarketStats_priceInsightsConnection$data } from "__generated__/MarketStats_priceInsightsConnection.graphql"
import { MarketStatsInfoButton } from "./MarketStatsInfoButton"
import ArrowUpIcon from "@artsy/icons/ArrowUpIcon"
import ArrowDownIcon from "@artsy/icons/ArrowDownIcon"

interface MarketStatsProps {
  priceInsightsConnection: MarketStats_priceInsightsConnection$data
  onRendered?: (visible: boolean) => void
}

export const MarketStats: FC<MarketStatsProps> = ({
  priceInsightsConnection,
  onRendered,
}) => {
  const { trackEvent } = useTracking()

  const priceInsights = extractNodes(priceInsightsConnection)

  useEffect(() => onRendered?.(priceInsights.length > 0), [
    onRendered,
    priceInsights,
  ])

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
    return null
  }

  const averageValueSold =
    (selectedPriceInsight.annualValueSoldCents as number) /
    100 /
    (selectedPriceInsight.annualLotsSold || 1)
  const formattedAverageValueSold = formatLargeNumber(averageValueSold)

  return (
    <>
      <Text
        variant={["sm-display", "lg-display"]}
        display="flex"
        alignItems="center"
        gap={0.5}
      >
        Market Signals
        <MarketStatsInfoButton
          onClick={() => {
            trackEvent({
              action_type: DeprecatedAnalyticsSchema.ActionType.Click,
              context_module: ContextModule.marketInsights,
              context_page_owner_type: OwnerType.artist,
              type: DeprecatedAnalyticsSchema.Type.Button,
            })
          }}
        />
      </Text>

      <Text variant={["sm-display", "lg-display"]} color="black60">
        Averages over the last 36 months
      </Text>

      <Spacer y={[2, 4]} />

      <GridColumns gridRowGap={[2, 2]} gridColumnGap={[0, 2]}>
        <Column
          span={3}
          justifyContent="flex-end"
          display="flex"
          flexDirection="column"
        >
          <Select
            selected={selectedPriceInsight.medium || undefined}
            options={mediumOptions.current}
            title="Medium"
            onSelect={selectedMedium => {
              const priceInsight = priceInsights.find(
                ({ medium }) => medium === selectedMedium
              )

              if (!priceInsight) return

              setSelectedPriceInsight(priceInsight)
            }}
          />
        </Column>

        <Column span={9}>
          <GridColumns textAlign="right">
            <MarketStatsFigure
              label="Yearly lots sold"
              value={`${selectedPriceInsight.annualLotsSold ?? 0}`}
            />

            <MarketStatsFigure
              label="Sell-through rate"
              value={formatSellThroughRate(
                selectedPriceInsight.sellThroughRate
              )}
            />

            <MarketStatsFigure
              label="Sale price"
              value={`$${formattedAverageValueSold}`}
            />

            <MarketStatsFigure
              label="Price over estimate"
              value={
                <MarketStatsSignal>
                  {selectedPriceInsight?.medianSaleOverEstimatePercentage || 0}
                </MarketStatsSignal>
              }
            />
          </GridColumns>
        </Column>
      </GridColumns>
    </>
  )
}

interface MarketStatsSignalProps {
  children: number
}

const MarketStatsSignal: FC<MarketStatsSignalProps> = ({ children }) => {
  switch (true) {
    case children > 0:
      return (
        <Text
          variant="xxl"
          color="green100"
          overflowEllipsis
          display="flex"
          alignItems="center"
          justifyContent="flex-end"
          gap={0.5}
        >
          <ArrowUpIcon aria-label="Up" width={40} height={40} flexShrink={0} />
          {children}%
        </Text>
      )

    case children < 0:
      return (
        <Text
          variant="xxl"
          color="red100"
          overflowEllipsis
          display="flex"
          alignItems="center"
          justifyContent="flex-end"
          gap={0.5}
        >
          <ArrowDownIcon
            aria-label="Down"
            width={40}
            height={40}
            flexShrink={0}
          />
          {Math.abs(children)}%
        </Text>
      )

    case children === 0:
      return (
        <Text variant="xxl" overflowEllipsis>
          {children}%
        </Text>
      )

    default:
      return null
  }
}

interface MarketStatsFigureProps {
  label: string
  value: ReactNode
  loading?: boolean
}

const MarketStatsFigure: FC<MarketStatsFigureProps> = ({
  loading = false,
  label,
  value,
}) => {
  const Component = loading ? SkeletonText : Text

  return (
    <Column
      span={[6, 6, 3]}
      justifyContent="flex-end"
      display="flex"
      flexDirection="column"
      gap={[0, 1]}
    >
      <Component variant={["xs", "sm-display"]}>{label}</Component>

      {typeof value === "string" ? (
        <Component variant="xxl" overflowEllipsis>
          {value}
        </Component>
      ) : (
        value
      )}
    </Column>
  )
}

const MarketStatsPlaceholder: FC = () => {
  return (
    <>
      <SkeletonText variant={["sm-display", "lg-display"]}>
        Market Signals
      </SkeletonText>

      <SkeletonText variant={["sm-display", "lg-display"]}>
        Averages over the last 36 months
      </SkeletonText>

      <Spacer y={[2, 4]} />

      <GridColumns gridRowGap={[2, 2]} gridColumnGap={[0, 2]}>
        <Column
          span={3}
          justifyContent="flex-end"
          display="flex"
          flexDirection="column"
        >
          <SkeletonBox width="100%" height={50} />
        </Column>

        <Column span={9}>
          <GridColumns textAlign="right">
            <MarketStatsFigure loading label="Yearly lots sold" value="55" />

            <MarketStatsFigure
              loading
              label="Sell-through rate"
              value="33.3%"
            />

            <MarketStatsFigure loading label="Sale price" value="$5M" />

            <MarketStatsFigure loading label="Price over estimate" value="0%" />
          </GridColumns>
        </Column>
      </GridColumns>
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

export const MarketStatsQueryRenderer: FC<{
  id: string
  onRendered?: (visible: boolean) => void
}> = ({ id, onRendered }) => {
  const [hasRendered, setHasRendered] = useState(false)

  const onRender = (visible: boolean) => {
    if (hasRendered) return

    setTimeout(() => setHasRendered(true), 0)
    onRendered?.(visible)
  }

  return (
    <SystemQueryRenderer<MarketStatsQuery>
      lazyLoad
      variables={{ id }}
      placeholder={<MarketStatsPlaceholder />}
      query={graphql`
        query MarketStatsQuery($id: ID!) {
          priceInsightsConnection: priceInsights(
            artistId: $id
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

        if (!props || !props.priceInsightsConnection) {
          return <MarketStatsPlaceholder />
        }

        return (
          <MarketStatsFragmentContainer
            priceInsightsConnection={props.priceInsightsConnection}
            onRendered={onRender}
          />
        )
      }}
    />
  )
}

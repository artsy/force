import * as DeprecatedSchema from "@artsy/cohesion/dist/DeprecatedSchema"
import {
  BorderBox,
  Flex,
  Link,
  Skeleton,
  SkeletonBox,
  SkeletonText,
  Spacer,
  StackableBorderBox,
  Text,
} from "@artsy/palette"
import { BarChart, type BarDescriptor } from "@artsy/palette-charts"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import type { PricingContextQuery } from "__generated__/PricingContextQuery.graphql"
import type {
  AnalyticsPricingContextDimensionEnum,
  PricingContext_artwork$data,
} from "__generated__/PricingContext_artwork.graphql"
import once from "lodash/once"
import type * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useTracking } from "react-tracking"
// eslint-disable-next-line no-restricted-imports
import Waypoint from "react-waypoint"
import {
  type FilterCategory,
  createCollectUrl,
} from "./../Utils/createCollectUrl"
import { PricingContextModal } from "./PricingContextModal"

interface PricingContextProps {
  artwork: PricingContext_artwork$data
}

export const PricingContext: React.FC<PricingContextProps> = ({ artwork }) => {
  const tracking = useTracking()

  if (!artwork.pricingContext) {
    return null
  }

  const priceCents =
    (artwork.listPrice?.__typename === "PriceRange"
      ? artwork.listPrice?.maxPrice?.minor || artwork.listPrice?.minPrice?.minor
      : artwork.listPrice?.__typename === "Money"
        ? artwork.listPrice?.minor
        : 0) ?? 0

  const artworkFallsBeforeFirstBin =
    priceCents < artwork.pricingContext.bins[0].minPriceCents

  const artworkFallsAfterLastBin =
    priceCents >=
    artwork.pricingContext.bins[artwork.pricingContext.bins.length - 1]
      .maxPriceCents

  if (artwork.artists === null) return null

  const artistId = artwork.artists?.[0]?.slug

  const handleImpression = once(() => {
    tracking.trackEvent({
      action_type: DeprecatedSchema.ActionType.Impression,
      context_module: DeprecatedSchema.ContextModule.PriceContext,
      flow: DeprecatedSchema.Flow.ArtworkPriceContext,
      subject: DeprecatedSchema.Subject.HistogramBar,
      type: DeprecatedSchema.Type.Chart,
    })
  })

  const handleBarChartHover = () => {
    tracking.trackEvent({
      action_type: DeprecatedSchema.ActionType.Hover,
      context_module: DeprecatedSchema.ContextModule.PriceContext,
      flow: DeprecatedSchema.Flow.ArtworkPriceContext,
      subject: DeprecatedSchema.Subject.HistogramBar,
      type: DeprecatedSchema.Type.Chart,
    })
  }

  const handleCollectPageLinkClick = () => {
    tracking.trackEvent({
      action_type: DeprecatedSchema.ActionType.Click,
      context_module: DeprecatedSchema.ContextModule.PriceContext,
      flow: DeprecatedSchema.Flow.ArtworkPriceContext,
      subject: DeprecatedSchema.Subject.BrowseWorks,
      type: DeprecatedSchema.Type.Chart,
    })
  }

  return (
    <BorderBox mb={2} flexDirection="column">
      {/* Impression Tracking */}
      <Waypoint onEnter={handleImpression} />

      <Flex alignItems="center">
        <Text variant="xs" lineHeight={1}>
          {artwork.pricingContext.appliedFiltersDisplay}
        </Text>
        <PricingContextModal />
      </Flex>

      <Link
        href={createCollectUrl({
          dimension: artwork.pricingContext.appliedFilters
            .dimension as AnalyticsPricingContextDimensionEnum,
          category: artwork.category as FilterCategory,
          artistId: artistId as string,
        })}
        onClick={handleCollectPageLinkClick}
        color="mono60"
      >
        <Text variant="xs">Browse works in this category</Text>
      </Link>

      <Spacer y={2} />

      <BarChart
        minLabel="$0"
        maxLabel={
          artwork.pricingContext.bins[artwork.pricingContext.bins.length - 1]
            .maxPrice + "+"
        }
        bars={artwork.pricingContext.bins.map((bin, index): BarDescriptor => {
          const isFirstBin = index === 0
          const isLastBin = artwork?.pricingContext?.bins?.length
            ? index === artwork.pricingContext.bins.length - 1
            : true

          const title = isLastBin
            ? `${bin.minPrice}+`
            : `${isFirstBin ? "$0" : bin.minPrice}–${bin.maxPrice}`
          const artworkFallsInThisBin =
            (isFirstBin && artworkFallsBeforeFirstBin) ||
            (isLastBin && artworkFallsAfterLastBin) ||
            (priceCents >= bin.minPriceCents && priceCents < bin.maxPriceCents)

          const binValue =
            artworkFallsInThisBin && bin.numArtworks === 0 ? 1 : bin.numArtworks
          const labelSuffix = binValue === 1 ? " work" : " works"

          return {
            value: binValue,
            label: {
              title,
              description: binValue + labelSuffix,
              noPadding: false,
            },
            onHover: handleBarChartHover,
            highlightLabel: artworkFallsInThisBin
              ? {
                  title,
                  description: "This work",
                  noPadding: false,
                }
              : undefined,
          }
        })}
      />
    </BorderBox>
  )
}

export const PricingContextFragmentContainer = createFragmentContainer(
  PricingContext,
  {
    artwork: graphql`
      fragment PricingContext_artwork on Artwork {
        # FIXME: Does this need to support exact prices?
        listPrice {
          __typename
          ... on PriceRange {
            maxPrice {
              minor
            }
            minPrice {
              minor
            }
          }
          ... on Money {
            minor
          }
        }
        artists(shallow: true) {
          slug
        }
        category
        pricingContext {
          appliedFiltersDisplay
          appliedFilters {
            dimension
            category
          }
          bins {
            maxPrice
            maxPriceCents
            minPrice
            minPriceCents
            numArtworks
          }
        }
      }
    `,
  },
)

const PLACEHOLDER = (
  <Skeleton>
    <StackableBorderBox flexDirection="column">
      <SkeletonText variant="xs">
        Price ranges of small prints by Pablo Picasso
      </SkeletonText>
      <SkeletonText variant="xs">Browse works in this category</SkeletonText>
      <Spacer y={2} />
      <SkeletonBox width="100%" height={100} />
    </StackableBorderBox>
  </Skeleton>
)

export const PricingContextQueryRenderer: React.FC<
  React.PropsWithChildren<{
    slug: string
  }>
> = ({ slug }) => {
  const { relayEnvironment } = useSystemContext()

  return (
    <SystemQueryRenderer<PricingContextQuery>
      lazyLoad
      environment={relayEnvironment}
      variables={{ slug }}
      placeholder={PLACEHOLDER}
      query={graphql`
        query PricingContextQuery($slug: String!) @cacheable {
          artwork(id: $slug) {
            ...PricingContext_artwork
          }
        }
      `}
      render={({ error, props }) => {
        if (error) {
          console.error(error)
          return null
        }
        if (!props) {
          return PLACEHOLDER
        }
        if (props.artwork) {
          return <PricingContextFragmentContainer artwork={props.artwork} />
        }
      }}
    />
  )
}

PricingContextFragmentContainer.displayName = "PricingContext"

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
import { BarChart, BarDescriptor } from "@artsy/palette-charts"
import { PricingContext_artwork$data } from "__generated__/PricingContext_artwork.graphql"
import * as DeprecatedSchema from "@artsy/cohesion/dist/DeprecatedSchema"
import { once } from "lodash"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
// eslint-disable-next-line no-restricted-imports
import Waypoint from "react-waypoint"
import Events from "Utils/Events"
import { createCollectUrl } from "./../Utils/createCollectUrl"
import { PricingContextModal } from "./PricingContextModal"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { PricingContextQuery } from "__generated__/PricingContextQuery.graphql"
import { useSystemContext } from "System/Hooks/useSystemContext"
import track from "react-tracking"

interface PricingContextProps {
  artwork: PricingContext_artwork$data
}

@track(
  {
    context_module: DeprecatedSchema.ContextModule.PriceContext,
  },
  {
    dispatch: data => Events.postEvent(data),
  }
)
export class PricingContext extends React.Component<PricingContextProps> {
  @track({
    action_type: DeprecatedSchema.ActionType.Impression,
    flow: DeprecatedSchema.Flow.ArtworkPriceContext,
    subject: DeprecatedSchema.Subject.HistogramBar,
    type: DeprecatedSchema.Type.Chart,
  })
  trackImpression() {
    // Tracking
  }

  @track({
    action_type: DeprecatedSchema.ActionType.Hover,
    flow: DeprecatedSchema.Flow.ArtworkPriceContext,
    subject: DeprecatedSchema.Subject.HistogramBar,
    type: DeprecatedSchema.Type.Chart,
  })
  barchartHover() {
    // Tracking
  }

  @track({
    action_type: DeprecatedSchema.ActionType.Click,
    flow: DeprecatedSchema.Flow.ArtworkPriceContext,
    subject: DeprecatedSchema.Subject.BrowseWorks,
    type: DeprecatedSchema.Type.Chart,
  })
  collectPageLinkClick() {
    // Tracking
  }

  render() {
    const { artwork } = this.props

    if (!artwork.pricingContext) {
      return null
    }

    const priceCents =
      (artwork.listPrice?.__typename === "PriceRange"
        ? artwork.listPrice?.maxPrice?.minor ||
          artwork.listPrice?.minPrice?.minor
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

    return (
      <BorderBox mb={2} flexDirection="column">
        {/* TODO: remove this library */}
        <Waypoint onEnter={once(this.trackImpression.bind(this))} />

        <Flex alignItems="center">
          <Text variant="xs" lineHeight={1}>
            {artwork.pricingContext.appliedFiltersDisplay}
          </Text>

          <PricingContextModal />
        </Flex>

        <Link
          href={createCollectUrl({
            // @ts-ignore
            dimension: artwork.pricingContext.appliedFilters.dimension,
            // @ts-ignore
            category: artwork.category,
            // @ts-ignore
            artistId: artistId,
          })}
          onClick={this.collectPageLinkClick.bind(this)}
          color="black60"
        >
          <Text variant="xs">Browse works in this category</Text>
        </Link>

        <Spacer y={2} />

        <BarChart
          // TODO: use artwork's currency
          minLabel="$0"
          maxLabel={
            artwork.pricingContext.bins[artwork.pricingContext.bins.length - 1]
              .maxPrice + "+"
          }
          bars={artwork.pricingContext.bins.map(
            (bin, index): BarDescriptor => {
              const isFirstBin = index === 0
              const isLastBin = artwork?.pricingContext?.bins?.length
                ? index === artwork?.pricingContext?.bins?.length - 1
                : true

              const title = isLastBin
                ? `${bin.minPrice}+`
                : // TODO: use artwork's currency
                  `${isFirstBin ? "$0" : bin.minPrice}–${bin.maxPrice}`
              const artworkFallsInThisBin =
                (isFirstBin && artworkFallsBeforeFirstBin) ||
                (isLastBin && artworkFallsAfterLastBin) ||
                (priceCents >= bin.minPriceCents &&
                  priceCents < bin.maxPriceCents)

              const binValue =
                artworkFallsInThisBin && bin.numArtworks === 0
                  ? 1
                  : bin.numArtworks
              const labelSuffix = binValue === 1 ? " work" : " works"
              return {
                value: binValue,
                label: {
                  title,
                  description: binValue + labelSuffix,
                },
                onHover: this.barchartHover.bind(this),
                highlightLabel: artworkFallsInThisBin
                  ? {
                      title,
                      description: "This work",
                    }
                  : undefined,
              }
            }
          )}
        />
      </BorderBox>
    )
  }
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
        artists {
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
  }
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

export const PricingContextQueryRenderer: React.FC<{
  slug: string
}> = ({ slug }) => {
  const { relayEnvironment } = useSystemContext()

  return (
    <SystemQueryRenderer<PricingContextQuery>
      lazyLoad
      environment={relayEnvironment}
      variables={{ slug }}
      placeholder={PLACEHOLDER}
      query={graphql`
        query PricingContextQuery($slug: String!) {
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

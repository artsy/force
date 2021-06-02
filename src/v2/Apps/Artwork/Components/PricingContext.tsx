import {
  BarChart,
  BarDescriptor,
  BorderBox,
  Flex,
  Link,
  Spacer,
  Text,
} from "@artsy/palette"
import { PricingContext_artwork } from "v2/__generated__/PricingContext_artwork.graphql"
import { track } from "v2/Artsy/Analytics"
import * as Schema from "v2/Artsy/Analytics/Schema"
import { once } from "lodash"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import Waypoint from "react-waypoint"
import Events from "v2/Utils/Events"
import { createCollectUrl } from "./../Utils/createCollectUrl"
import { PricingContextModal } from "./PricingContextModal"

interface PricingContextProps {
  artwork: PricingContext_artwork
}

@track(
  {
    context_module: Schema.ContextModule.PriceContext,
  },
  {
    dispatch: data => Events.postEvent(data),
  }
)
export class PricingContext extends React.Component<PricingContextProps> {
  @track({
    action_type: Schema.ActionType.Impression,
    flow: Schema.Flow.ArtworkPriceContext,
    subject: Schema.Subject.HistogramBar,
    type: Schema.Type.Chart,
  })
  trackImpression() {
    // Tracking
  }

  @track({
    action_type: Schema.ActionType.Hover,
    flow: Schema.Flow.ArtworkPriceContext,
    subject: Schema.Subject.HistogramBar,
    type: Schema.Type.Chart,
  })
  barchartHover() {
    // Tracking
  }

  @track({
    action_type: Schema.ActionType.Click,
    flow: Schema.Flow.ArtworkPriceContext,
    subject: Schema.Subject.BrowseWorks,
    type: Schema.Type.Chart,
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

    const artistId = artwork.artists[0]?.slug

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

        <Spacer mt={2} />

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
              // @ts-expect-error STRICT_NULL_CHECK
              const isLastBin = index === artwork.pricingContext.bins.length - 1
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

PricingContextFragmentContainer.displayName = "PricingContext"

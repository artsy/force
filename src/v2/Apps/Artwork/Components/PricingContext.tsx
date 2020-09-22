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
import { FilterCategory, createCollectUrl } from "./../Utils/createCollectUrl"
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
    // noop
  }

  @track({
    action_type: Schema.ActionType.Hover,
    flow: Schema.Flow.ArtworkPriceContext,
    subject: Schema.Subject.HistogramBar,
    type: Schema.Type.Chart,
  })
  barchartHover() {
    // I'm just for tracking!
  }

  @track({
    action_type: Schema.ActionType.Click,
    flow: Schema.Flow.ArtworkPriceContext,
    subject: Schema.Subject.BrowseWorks,
    type: Schema.Type.Chart,
  })
  collectPageLinkClick({
    dimension,
    category,
    artistId,
  }: {
    dimension: "SMALL" | "MEDIUM" | "LARGE" | null
    category: FilterCategory
    artistId: string
  }) {
    const url = createCollectUrl({ dimension, category, artistId })
    if (typeof window !== "undefined") {
      window.open(url)
    }
  }

  render() {
    const { artwork } = this.props
    if (!artwork.pricingContext) {
      return null
    }

    const priceCents =
      artwork.listPrice.__typename === "PriceRange"
        ? artwork.listPrice.maxPrice.minor || artwork.listPrice.minPrice.minor
        : artwork.listPrice.__typename === "Money"
        ? artwork.listPrice.minor
        : 0

    const artworkFallsBeforeFirstBin =
      priceCents < artwork.pricingContext.bins[0].minPriceCents
    const artworkFallsAfterLastBin =
      priceCents >=
      artwork.pricingContext.bins[artwork.pricingContext.bins.length - 1]
        .maxPriceCents

    const artistId = artwork.artists[0].slug
    return (
      <BorderBox mb={2} flexDirection="column">
        <Waypoint onEnter={once(this.trackImpression.bind(this))} />
        <Flex>
          <Text variant="caption">
            {artwork.pricingContext.appliedFiltersDisplay}
          </Text>
          <PricingContextModal />
        </Flex>
        {/* FIXME: Remove this lint ignore */}
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <Link
          onClick={this.collectPageLinkClick.bind(this, {
            dimension: artwork.pricingContext.appliedFilters.dimension,
            category: artwork.category,
            artistId,
          })}
          color="black60"
        >
          <Text variant="caption">Browse works in this category</Text>
        </Link>
        <Spacer mb={[2, 3]} />
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

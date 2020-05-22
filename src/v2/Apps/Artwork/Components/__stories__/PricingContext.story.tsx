import { Flex } from "@artsy/palette"
import { PricingContextStoryQueryRawResponse } from "v2/__generated__/PricingContextStoryQuery.graphql"
import { MockRelayRenderer } from "v2/DevTools"
import React from "react"
import { graphql } from "react-relay"
import { storiesOf } from "storybook/storiesOf"
import { Section } from "v2/Utils/Section"
import { PricingContextFragmentContainer } from "../PricingContext"

const MockPricingContext = ({
  artwork,
}: {
  artwork: PricingContextStoryQueryRawResponse["artwork"]
}) => {
  return (
    <MockRelayRenderer
      Component={PricingContextFragmentContainer}
      mockData={{ artwork }}
      query={graphql`
        query PricingContextStoryQuery @raw_response_type {
          artwork(id: "unused") {
            ...PricingContext_artwork
          }
        }
      `}
    />
  )
}

const mockArtwork: PricingContextStoryQueryRawResponse["artwork"] = {
  id: "opaque-artwork-id",
  artists: [{ id: "opaque-artist-id", slug: "alex-katz" }],
  category: "Sculpture",
  listPrice: {
    __typename: "PriceRange",
    minPrice: {
      minor: 284243,
    },
    maxPrice: {
      minor: 284243,
    },
  },
  pricingContext: {
    bins: [
      {
        numArtworks: 0,
        minPrice: "$1,000",
        maxPrice: "$2,500",
        minPriceCents: 100000,
        maxPriceCents: 250000,
      },
      {
        numArtworks: 11,
        minPrice: "$2,500",
        maxPrice: "$5,000",
        minPriceCents: 250000,
        maxPriceCents: 500000,
      },
      {
        numArtworks: 23,
        minPrice: "$5,000",
        maxPrice: "$7,500",
        minPriceCents: 500000,
        maxPriceCents: 750000,
      },
      {
        numArtworks: 38,
        minPrice: "$7,500",
        maxPrice: "$10,000",
        minPriceCents: 750000,
        maxPriceCents: 1000000,
      },
      {
        numArtworks: 15,
        minPrice: "$10,000",
        maxPrice: "$12,500",
        minPriceCents: 1000000,
        maxPriceCents: 1250000,
      },
      {
        numArtworks: 14,
        minPrice: "$12,500",
        maxPrice: "$15,000",
        minPriceCents: 1250000,
        maxPriceCents: 1500000,
      },
      {
        numArtworks: 22,
        minPrice: "$15,000",
        maxPrice: "$17,500",
        minPriceCents: 1500000,
        maxPriceCents: 1750000,
      },
      {
        numArtworks: 10,
        minPrice: "$17,500",
        maxPrice: "$20,000",
        minPriceCents: 1750000,
        maxPriceCents: 2000000,
      },
      {
        numArtworks: 26,
        minPrice: "$20,000",
        maxPrice: "$22,500",
        minPriceCents: 2000000,
        maxPriceCents: 2250000,
      },
      {
        numArtworks: 10,
        minPrice: "$22,500",
        maxPrice: "$25,000",
        minPriceCents: 2250000,
        maxPriceCents: 2500000,
      },
      {
        numArtworks: 7,
        minPrice: "$25,000",
        maxPrice: "$27,500",
        minPriceCents: 2500000,
        maxPriceCents: 2750000,
      },
      {
        numArtworks: 4,
        minPrice: "$27,500",
        maxPrice: "$30,000",
        minPriceCents: 2750000,
        maxPriceCents: 3000000,
      },
      {
        numArtworks: 7,
        minPrice: "$30,000",
        maxPrice: "$32,500",
        minPriceCents: 3000000,
        maxPriceCents: 3250000,
      },
      {
        numArtworks: 0,
        minPrice: "$32,500",
        maxPrice: "$35,000",
        minPriceCents: 3250000,
        maxPriceCents: 3500000,
      },
      {
        numArtworks: 5,
        minPrice: "$35,000",
        maxPrice: "$37,500",
        minPriceCents: 3500000,
        maxPriceCents: 3750000,
      },
      {
        numArtworks: 1,
        minPrice: "$37,500",
        maxPrice: "$40,000",
        minPriceCents: 3750000,
        maxPriceCents: 4000000,
      },
      {
        numArtworks: 1,
        minPrice: "$40,000",
        maxPrice: "$42,500",
        minPriceCents: 4000000,
        maxPriceCents: 4250000,
      },
      {
        numArtworks: 0,
        minPrice: "$42,500",
        maxPrice: "$45,000",
        minPriceCents: 4250000,
        maxPriceCents: 4500000,
      },
      {
        numArtworks: 1,
        minPrice: "$45,000",
        maxPrice: "$47,500",
        minPriceCents: 4500000,
        maxPriceCents: 4750000,
      },
      {
        numArtworks: 0,
        minPrice: "$47,500",
        maxPrice: "$50,000",
        minPriceCents: 4750000,
        maxPriceCents: 5000000,
      },
      {
        numArtworks: 0,
        minPrice: "$50,000",
        maxPrice: "$52,500",
        minPriceCents: 5000000,
        maxPriceCents: 5250000,
      },
    ],
    appliedFiltersDisplay: "Price ranges of large prints by Alex Katz",
    appliedFilters: { dimension: "SMALL", category: "SCULPTURE" },
  },
}

storiesOf("Apps/Artwork/Components", module)
  .add("PricingContext", () => {
    return (
      <>
        <Section title="Pricing Context">
          <Flex width="100%" maxWidth="600px" flexDirection="column">
            <MockPricingContext artwork={{ ...mockArtwork }} />
          </Flex>
        </Section>
      </>
    )
  })

  .add("PricingContext with price below min bin range", () => {
    return (
      <>
        <Section title="Pricing Context">
          <Flex width="100%" maxWidth="600px" flexDirection="column">
            <MockPricingContext
              artwork={{
                ...mockArtwork,
                listPrice: {
                  __typename: "PriceRange",
                  minPrice: { minor: 1000 },
                  maxPrice: { minor: 1000 },
                },
              }}
            />
          </Flex>
        </Section>
      </>
    )
  })

  .add("PricingContext with price above max bin range", () => {
    return (
      <>
        <Section title="Pricing Context">
          <Flex width="100%" maxWidth="600px" flexDirection="column">
            <MockPricingContext
              artwork={{
                ...mockArtwork,
                listPrice: {
                  __typename: "PriceRange",
                  minPrice: { minor: 10000000 },
                  maxPrice: { minor: 10000000 },
                },
              }}
            />
          </Flex>
        </Section>
      </>
    )
  })

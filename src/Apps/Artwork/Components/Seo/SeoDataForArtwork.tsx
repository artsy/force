import { trim } from "lodash"
import * as React from "react"

import { SeoDataForArtwork_artwork$data } from "__generated__/SeoDataForArtwork_artwork.graphql"
import { CreativeWork } from "Components/Seo/CreativeWork"
import { Product } from "Components/Seo/Product"
import { createFragmentContainer, graphql } from "react-relay"
import { data as sd } from "sharify"
import { get } from "Utils/get"

const { APP_URL } = sd

interface SeoDataForArtworkProps {
  artwork: SeoDataForArtwork_artwork$data
}

export const AVAILABILITY = {
  "for sale": "https://schema.org/InStock",
  sold: "https://schema.org/OutOfStock",
}

export const SeoDataForArtwork: React.FC<SeoDataForArtworkProps> = ({
  artwork,
}) => {
  const artistsName = artwork.artistNames

  // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
  const dimensions = parseDimensions(get(artwork, a => a.dimensions.in, ""))

  const artworkMetaData = {
    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
    name: artwork.meta.title,
    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
    image: get(artwork, a => a.meta_image.resized.url),
    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
    description: get(artwork, a => a.meta.description),
    url: `${APP_URL}${artwork.href}`,
    ...dimensions,
    brand: {
      "@type": "Person",
      name: artistsName,
    },
  }

  // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
  const partnerType = get(artwork, a => a.partner.type)
  const offers = offerAttributes(artwork)

  if (partnerType === "Institution" || offers === null) {
    return <CreativeWork data={artworkMetaData} />
  }

  const ecommerceData = {
    category: artwork.category,
    productionDate: artwork.date,
    offers,
  }

  return (
    <Product
      data={{
        ...artworkMetaData,
        ...ecommerceData,
      }}
    />
  )
}

export const SeoDataForArtworkFragmentContainer = createFragmentContainer(
  SeoDataForArtwork,
  {
    artwork: graphql`
      fragment SeoDataForArtwork_artwork on Artwork {
        href
        date
        is_price_hidden: isPriceHidden
        is_price_range: isPriceRange
        listPrice {
          __typename
          ... on PriceRange {
            minPrice {
              major
              currencyCode
            }
            maxPrice {
              major
            }
          }
          ... on Money {
            major
            currencyCode
          }
        }
        meta_image: image {
          resized(
            width: 640
            height: 640
            version: ["large", "medium", "tall"]
          ) {
            width
            height
            url
          }
        }
        meta {
          title
          description(limit: 155)
        }
        partner {
          name
          type
          profile {
            image {
              resized(width: 320, height: 320, version: ["medium"]) {
                url
              }
            }
          }
        }
        artistNames
        availability
        category
        dimensions {
          in
        }
      }
    `,
  }
)

export const offerAttributes = (artwork: SeoDataForArtwork_artwork$data) => {
  if (!artwork.listPrice || artwork.is_price_hidden) return null
  const galleryProfileImage = get(
    artwork,
    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
    a => a.partner.profile.image.resized.url
  )
  const seller = galleryProfileImage && {
    "@type": "ArtGallery",
    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
    name: get(artwork, a => a.partner.name),
    image: galleryProfileImage,
  }
  // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
  const availability = AVAILABILITY[artwork.availability]
  switch (artwork.listPrice.__typename) {
    case "PriceRange":
      // lowPrice is required for AggregateOffer type
      if (!artwork.listPrice.minPrice) {
        return null
      }
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      const highPrice = get(artwork.listPrice, price => price.maxPrice.major)
      return {
        "@type": "AggregateOffer",
        lowPrice: artwork.listPrice.minPrice.major,
        highPrice,
        priceCurrency: artwork.listPrice.minPrice.currencyCode,
        availability,
        seller,
      }
    case "Money":
      return {
        "@type": "Offer",
        price: artwork.listPrice.major,
        priceCurrency: artwork.listPrice.currencyCode,
        availability,
        seller,
      }
    default:
      return null
  }
}

const parseDimensions = (dimensions: string) => {
  if (!dimensions) return {}

  const segments = dimensions.replace(" in", "").split("×")

  if (segments.length === 2) {
    return {
      width: `${trim(segments[0])} in`,
      height: `${trim(segments[1])} in`,
    }
  }

  if (segments.length === 3) {
    return {
      width: `${trim(segments[0])} in`,
      height: `${trim(segments[1])} in`,
      depth: `${trim(segments[2])} in`,
    }
  }

  return {}
}

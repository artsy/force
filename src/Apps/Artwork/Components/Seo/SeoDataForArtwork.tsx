import { CreativeWork } from "Components/Seo/CreativeWork"
import { Product } from "Components/Seo/Product"
import { getENV } from "Utils/getENV"
import type { SeoDataForArtwork_artwork$data } from "__generated__/SeoDataForArtwork_artwork.graphql"
import { trim } from "lodash"
import type * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import type { AggregateOffer, Offer, VisualArtwork } from "schema-dts"

interface SeoDataForArtworkProps {
  artwork: SeoDataForArtwork_artwork$data
}

export const AVAILABILITY = {
  "for sale": "https://schema.org/InStock",
  sold: "https://schema.org/OutOfStock",
} as const

export const SeoDataForArtwork: React.FC<
  React.PropsWithChildren<SeoDataForArtworkProps>
> = ({ artwork }) => {
  const artistsName = artwork.artistNames
  const dimensions = parseDimensions(artwork.dimensions?.in ?? "")

  const artworkMetaData: VisualArtwork = {
    "@type": "VisualArtwork",
    name: artwork.meta?.title ?? "",
    image: artwork.metaImage?.resized?.url ?? "",
    description: artwork.meta?.description ?? "",
    url: `${getENV("APP_URL")}${artwork.href}`,
    creator: { "@type": "Person", name: artistsName ?? "Unknown Artist" },
    artMedium: artwork.medium ?? undefined,
    artform: artwork.category ?? undefined,
    dateCreated: artwork.date ?? undefined,
    artEdition: artwork.editionOf ?? undefined,
    height: dimensions.height
      ? { "@type": "Distance", name: dimensions.height }
      : undefined,
    width: dimensions.width
      ? { "@type": "Distance", name: dimensions.width }
      : undefined,
    depth: dimensions.depth
      ? { "@type": "Distance", name: dimensions.depth }
      : undefined,
  }

  const partnerType = artwork.partner?.type
  const offers = offerAttributes(artwork)

  if (partnerType === "Institution" || offers === null) {
    return <CreativeWork data={artworkMetaData} />
  }

  const ecommerceData = {
    category: artwork.category ?? undefined,
    productionDate: artwork.date ?? undefined,
    offers,
  }

  return <Product data={{ ...artworkMetaData, ...ecommerceData }} />
}

export const SeoDataForArtworkFragmentContainer = createFragmentContainer(
  SeoDataForArtwork,
  {
    artwork: graphql`
      fragment SeoDataForArtwork_artwork on Artwork {
        href
        date
        medium
        category
        editionOf
        isPriceHidden
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
        metaImage: image {
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
        dimensions {
          in
          cm
        }
      }
    `,
  },
)

export const offerAttributes = (
  artwork: SeoDataForArtwork_artwork$data,
): Offer | AggregateOffer | null => {
  if (!artwork.listPrice || artwork.isPriceHidden) return null

  const galleryProfileImage = artwork.partner?.profile?.image?.resized?.url

  const seller = galleryProfileImage && {
    "@type": "ArtGallery" as const,
    name: artwork.partner?.name || "",
    image: galleryProfileImage,
  }
  const availability = artwork.availability
    ? AVAILABILITY[artwork.availability as keyof typeof AVAILABILITY]
    : undefined

  switch (artwork.listPrice.__typename) {
    case "PriceRange":
      // lowPrice is required for AggregateOffer type
      if (!artwork.listPrice.minPrice) {
        return null
      }

      const highPrice = artwork.listPrice.maxPrice?.major

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

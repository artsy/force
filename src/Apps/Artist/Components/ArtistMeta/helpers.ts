import { get } from "Utils/get"
import { ArtistMeta_artist$data } from "__generated__/ArtistMeta_artist.graphql"
import { getENV } from "Utils/getENV"
import { identity, pickBy } from "lodash"

// FIXME:
// @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
type ArtworkNode = ArtistMeta_artist["artworks_connection"]["edges"][0]["node"]

export const sellerFromPartner = (partner: ArtworkNode["partner"]) => {
  if (partner) {
    const { profile } = partner
    const image = imageObjectAttributes(profile)

    return {
      "@context": "http://schema.org",
      "@type": "ArtGallery",
      image,
      name: partner.name,
      url: `${getENV("APP_URL")}${partner.href}`,
    }
  }
}

interface ItemWithImage {
  image?: {
    small: string
    large: string
  }
}

export const imageObjectAttributes = (item: ItemWithImage) => {
  if (!item) {
    return null
  }

  const thumbnailUrl = item.image && item.image.small
  const url = item.image && item.image.large

  return (
    thumbnailUrl && {
      "@type": "ImageObject",
      thumbnailUrl,
      url,
    }
  )
}

export const offersAttributes = (artist: ArtistMeta_artist$data) => {
  if (artist.artworks_connection) {
    const { edges } = artist.artworks_connection

    const offers =
      edges &&
      edges
        .map(edge => {
          if (edge) {
            const { node } = edge
            const seller = sellerFromPartner(node?.partner)
            const itemOffered = productAttributes(artist, node)
            const availability =
              node?.availability === "for sale" ? "InStock" : "OutOfStock"

            if (!itemOffered) return null

            return {
              "@type": "Offer",
              availability,
              itemOffered,
              priceCurrency: node?.price_currency,
              seller,
            }
          }
        })
        .filter(offer => !!offer)

    return offers
  }
}

export const productAttributes = (
  artist: ArtistMeta_artist$data,
  artwork: ArtworkNode
) => {
  const image = imageObjectAttributes(artwork)
  const offers = offerAttributes(artwork)

  if (!offers) return null

  return {
    "@type": "Product",
    additionalType: artwork.category,
    brand: {
      "@type": "Person",
      name: artist.name,
    },
    image,
    name: artwork.title,
    offers,
    productionDate: artwork.date,
    url: `${getENV("APP_URL")}${artwork.href}`,
  }
}

export const offerAttributes = (artwork: ArtworkNode) => {
  if (!artwork.listPrice) return null
  switch (artwork.listPrice.__typename) {
    case "PriceRange":
      // lowPrice is required for AggregateOffer type
      if (!artwork.listPrice.minPrice) {
        return null
      }
      const highPrice = get(artwork.listPrice, price => price.maxPrice.major)
      return {
        "@type": "AggregateOffer",
        highPrice,
        lowPrice: artwork.listPrice.minPrice.major,
        priceCurrency: artwork.listPrice.minPrice.currencyCode,
      }
    case "Money":
      return {
        "@type": "Offer",
        availability: "InStock",
        price: artwork.listPrice.major,
        priceCurrency: artwork.listPrice.currencyCode,
      }
    default:
      return null
  }
}

export const structuredDataAttributes = (artist: ArtistMeta_artist$data) => {
  let makesOffer = offersAttributes(artist)
  if (makesOffer && makesOffer.length === 0) {
    makesOffer = undefined
  }
  const attributes = {
    additionalType: "Artist",
    birthDate: artist.birthday,
    deathDate: artist.deathday,
    description: artist.meta ? artist.meta.description : "",
    gender: artist.gender,
    image: artist.coverArtwork?.image ? artist.coverArtwork.image.large : "",
    mainEntityOfPage: `${getENV("APP_URL")}${artist.href}`,
    makesOffer,
    name: artist.name,
    nationality: {
      "@type": "Country",
      name: artist.nationality,
    },
    url: `${getENV("APP_URL")}${artist.href}`,
  }
  return pickBy(attributes, identity)
}

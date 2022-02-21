import { ArtistMeta_artist$data } from "v2/__generated__/ArtistMeta_artist.graphql"
import { Person as SeoDataForArtist } from "v2/Components/Seo/Person"
import { identity, pickBy } from "lodash"
import { Component } from "react"
import { Meta } from "react-head"
import { createFragmentContainer, graphql } from "react-relay"
import { data as sd } from "sharify"
import { get } from "v2/Utils/get"
import { ArtistMetaCanonicalLinkFragmentContainer as ArtistMetaCanonicalLink } from "./ArtistMetaCanonicalLink"

interface Props {
  artist: ArtistMeta_artist$data
}

// @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
type ArtworkNode = ArtistMeta_artist$data["artworks_connection"]["edges"][0]["node"]

export const sellerFromPartner = (partner: ArtworkNode["partner"]) => {
  if (partner) {
    const { profile } = partner
    const image = imageObjectAttributes(profile)

    return {
      "@context": "http://schema.org",
      "@type": "ArtGallery",
      image,
      name: partner.name,
      url: `${sd.APP_URL}${partner.href}`,
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
  // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
  const { edges } = artist.artworks_connection

  const offers =
    edges &&
    edges
      .map(({ node }) => {
        const seller = sellerFromPartner(node.partner)
        const itemOffered = productAttributes(artist, node)
        const availability =
          node.availability === "for sale" ? "InStock" : "OutOfStock"

        if (!itemOffered) return null

        return {
          "@type": "Offer",
          availability,
          itemOffered,
          priceCurrency: node.price_currency,
          seller,
        }
      })
      .filter(offer => !!offer)
  return offers
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
    url: `${sd.APP_URL}${artwork.href}`,
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
    image: artist.image ? artist.image.large : "",
    mainEntityOfPage: `${sd.APP_URL}${artist.href}`,
    makesOffer,
    name: artist.name,
    nationality: {
      "@type": "Country",
      name: artist.nationality,
    },
    url: `${sd.APP_URL}${artist.href}`,
  }
  return pickBy(attributes, identity)
}

export class ArtistMeta extends Component<Props> {
  renderImageMetaTags() {
    const { artist } = this.props
    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
    const hasImage = artist.image && artist.image.versions.length
    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
    if (hasImage && artist.image.versions.indexOf("large") !== -1) {
      return (
        <>
          <Meta property="twitter:card" content="summary_large_image" />
          {/* @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION */}
          <Meta property="og:image" content={artist.image.large} />
          {/* @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION */}
          <Meta name="thumbnail" content={artist.image.square} />
        </>
      )
    } else {
      return (
        <>
          <Meta property="twitter:card" content="summary" />
        </>
      )
    }
  }

  maybeRenderNoIndex() {
    const { artist } = this.props
    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
    if (artist.counts.artworks === 0 && !artist.blurb) {
      return (
        <>
          <Meta name="robots" content="noindex, follow" />
        </>
      )
    }
  }

  renderStructuredData() {
    const { artist } = this.props

    return <SeoDataForArtist data={structuredDataAttributes(artist)} />
  }

  render() {
    const { artist } = this.props
    return (
      <>
        <ArtistMetaCanonicalLink artist={artist} />

        {/* @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION */}
        <Meta name="description" content={artist.meta.description} />
        {/* @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION */}
        <Meta property="og:description" content={artist.meta.description} />
        <Meta
          property="twitter:description"
          // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
          content={artist.meta.description}
        />
        <Meta property="og:url" href={`${sd.APP_URL}/artist/${artist.slug}`} />
        <Meta property="og:type" href={`${sd.FACEBOOK_APP_NAMESPACE}:artist`} />
        {artist.alternate_names && (
          <Meta
            name="skos:prefLabel"
            content={artist.alternate_names.join("; ")}
          />
        )}

        {artist.nationality && (
          <Meta property="og:nationality" content={artist.nationality} />
        )}
        {artist.birthday && (
          <Meta property="og:birthyear" content={artist.birthday} />
        )}
        {artist.deathday && (
          <Meta property="og:deathyear" content={artist.deathday} />
        )}
        {this.renderImageMetaTags()}
        {this.maybeRenderNoIndex()}
        {this.renderStructuredData()}
      </>
    )
  }
}

export const ArtistMetaFragmentContainer = createFragmentContainer(ArtistMeta, {
  artist: graphql`
    fragment ArtistMeta_artist on Artist {
      slug
      name
      nationality
      birthday
      deathday
      gender
      href
      meta {
        description
      }
      alternate_names: alternateNames
      image {
        versions
        large: url(version: "large")
        square: url(version: "square")
      }
      counts {
        artworks
      }
      blurb
      artworks_connection: artworksConnection(
        first: 10
        filter: IS_FOR_SALE
        published: true
      ) {
        edges {
          node {
            title
            date
            description
            category
            price_currency: priceCurrency
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
            availability
            href
            image {
              small: url(version: "small")
              large: url(version: "large")
            }
            partner {
              name
              href
              profile {
                image {
                  small: url(version: "small")
                  large: url(version: "large")
                }
              }
            }
          }
        }
      }
      ...ArtistMetaCanonicalLink_artist
    }
  `,
})

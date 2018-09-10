import React, { Fragment } from 'react'
import { pickBy, identity } from 'lodash'
import { stringifyJSONForWeb } from 'desktop/components/util/json.coffee'

function renderImageMetaTags(artist) {
  const hasImage = artist.image && artist.image.versions.length
  if (hasImage && artist.image.versions.indexOf('large') !== -1) {
    return (
      <Fragment>
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="og:image" content={artist.image.large} />
        <meta name="thumbnail" content={artist.image.square} />
      </Fragment>
    )
  } else {
    return (
      <Fragment>
        <meta property="twitter:card" content="summary" />
      </Fragment>
    )
  }
}

function maybeRenderNoIndex(artist) {
  if (artist.counts.artworks === 0 && !artist.blurb) {
    return (
      <Fragment>
        <meta name="robots" content="noindex, follow" />
      </Fragment>
    )
  }
}

export function Meta(props) {
  const { sd, artist } = props
  return (
    <Fragment>
      <title>{artist.meta.title}</title>
      <link rel="canonical" href={`${sd.APP_URL}/artist/${artist.id}`} />
      <meta property="og:title" content={artist.meta.title} />
      <meta name="description" content={artist.meta.description} />
      <meta property="og:description" content={artist.meta.description} />
      <meta property="twitter:description" content={artist.meta.description} />
      <meta property="og:url" href={`${sd.APP_URL}/artist/${artist.id}`} />
      <meta property="og:type" href={`${sd.FACEBOOK_APP_NAMESPACE}:artist`} />
      {artist.alternate_names && (
        <meta
          name="skos:prefLabel"
          content={artist.alternate_names.join('; ')}
        />
      )}

      {artist.nationality && (
        <meta property="og:nationality" content={artist.nationality} />
      )}
      {artist.birthyear && (
        <meta property="og:birthyear" content={artist.birthyear} />
      )}
      {artist.deathyear && (
        <meta property="og:deathyear" content={artist.deathyear} />
      )}
      {renderImageMetaTags(artist)}
      {maybeRenderNoIndex(artist)}
    </Fragment>
  )
}

export const query = `
query ArtistMetaQuery($artistID: String!) {
  artist(id: $artistID) {
    id
    name
    nationality
    birthday
    deathday
    gender
    href
    meta {
      title
      description
    }
    alternate_names
    image {
      versions
      large: url(version:"large")
      square: url(version:"square")
    }
    counts {
      artworks
    }
    blurb
    artworks_connection(first: 10, filter: IS_FOR_SALE, published: true) {
      edges {
        node {
          title
          date
          description
          category
          price_currency
          is_price_range
          availability
          href
          image {
            small: url(version: "small")
          }
          partner {
            name
            href
          }
        }
      }
    }
  }
}
`

export const toJSONLD = (artist, APP_URL) => {
  const makesOffer = artistToJsonOffers(artist, APP_URL)

  const json = {
    '@context': 'http://schema.org',
    '@type': 'Person',
    additionalType: 'Artist',
    image: artist.image ? artist.image.large : '',
    name: artist.name,
    url: `${APP_URL}${artist.href}`,
    gender: artist.gender,
    birthDate: artist.birthday,
    deathDate: artist.deathday,
    mainEntityOfPage: `${APP_URL}${artist.href}`,
    description: artist.meta ? artist.meta.description : '',
    nationality: {
      '@type': 'Country',
      name: artist.nationality,
    },
    makesOffer,
  }
  const cleanedJSON = pickBy(json, identity)
  return stringifyJSONForWeb(cleanedJSON)
}

export const artistToJsonOffers = (artist, APP_URL) => {
  const { edges } = artist.artworks_connection

  const offers =
    edges &&
    edges.map(({ node }) => {
      const seller = sellerFromPartner(node.partner, APP_URL)
      const itemOffered = productFromArtistArtwork(artist, node, APP_URL)
      const availability =
        node.availability === 'for sale' ? 'InStock' : 'OutOfStock'

      return {
        '@type': 'Offer',
        availability,
        priceCurrency: node.price_currency,
        // TODO: price and price range
        seller,
        itemOffered,
      }
    })
  return offers
}

export const productFromArtistArtwork = (artist, artwork, APP_URL) => {
  const thumbnailUrl = artwork.image && artwork.image.small
  const image = thumbnailUrl && {
    '@type': 'ImageObject',
    thumbnailUrl,
  }

  return {
    '@type': 'Product',
    additionalType: artwork.category,
    productionDate: artwork.date,
    name: artwork.title,
    url: `${APP_URL}${artwork.href}`,
    image,
    brand: {
      '@type': 'Person',
      name: artist.name,
    },
  }
}

export const sellerFromPartner = (partner, APP_URL) => {
  if (partner) {
    return {
      '@context': 'http://schema.org',
      '@type': 'ArtGallery',
      name: partner.name,
      url: `${APP_URL}${partner.href}`,
    }
  }
}

import React, { Fragment } from 'react'

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
      <meta property="og:title" content={artist.meta.title} />
      <meta name="description" content={artist.meta.description} />
      <meta property="og:description" content={artist.meta.description} />
      <meta property="twitter:description" content={artist.meta.description} />
      <meta property="canonical" href={`${sd.APP_URL}/artist/${artist.id}`} />
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
  }
} 
`

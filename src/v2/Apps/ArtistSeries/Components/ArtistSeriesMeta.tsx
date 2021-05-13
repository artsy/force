import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { Meta, Title } from "react-head"
import { ArtistSeriesMeta_artistSeries } from "v2/__generated__/ArtistSeriesMeta_artistSeries.graphql"
import { truncate } from "lodash"
import { Link } from "react-head"

interface ArtistSeriesMetaProps {
  artistSeries: ArtistSeriesMeta_artistSeries
}

export const ArtistSeriesMeta: React.FC<ArtistSeriesMetaProps> = props => {
  const { artistSeries } = props
  // @ts-expect-error STRICT_NULL_CHECK
  const artist = artistSeries.artists[0]
  const artistName = artist?.name ? `${artist.name}’s ` : ""
  const title = `${artistName}${artistSeries.title} - For Sale on Artsy`
  const descriptionFirstSentence = `Discover and collect art from ${artistName}iconic ${artistSeries.title} series and more. `
  const description = truncate(
    `${descriptionFirstSentence}${artistSeries.description}`,
    { length: 160, separator: " " }
  )
  const canonicalRef = `/artist-series/${artistSeries.slug}`
  return (
    <>
      <Title>{title}</Title>
      <Meta name="description" content={description} />
      <Meta property="og:title" content={title} />
      <Meta property="og:description" content={description} />
      <Meta property="twitter:title" content={title} />
      <Meta property="twitter:description" content={description} />
      <Link rel="canonical" href={canonicalRef} />
    </>
  )
}

export const ArtistSeriesMetaFragmentContainer = createFragmentContainer(
  ArtistSeriesMeta,
  {
    artistSeries: graphql`
      fragment ArtistSeriesMeta_artistSeries on ArtistSeries {
        title
        description
        slug
        artists(size: 1) {
          name
        }
      }
    `,
  }
)

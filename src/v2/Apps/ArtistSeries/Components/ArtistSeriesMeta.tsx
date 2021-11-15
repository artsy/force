import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ArtistSeriesMeta_artistSeries } from "v2/__generated__/ArtistSeriesMeta_artistSeries.graphql"
import { truncate } from "lodash"
import { MetaTags } from "v2/Components/MetaTags"

interface ArtistSeriesMetaProps {
  artistSeries: ArtistSeriesMeta_artistSeries
}

export const ArtistSeriesMeta: React.FC<ArtistSeriesMetaProps> = props => {
  const { artistSeries } = props
  // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
  const artist = artistSeries.artists[0]
  const artistName = artist?.name ? `${artist.name}’s ` : ""
  const title = `${artistName}${artistSeries.title} - For Sale on Artsy`
  const descriptionFirstSentence = `Discover and collect art from ${artistName}iconic ${artistSeries.title} series and more. `
  const description = truncate(
    `${descriptionFirstSentence}${artistSeries.description}`,
    { length: 160, separator: " " }
  )

  return (
    <MetaTags
      title={title}
      description={description}
      pathname={`/artist-series/${artistSeries.slug}`}
    />
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

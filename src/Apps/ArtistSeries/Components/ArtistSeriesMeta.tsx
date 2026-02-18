import { PaginatedMetaTags } from "Components/PaginatedMetaTags"
import type { ArtistSeriesMeta_artistSeries$data } from "__generated__/ArtistSeriesMeta_artistSeries.graphql"
import truncate from "lodash/truncate"
import type * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"

interface ArtistSeriesMetaProps {
  artistSeries: ArtistSeriesMeta_artistSeries$data
}

export const ArtistSeriesMeta: React.FC<
  React.PropsWithChildren<ArtistSeriesMetaProps>
> = props => {
  const { artistSeries } = props
  const artist = artistSeries?.artists?.[0]
  const artistName = artist?.name ? `${artist.name}’s ` : ""
  const title = `${artistName}${artistSeries.title} - For Sale on Artsy`
  const descriptionFirstSentence = `Discover and collect art from ${artistName}iconic ${artistSeries.title} series and more. `
  const description = truncate(
    `${descriptionFirstSentence}${artistSeries.description}`,
    { length: 160, separator: " " },
  )

  return <PaginatedMetaTags title={title} description={description} />
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
  },
)

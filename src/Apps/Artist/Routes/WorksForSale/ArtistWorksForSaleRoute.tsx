import { ArtistArtworkFilterQueryRenderer } from "Apps/Artist/Routes/WorksForSale/Components/ArtistArtworkFilter"
import { ArtistMediumsTitle } from "Apps/Artist/Routes/WorksForSale/Components/ArtistMediumsTitle"
import type { ArtistWorksForSaleRoute_artist$data } from "__generated__/ArtistWorksForSaleRoute_artist.graphql"
import type React from "react"
import { Meta } from "react-head"
import { createFragmentContainer, graphql } from "react-relay"

interface ArtistWorksForSaleRouteProps {
  artist: ArtistWorksForSaleRoute_artist$data
}

const ArtistWorksForSaleRoute: React.FC<
  React.PropsWithChildren<ArtistWorksForSaleRouteProps>
> = ({ artist }) => {
  const { title, description } = artist.meta

  return (
    <>
      <ArtistMediumsTitle
        defaultTitle={title}
        name={artist.name ?? "Unknown Artist"}
      />

      <Meta name="description" content={description} />

      <ArtistArtworkFilterQueryRenderer id={artist.internalID} />
    </>
  )
}

export const ArtistWorksForSaleRouteFragmentContainer = createFragmentContainer(
  ArtistWorksForSaleRoute,
  {
    artist: graphql`
      fragment ArtistWorksForSaleRoute_artist on Artist {
        internalID
        slug
        name
        meta(page: ARTWORKS) {
          description
          title
        }
      }
    `,
  },
)

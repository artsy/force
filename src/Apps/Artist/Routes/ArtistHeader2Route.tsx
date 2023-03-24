import { ArtistHeader2FragmentContainer } from "Apps/Artist/Components/ArtistHeader/ArtistHeader2"
import { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ArtistHeader2Route_artist$data } from "__generated__/ArtistHeader2Route_artist.graphql"

interface ArtistHeader2RouteProps {
  artist: ArtistHeader2Route_artist$data
}

const ArtistHeader2Route: FC<ArtistHeader2RouteProps> = ({ artist }) => {
  return <ArtistHeader2FragmentContainer artist={artist} />
}

export const ArtistHeader2RouteFragmentContainer = createFragmentContainer(
  ArtistHeader2Route,
  {
    artist: graphql`
      fragment ArtistHeader2Route_artist on Artist {
        ...ArtistHeader2_artist
      }
    `,
  }
)

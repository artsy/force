import { Breadcrumbs } from "@artsy/palette"
import { RouterLink } from "System/Components/RouterLink"
import type { ArtistBreadcrumb_artist$key } from "__generated__/ArtistBreadcrumb_artist.graphql"
import { graphql, useFragment } from "react-relay"

interface ArtistBreadcrumbProps {
  artist: ArtistBreadcrumb_artist$key
}

export const ArtistBreadcrumb: React.FC<ArtistBreadcrumbProps> = ({
  artist: artistRef,
}) => {
  const artist = useFragment(artistBreadcrumbFragment, artistRef)

  return (
    <Breadcrumbs>
      <RouterLink to="/artists" textDecoration="none">
        Artists
      </RouterLink>

      <RouterLink to={artist.href}>{artist.name}</RouterLink>
    </Breadcrumbs>
  )
}

const artistBreadcrumbFragment = graphql`
  fragment ArtistBreadcrumb_artist on Artist {
    name
    href
  }
`

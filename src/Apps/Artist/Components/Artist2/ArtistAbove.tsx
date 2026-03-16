import { Column, GridColumns } from "@artsy/palette"
import { ArtistAbout } from "Apps/Artist/Components/Artist2/Components/ArtistAbout"
import { ArtistBreadcrumb } from "Apps/Artist/Components/Artist2/Components/ArtistBreadcrumb"
import { ArtistEditorial } from "Apps/Artist/Components/Artist2/Components/ArtistEditorial"
import { ArtistNotableWorks } from "Apps/Artist/Components/Artist2/Components/ArtistNotableWorks"
import { ArtistRepresentation } from "Apps/Artist/Components/Artist2/Components/ArtistRepresentation"
import { ArtistTombstone } from "Apps/Artist/Components/Artist2/Components/ArtistTombstone"
import type { ArtistAbove_artist$key } from "__generated__/ArtistAbove_artist.graphql"
import { graphql, useFragment } from "react-relay"

interface ArtistAboveProps {
  artist: ArtistAbove_artist$key
}

export const ArtistAbove: React.FC<ArtistAboveProps> = ({
  artist: artistRef,
}) => {
  const artist = useFragment(fragment, artistRef)

  return (
    <>
      <GridColumns gridRowGap={4}>
        <Column span={12}>
          <ArtistBreadcrumb artist={artist} />
        </Column>

        <Column span={12}>
          <ArtistTombstone artist={artist} />
        </Column>

        <Column span={[12, 7, 8]} display="flex" flexDirection="column" gap={4}>
          <ArtistNotableWorks artist={artist} />

          <ArtistAbout artist={artist} />
        </Column>

        <Column span={[12, 5, 4]} display="flex" flexDirection="column" gap={4}>
          <ArtistRepresentation artist={artist} />

          <ArtistEditorial artist={artist} />
        </Column>
      </GridColumns>
    </>
  )
}

const fragment = graphql`
  fragment ArtistAbove_artist on Artist {
    ...ArtistBreadcrumb_artist
    ...ArtistTombstone_artist
    ...ArtistNotableWorks_artist
    ...ArtistAbout_artist
    ...ArtistRepresentation_artist
    ...ArtistEditorial_artist
  }
`

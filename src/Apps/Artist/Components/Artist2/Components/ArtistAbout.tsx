import { Box, Stack } from "@artsy/palette"
import type { ArtistAbout_artist$key } from "__generated__/ArtistAbout_artist.graphql"
import { graphql, useFragment } from "react-relay"

interface ArtistAboutProps {
  artist: ArtistAbout_artist$key
}

export const ArtistAbout: React.FC<ArtistAboutProps> = ({
  artist: artistRef,
}) => {
  const artist = useFragment(fragment, artistRef)
  const { movementGenes, mediumGenes } = artist

  return (
    <Stack gap={1}>
      <Box>Movements: {movementGenes.map(g => g.name).join(", ")}</Box>
      <Box>Mediums: {mediumGenes.map(g => g.name).join(", ")}</Box>
    </Stack>
  )
}

const fragment = graphql`
  fragment ArtistAbout_artist on Artist {
    internalID
    movementGenes: genes(
      geneFamilyID: "styles-and-movements"
      minValue: 50
      size: 3
    ) {
      name
    }
    mediumGenes: genes(
      geneFamilyID: "medium-and-techniques"
      minValue: 50
      size: 3
    ) {
      name
    }
  }
`

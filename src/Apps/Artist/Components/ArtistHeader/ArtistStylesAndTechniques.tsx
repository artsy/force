import { ContextModule } from "@artsy/cohesion"
import { Stack } from "@artsy/palette"
import { ArtistGenesRow } from "Apps/Artist/Components/ArtistHeader/ArtistGenesRow"
import type { ArtistStylesAndTechniques_artist$key } from "__generated__/ArtistStylesAndTechniques_artist.graphql"
import type { FC } from "react"
import { graphql, useFragment } from "react-relay"

interface ArtistStylesAndTechniquesProps {
  artist: ArtistStylesAndTechniques_artist$key
  contextModule?: ContextModule
}

// TODO: Temporarily disabled. Set to `true` to restore the styles and
// techniques section in the artist header.
const ENABLED = false

export const useHasArtistStylesAndTechniques = (
  artist: ArtistStylesAndTechniques_artist$key,
) => {
  const data = useFragment(FRAGMENT, artist)

  return (
    ENABLED && (data.movementGenes.length > 0 || data.mediumGenes.length > 0)
  )
}

export const ArtistStylesAndTechniques: FC<ArtistStylesAndTechniquesProps> = ({
  artist,
  contextModule = ContextModule.artistHeader,
}) => {
  const data = useFragment(FRAGMENT, artist)

  return (
    <Stack gap={[2, 2, 1]}>
      <ArtistGenesRow
        genes={data.movementGenes}
        label="Styles"
        contextModule={contextModule}
      />

      <ArtistGenesRow
        genes={data.mediumGenes}
        label="Techniques"
        contextModule={contextModule}
      />
    </Stack>
  )
}

const FRAGMENT = graphql`
  fragment ArtistStylesAndTechniques_artist on Artist {
    movementGenes: genes(
      geneFamilyID: "styles-and-movements"
      minValue: 50
      size: 3
    ) {
      ...ArtistGenesRow_genes
    }
    mediumGenes: genes(
      geneFamilyID: "medium-and-techniques"
      minValue: 50
      size: 3
    ) {
      ...ArtistGenesRow_genes
    }
  }
`

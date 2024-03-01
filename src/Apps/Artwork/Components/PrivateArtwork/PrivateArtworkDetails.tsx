import { Column, GridColumns } from "@artsy/palette"
import { PrivateArtworkDetails_artwork$key } from "__generated__/PrivateArtworkDetails_artwork.graphql"
import { PrivateArtworkAboutArtist } from "Apps/Artwork/Components/PrivateArtwork/PrivateArtworkAboutArtist"
import { PrivateArtworkAboutWork } from "Apps/Artwork/Components/PrivateArtwork/PrivateArtworkAboutWork"
import { PrivateArtworkCondition } from "Apps/Artwork/Components/PrivateArtwork/PrivateArtworkCondition"
import { PrivateArtworkExhibitionHistory } from "Apps/Artwork/Components/PrivateArtwork/PrivateArtworkExhibitionHistory"
import { PrivateArtworkProvenance } from "Apps/Artwork/Components/PrivateArtwork/PrivateArtworkProvenance"
import { graphql, useFragment } from "react-relay"

interface PrivateArtworkDetailsProps {
  artwork: PrivateArtworkDetails_artwork$key
}

export const PrivateArtworkDetails: React.FC<PrivateArtworkDetailsProps> = ({
  artwork,
}) => {
  const data = useFragment(
    graphql`
      fragment PrivateArtworkDetails_artwork on Artwork {
        ...PrivateArtworkAboutWork_artwork
        ...PrivateArtworkAboutArtist_artwork
        ...PrivateArtworkCondition_artwork
        ...PrivateArtworkProvenance_artwork
        ...PrivateArtworkExhibitionHistory_artwork
      }
    `,
    artwork
  )

  return (
    <>
      <PrivateArtworkAboutWork artwork={data} />
      <PrivateArtworkAboutArtist artwork={data} />

      <GridColumns>
        <Column span={4}>
          <PrivateArtworkCondition artwork={data} />
        </Column>
        <Column span={4}>
          <PrivateArtworkProvenance artwork={data} />
        </Column>
        <Column span={4}>
          <PrivateArtworkExhibitionHistory artwork={data} />
        </Column>
      </GridColumns>
    </>
  )
}

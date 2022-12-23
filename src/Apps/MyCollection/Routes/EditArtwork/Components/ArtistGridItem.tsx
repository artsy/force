import { Flex } from "@artsy/palette"
import { ArtistAvatar } from "Apps/MyCollection/Routes/EditArtwork/Components/ArtistAvatar"
import { createFragmentContainer, graphql } from "react-relay"
import { ArtistGridItem_artist$data } from "__generated__/ArtistGridItem_artist.graphql"

interface ArtistGridItemProps {
  artist: ArtistGridItem_artist$data
}

const ArtistGridItem: React.FC<ArtistGridItemProps> = ({ artist }) => {
  return (
    <Flex
      key={artist.internalID}
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      mt={1}
    >
      <ArtistAvatar artist={artist} />
    </Flex>
  )
}

export const ArtistGridItemFragmentContainer = createFragmentContainer(
  ArtistGridItem,
  {
    artist: graphql`
      fragment ArtistGridItem_artist on Artist {
        displayLabel
        formattedNationalityAndBirthday
        image {
          cropped(width: 45, height: 45) {
            src
            srcSet
          }
        }
        initials
        internalID
        isPersonalArtist
        name
        slug
      }
    `,
  }
)

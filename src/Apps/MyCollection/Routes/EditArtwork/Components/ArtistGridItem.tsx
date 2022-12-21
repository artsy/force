import { Avatar, Flex, Text } from "@artsy/palette"
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
      <Flex>
        <Avatar
          size="xs"
          mr={1}
          initials={artist.initials || undefined}
          lazyLoad
          {...artist.image?.cropped}
        />
        <Flex flexDirection="column" mr={1} flex={1} overflow="hidden">
          <Text variant="sm-display" lineClamp={2}>
            {artist.name ?? "Unknown"}
          </Text>

          <Text variant="xs" color="black60" overflowEllipsis>
            {artist.formattedNationalityAndBirthday}
          </Text>
        </Flex>
      </Flex>
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

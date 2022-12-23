import { Avatar, Flex, Text } from "@artsy/palette"
import { Artist } from "Apps/MyCollection/Routes/EditArtwork/Utils/artworkModel"

export interface ArtistAvatarProps {
  artist: Artist
}

export const ArtistAvatar: React.FC<ArtistAvatarProps> = ({
  artist: { formattedNationalityAndBirthday, initials, image, name },
}) => {
  return (
    <Flex>
      <Avatar
        size="xs"
        mr={1}
        initials={initials || undefined}
        lazyLoad
        {...image}
      />
      <Flex flexDirection="column" mr={1} flex={1} overflow="hidden">
        <Text variant="sm-display" lineClamp={2}>
          {name ?? "Unknown"}
        </Text>

        <Text variant="xs" color="black60" overflowEllipsis>
          {formattedNationalityAndBirthday}
        </Text>
      </Flex>
    </Flex>
  )
}

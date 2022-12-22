import { Avatar, Flex, Text } from "@artsy/palette"

export interface ArtistAvatarProps {
  formattedNationalityAndBirthday?: string | null
  initials?: string | null
  image?: {
    cropped: {
      src: string
      srcSet: string
    } | null
  } | null
  name?: string | null
}

export const ArtistAvatar: React.FC<ArtistAvatarProps> = ({
  formattedNationalityAndBirthday,
  initials,
  image,
  name,
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

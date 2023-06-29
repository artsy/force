import { Avatar, Box, Flex, Text } from "@artsy/palette"
import { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { SearchRouteOption_artist$data } from "__generated__/SearchRouteOption_artist.graphql"

interface SearchRouteOptionProps {
  artist: SearchRouteOption_artist$data
}

export const SearchRouteOption: FC<SearchRouteOptionProps> = ({ artist }) => {
  return (
    <Flex px={2} py={1} gap={1} alignItems="center">
      <Avatar
        size="xs"
        initials={artist.initials!}
        {...artist.image?.cropped}
      />

      <Box>
        <Text variant="sm-display" overflowEllipsis>
          {artist.name}
        </Text>

        {artist.formattedNationalityAndBirthday && (
          <Text variant="xs" color="black60" overflowEllipsis>
            {artist.formattedNationalityAndBirthday}
          </Text>
        )}
      </Box>
    </Flex>
  )
}

export const SearchRouteOptionFragmentContainer = createFragmentContainer(
  SearchRouteOption,
  {
    artist: graphql`
      fragment SearchRouteOption_artist on Artist {
        name
        initials
        formattedNationalityAndBirthday
        image {
          cropped(height: 200, width: 200) {
            src
            srcSet
          }
        }
      }
    `,
  }
)

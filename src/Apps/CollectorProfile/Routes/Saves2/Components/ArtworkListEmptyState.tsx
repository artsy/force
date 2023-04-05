import { Box, Button, Flex, Spacer, Text } from "@artsy/palette"
import { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { RouterLink } from "System/Router/RouterLink"
import { ArtworkListEmptyState_me$data } from "__generated__/ArtworkListEmptyState_me.graphql"

interface ArtworkListEmptyStateProps {
  me: ArtworkListEmptyState_me$data
}

export const ArtworkListEmptyState: FC<ArtworkListEmptyStateProps> = ({
  me,
}) => {
  const allSavesArtworksCount = me.allSavesArtworkList?.artworksCount ?? 0
  const isDefaultArtworkList = me.artworkList?.default ?? false
  const text = getText(isDefaultArtworkList, allSavesArtworksCount)

  return (
    <Flex
      flex={1}
      justifyContent="space-between"
      alignItems="center"
      bg="black5"
      p={2}
    >
      <Box>
        <Text variant="sm-display">{text.title}</Text>
        <Text variant="sm-display" color="black60">
          {text.description}
        </Text>
      </Box>

      <Spacer x={2} />

      <Button
        // @ts-ignore
        as={RouterLink}
        variant="primaryGray"
        to="/collection/trending-this-week"
      >
        Browse Works
      </Button>
    </Flex>
  )
}

export const ArtworkListEmptyStateFragmentContainer = createFragmentContainer(
  ArtworkListEmptyState,
  {
    me: graphql`
      fragment ArtworkListEmptyState_me on Me
        @argumentDefinitions(listID: { type: "String!" }) {
        artworkList: collection(id: $listID) {
          default
        }

        allSavesArtworkList: collection(id: "saved-artwork") {
          artworksCount
        }
      }
    `,
  }
)

const getText = (
  isDefaultArtworkList: boolean,
  allSavesArtworksCount: number
) => {
  if (isDefaultArtworkList || allSavesArtworksCount === 0) {
    return {
      title: "Keep track of artworks you love",
      description:
        "Select the heart on an artwork to save it or add it to a list.",
    }
  }

  return {
    title: "Start curating your list of works",
    description: "Add works from All Saves or add new artworks as you browse.",
  }
}

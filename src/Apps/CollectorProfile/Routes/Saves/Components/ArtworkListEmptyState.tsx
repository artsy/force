import { Box, Button, Flex, Spacer, Text } from "@artsy/palette"
import { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { RouterLink } from "System/Components/RouterLink"
import { ArtworkListEmptyState_me$data } from "__generated__/ArtworkListEmptyState_me.graphql"

interface ArtworkListEmptyStateProps {
  me: ArtworkListEmptyState_me$data
}

export const ArtworkListEmptyState: FC<ArtworkListEmptyStateProps> = ({
  me,
}) => {
  const savedArtworksCount = me.savedArtworksArtworkList?.artworksCount ?? 0
  const isDefaultArtworkList = me.artworkList?.default ?? false
  const text = getText(isDefaultArtworkList, savedArtworksCount)

  return (
    <Flex
      flex={1}
      flexDirection={["column", "row"]}
      justifyContent="space-between"
      alignItems="center"
      bg="black5"
      p={2}
    >
      <Box>
        <Text variant={["sm", "sm-display"]}>{text.title}</Text>
        <Text variant={["sm", "sm-display"]} color="black60">
          {text.description}
        </Text>
      </Box>

      <Spacer x={[0, 2]} y={[2, 0]} />

      <Button
        // @ts-ignore
        as={RouterLink}
        width={["100%", "auto"]}
        variant="primaryBlack"
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

        savedArtworksArtworkList: collection(id: "saved-artwork") {
          artworksCount(onlyVisible: true)
        }
      }
    `,
  }
)

const getText = (isDefaultArtworkList: boolean, savedArtworksCount: number) => {
  if (isDefaultArtworkList || savedArtworksCount === 0) {
    return {
      title: "Keep track of artworks you love",
      description:
        "Select the heart on an artwork to save it or add it to a list.",
    }
  }

  return {
    title: "Start curating your list of works",
    description:
      "Add works from Saved Artworks or add new artworks as you browse.",
  }
}

import { Box, Button, Flex, Spacer, Text } from "@artsy/palette"
import { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { RouterLink } from "System/Router/RouterLink"
import { SavesEmptyState_me$data } from "__generated__/SavesEmptyState_me.graphql"

interface SavesEmptyStateProps {
  me: SavesEmptyState_me$data
}

export const SavesEmptyState: FC<SavesEmptyStateProps> = ({ me }) => {
  const defaultSavesCount = me.defaultSaves?.artworksCount
  const text = getTextByCollectionType(
    me.collection!.default,
    defaultSavesCount
  )

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
        variant="secondaryBlack"
        to="/collection/trending-this-week"
      >
        Browse Works
      </Button>
    </Flex>
  )
}

export const SavesEmptyStateFragmentContainer = createFragmentContainer(
  SavesEmptyState,
  {
    me: graphql`
      fragment SavesEmptyState_me on Me
        @argumentDefinitions(collectionID: { type: "String!" }) {
        collection(id: $collectionID) {
          default
        }

        defaultSaves: collection(id: "saved-artwork") {
          artworksCount
        }
      }
    `,
  }
)

const getTextByCollectionType = (
  isDefault: boolean,
  defaultSavesCount?: number
) => {
  if (isDefault || !defaultSavesCount) {
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

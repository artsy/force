import { Box, Button, Flex, Spacer, Text } from "@artsy/palette"
import { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { RouterLink } from "System/Router/RouterLink"
import { SavesEmptyState_collection$data } from "__generated__/SavesEmptyState_collection.graphql"
import { SavesEmptyState_me$data } from "__generated__/SavesEmptyState_me.graphql"

interface SavesEmptyStateProps {
  collection: SavesEmptyState_collection$data
  me: SavesEmptyState_me$data
}

export const SavesEmptyState: FC<SavesEmptyStateProps> = ({
  collection,
  me,
}) => {
  const defaultSavesCount = me.defaultSaves?.artworksCount
  console.log("defaultSaves", me.defaultSaves)
  console.log("defaultSavesCount", defaultSavesCount)
  const text = getTextByCollectionType(collection.default, defaultSavesCount)

  return (
    <Flex
      flex={1}
      justifyContent="space-between"
      alignItems="center"
      bg={defaultSavesCount === 25 ? "red" : "black5"}
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
        to="/"
      >
        Browse Works
      </Button>
    </Flex>
  )
}

export const SavesEmptyStateFragmentContainer = createFragmentContainer(
  SavesEmptyState,
  {
    collection: graphql`
      fragment SavesEmptyState_collection on Collection {
        default
      }
    `,
    me: graphql`
      fragment SavesEmptyState_me on Me {
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

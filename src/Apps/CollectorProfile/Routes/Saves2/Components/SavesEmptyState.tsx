import { Box, Button, Flex, Spacer, Text } from "@artsy/palette"
import { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { RouterLink } from "System/Router/RouterLink"
import { SavesEmptyState_collection$data } from "__generated__/SavesEmptyState_collection.graphql"

interface SavesEmptyStateProps {
  collection: SavesEmptyState_collection$data
}

export const SavesEmptyState: FC<SavesEmptyStateProps> = ({ collection }) => {
  const text = getTextByCollectionType(collection.default)

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
  }
)

const getTextByCollectionType = (isDefault: boolean) => {
  if (isDefault) {
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

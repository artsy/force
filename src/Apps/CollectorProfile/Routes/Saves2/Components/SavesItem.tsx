import { Box, Clickable, DROP_SHADOW, Flex, Text } from "@artsy/palette"
import { useCollectorProfileSaves2Context } from "Apps/CollectorProfile/Routes/Saves2/CollectorProfileSaves2Context"
import { FourUpImageLayout } from "Apps/CollectorProfile/Routes/Saves2/Components/FourUpImageLayout"
import { StackedImageLayout } from "Apps/CollectorProfile/Routes/Saves2/Components/StackedImageLayout"
import { FC } from "react"
import { useTranslation } from "react-i18next"
import { createFragmentContainer, graphql } from "react-relay"
import { extractNodes } from "Utils/extractNodes"
import { SavesItem_item$data } from "__generated__/SavesItem_item.graphql"

interface SavesItemProps {
  imagesLayout: "stacked" | "grid"
  item: SavesItem_item$data
}

const BASE_PATH = "/collector-profile/saves2"

const SavesItem: FC<SavesItemProps> = ({ imagesLayout, item }) => {
  const { t } = useTranslation()
  const artworkNodes = extractNodes(item.artworksConnection)
  const imageURLs = artworkNodes.map(node => node.image?.url ?? null)
  const {
    activeCollectionId,
    setActiveCollectionId,
  } = useCollectorProfileSaves2Context()
  const isSelected = activeCollectionId === item.internalID

  const getLink = () => {
    if (item.default) {
      return BASE_PATH
    }

    return `${BASE_PATH}/${item.internalID}`
  }

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()

    const link = getLink()

    window.history.pushState(null, "", link)
    setActiveCollectionId(item.internalID)
  }

  return (
    <Clickable
      as="a"
      // @ts-ignore
      href={getLink()}
      textDecoration="none"
      aria-current={isSelected}
      onClick={handleClick}
    >
      <Flex
        p={1}
        width={[138, 222]}
        height={[188, 272]}
        border="1px solid"
        borderRadius={10}
        flexDirection="column"
        justifyContent="space-between"
        borderColor={isSelected ? "brand" : "transparent"}
        style={isSelected ? { boxShadow: DROP_SHADOW } : undefined}
      >
        {imagesLayout === "stacked" ? (
          <StackedImageLayout imageURLs={imageURLs} />
        ) : (
          <FourUpImageLayout imageURLs={imageURLs} />
        )}

        <Box>
          <Text variant={["xs", "sm-display"]} overflowEllipsis>
            {item.name}
          </Text>
          <Text variant={["xs", "sm-display"]} color="black60" overflowEllipsis>
            {t("collectorSaves.artworkLists.artworkWithCount", {
              count: item.artworksCount,
            })}
          </Text>
        </Box>
      </Flex>
    </Clickable>
  )
}

export const SavesItemFragmentContainer = createFragmentContainer(SavesItem, {
  item: graphql`
    fragment SavesItem_item on Collection {
      default
      name
      internalID
      artworksCount
      artworksConnection(first: 4) {
        edges {
          node {
            image {
              url(version: "square")
            }
          }
        }
      }
    }
  `,
})

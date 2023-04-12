import { Box, DROP_SHADOW, Flex, Text } from "@artsy/palette"
import { FourUpImageLayout } from "./Images/FourUpImageLayout"
import { StackedImageLayout } from "./Images/StackedImageLayout"
import { FC } from "react"
import { useTranslation } from "react-i18next"
import { createFragmentContainer, graphql } from "react-relay"
import { RouterLink } from "System/Router/RouterLink"
import { extractNodes } from "Utils/extractNodes"
import { ArtworkListItem_item$data } from "__generated__/ArtworkListItem_item.graphql"

interface ArtworkListItemProps {
  isSelected?: boolean
  imagesLayout: "stacked" | "grid"
  item: ArtworkListItem_item$data
}

const BASE_PATH = "/collector-profile/saves2"

const ArtworkListItem: FC<ArtworkListItemProps> = ({
  isSelected,
  imagesLayout,
  item,
}) => {
  const { t } = useTranslation()
  const artworkNodes = extractNodes(item.artworksConnection)
  const imageURLs = artworkNodes.map(node => node.image?.url ?? null)

  const getLink = () => {
    if (item.default) {
      return BASE_PATH
    }

    return `${BASE_PATH}/${item.internalID}`
  }

  return (
    <RouterLink
      to={getLink()}
      textDecoration="none"
      aria-current={!!isSelected}
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
    </RouterLink>
  )
}

export const ArtworkListItemFragmentContainer = createFragmentContainer(
  ArtworkListItem,
  {
    item: graphql`
      fragment ArtworkListItem_item on Collection {
        default
        name
        internalID
        artworksCount(onlyVisible: true)
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
  }
)

import { Box, DROP_SHADOW, Flex, Text } from "@artsy/palette"
import { FourUpImageLayout } from "./Images/FourUpImageLayout"
import { StackedImageLayout } from "./Images/StackedImageLayout"
import { FC } from "react"
import { useTranslation } from "react-i18next"
import { createFragmentContainer, graphql } from "react-relay"
import { RouterLink, RouterLinkProps } from "System/Router/RouterLink"
import { extractNodes } from "Utils/extractNodes"
import { ArtworkListItem_item$data } from "__generated__/ArtworkListItem_item.graphql"
import { BASE_SAVES_PATH } from "Apps/CollectorProfile/constants"
import styled from "styled-components"

interface ArtworkListItemProps {
  isSelected?: boolean
  imagesLayout: "stacked" | "grid"
  item: ArtworkListItem_item$data
}

const ArtworkListItem: FC<ArtworkListItemProps> = props => {
  const { isSelected, imagesLayout, item } = props
  const { t } = useTranslation()
  const artworkNodes = extractNodes(item.artworksConnection)
  const imageURLs = artworkNodes.map(node => node.image?.url ?? null)

  const getLink = () => {
    if (item.default) {
      return BASE_SAVES_PATH
    }

    return `${BASE_SAVES_PATH}/${item.internalID}`
  }

  return (
    <ArtworkListItemLink
      to={getLink()}
      textDecoration="none"
      aria-current={!!isSelected}
      isSelected={!!isSelected}
    >
      <Flex
        p={1}
        width={[138, 222]}
        height={[188, 272]}
        flexDirection="column"
        justifyContent="space-between"
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
    </ArtworkListItemLink>
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

interface ArtworkListItemLinkProps extends RouterLinkProps {
  isSelected: boolean
}

const ArtworkListItemLink = styled<ArtworkListItemLinkProps>(RouterLink)`
  /* always */
  border-radius: 10px;
  margin-top: 2px; // otherwise top borders get cut off
  display: block; // otherwise the child element collapses without a visible focus outline

  /* when this list is currently being viewed (isSelected) */
  border: solid 1px ${props => (!!props.isSelected ? "black" : "transparent")};
  box-shadow: ${props => (!!props.isSelected ? DROP_SHADOW : "none")};
`

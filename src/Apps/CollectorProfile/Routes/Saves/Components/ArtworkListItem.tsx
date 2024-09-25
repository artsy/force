import { Box, Clickable, Flex, Text, Tooltip } from "@artsy/palette"
import { FourUpImageLayout } from "./Images/FourUpImageLayout"
import { StackedImageLayout } from "./Images/StackedImageLayout"
import { FC } from "react"
import { useTranslation } from "react-i18next"
import { createFragmentContainer, graphql } from "react-relay"
import { RouterLink, RouterLinkProps } from "System/Components/RouterLink"
import { extractNodes } from "Utils/extractNodes"
import { ArtworkListItem_item$data } from "__generated__/ArtworkListItem_item.graphql"
import { BASE_SAVES_PATH } from "Apps/CollectorProfile/constants"
import styled, { css } from "styled-components"
import { useArtworkListVisibilityContext } from "Apps/CollectorProfile/Routes/Saves/Utils/useArtworkListVisibility"
import { themeGet } from "@styled-system/theme-get"
import HideIcon from "@artsy/icons/HideIcon"

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
  const { setArtworkListItemHasBeenTouched } = useArtworkListVisibilityContext()

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
      onClick={setArtworkListItemHasBeenTouched}
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
          <Flex justifyContent="space-between">
            <Text variant={["xs", "sm-display"]} overflowEllipsis>
              {item.name}
            </Text>
            {!item.shareableWithPartners && (
              <Tooltip
                pointer
                variant="defaultDark"
                placement="bottom-start"
                content={
                  <Text variant="xs">
                    {t("collectorSaves.artworkListsHeader.hideIconTooltip")}
                  </Text>
                }
              >
                <Clickable style={{ lineHeight: 0 }}>
                  <HideIcon
                    marginLeft={0.5}
                    minWidth="18px"
                    data-testid="hide-icon"
                  />
                </Clickable>
              </Tooltip>
            )}
          </Flex>

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
        shareableWithPartners
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
  border-radius: 10px;
  display: block;
  border: 1px solid transparent;
  ${({ isSelected }) => {
    if (isSelected) {
      return css`
        box-shadow: ${themeGet("effects.dropShadow")};
        border-color: ${themeGet("colors.black100")};
      `
    }
  }}
`

import { BASE_SAVES_PATH } from "Apps/CollectorProfile/constants"
import { ARTWORK_LIST_SCROLL_TARGET_ID } from "Apps/CollectorProfile/Routes/Saves/CollectorProfileSavesRoute"
import { SAVES_ARTWORKS_SECTION_ID } from "Apps/CollectorProfile/Routes/Saves/Components/SavesArtworks"
import { RouterLink, type RouterLinkProps } from "System/Components/RouterLink"
import { extractNodes } from "Utils/extractNodes"
import { useJump } from "Utils/Hooks/useJump"
import HideIcon from "@artsy/icons/HideIcon"
import { Box, Clickable, Flex, Text, Tooltip } from "@artsy/palette"
import { themeGet } from "@styled-system/theme-get"
import type { ArtworkListItem_item$data } from "__generated__/ArtworkListItem_item.graphql"
import type { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import styled, { css } from "styled-components"
import { FourUpImageLayout } from "./Images/FourUpImageLayout"
import { StackedImageLayout } from "./Images/StackedImageLayout"

interface ArtworkListItemProps {
  isSelected?: boolean
  imagesLayout: "stacked" | "grid"
  item: ArtworkListItem_item$data
}

const ArtworkListItem: FC<
  React.PropsWithChildren<ArtworkListItemProps>
> = props => {
  const { isSelected, imagesLayout, item } = props

  const artworkNodes = extractNodes(item.artworksConnection)
  const imageURLs = artworkNodes.map(node => node.image?.url ?? null)
  const { jumpTo } = useJump()

  const getLink = () => {
    if (item.default) {
      return BASE_SAVES_PATH
    }

    return `${BASE_SAVES_PATH}/${item.internalID}`
  }

  const isContentOutOfView = () => {
    const element = document.getElementById(
      `JUMP--${SAVES_ARTWORKS_SECTION_ID}`,
    )

    if (element === null) return false

    const { top } = element.getBoundingClientRect()

    const viewportHeight =
      window.innerHeight || document.documentElement.clientHeight

    return top >= viewportHeight
  }

  return (
    <ArtworkListItemLink
      to={getLink()}
      textDecoration="none"
      aria-current={!!isSelected}
      isSelected={!!isSelected}
      onClick={() => {
        if (isContentOutOfView()) {
          jumpTo(ARTWORK_LIST_SCROLL_TARGET_ID)
        }
      }}
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
                    Artworks in this list are only visible to you and not
                    eligible to receive offers.
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

          <Text variant={["xs", "sm-display"]} color="mono60" overflowEllipsis>
            {item.artworksCount === 1
              ? `${item.artworksCount} Artwork`
              : `${item.artworksCount} Artworks`}
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
  },
)

interface ArtworkListItemLinkProps extends RouterLinkProps {
  isSelected: boolean
}

const ArtworkListItemLink = styled(RouterLink)<ArtworkListItemLinkProps>`
  border-radius: 10px;
  display: block;
  border: 1px solid transparent;
  ${({ isSelected }) => {
    if (isSelected) {
      return css`
        box-shadow: ${themeGet("effects.dropShadow")};
        border-color: ${themeGet("colors.mono100")};
      `
    }
  }}
`

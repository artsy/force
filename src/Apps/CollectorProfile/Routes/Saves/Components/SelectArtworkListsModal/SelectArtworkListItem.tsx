import { Clickable, Flex, Spacer, Text } from "@artsy/palette"
import EmptyCheckCircleIcon from "@artsy/icons/EmptyCheckCircleIcon"
import { FC } from "react"
import { useTranslation } from "react-i18next"
import { createFragmentContainer, graphql } from "react-relay"
import { SelectArtworkListItem_item$data } from "__generated__/SelectArtworkListItem_item.graphql"
import { extractNodes } from "Utils/extractNodes"
import { SavesEntityImage } from "Apps/CollectorProfile/Routes/Saves/Components/SavesEntityImage"
import CheckmarkStrokeIcon from "@artsy/icons/CheckmarkStrokeIcon"
import HideIcon from "@artsy/icons/HideIcon"

const ICON_SIZE = 24

interface SelectArtworkListItemProps {
  item: SelectArtworkListItem_item$data
  isSelected: boolean
  onClick: () => void
}

const SelectArtworkListItem: FC<SelectArtworkListItemProps> = ({
  isSelected,
  item,
  onClick,
}) => {
  const { t } = useTranslation()
  const nodes = extractNodes(item.artworksConnection)
  const imageURL = nodes[0]?.image?.url ?? null

  return (
    <Clickable
      display="flex"
      width="100%"
      flexDirection="row"
      alignItems="center"
      borderRadius={10}
      p={1}
      border="1px solid"
      borderColor={isSelected ? "brand" : "transparent"}
      onClick={onClick}
      role="option"
      aria-selected={!!isSelected}
    >
      <SavesEntityImage url={imageURL} />

      <Spacer x={1} />

      <Flex flexDirection="column" flex={1}>
        <Flex>
          <Text variant="sm-display">{item.name}</Text>
          {!item.shareableWithPartners && (
            <HideIcon
              marginLeft={0.5}
              minWidth="18px"
              data-testid="hide-icon"
            />
          )}
        </Flex>

        <Text variant="sm-display" color="black60">
          {t("collectorSaves.artworkLists.artworkWithCount", {
            count: item.artworksCount,
          })}
        </Text>
      </Flex>

      <Spacer x={1} />

      {isSelected ? (
        <CheckmarkStrokeIcon width={ICON_SIZE} height={ICON_SIZE} />
      ) : (
        <EmptyCheckCircleIcon width={ICON_SIZE} height={ICON_SIZE} />
      )}
    </Clickable>
  )
}

export const SelectArtworkListItemFragmentContainer = createFragmentContainer(
  SelectArtworkListItem,
  {
    item: graphql`
      fragment SelectArtworkListItem_item on Collection {
        name
        artworksCount(onlyVisible: true)
        shareableWithPartners
        artworksConnection(first: 1, sort: SAVED_AT_DESC) {
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

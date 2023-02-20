import { CheckCircleIcon, Clickable, Flex, Spacer, Text } from "@artsy/palette"
import EmptyCheckCircleIcon from "@artsy/icons/EmptyCheckCircleIcon"
import { FC } from "react"
import { useTranslation } from "react-i18next"
import { createFragmentContainer, graphql } from "react-relay"
import { SelectListItem_item$data } from "__generated__/SelectListItem_item.graphql"
import { SelectListsForArtworkImage } from "./SelectListsForArtworkImage"
import { extractNodes } from "Utils/extractNodes"

const ICON_SIZE = 24

interface SelectListItemProps {
  item: SelectListItem_item$data
  isSelected: boolean
  onClick: () => void
}

const SelectListItem: FC<SelectListItemProps> = ({
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
    >
      <SelectListsForArtworkImage url={imageURL} />

      <Spacer x={1} />

      <Flex flexDirection="column" flex={1}>
        <Text variant="sm-display">{item.name}</Text>
        <Text variant="sm-display" color="black60">
          {t("collectorSaves.artworkLists.artworkWithCount", {
            count: item.artworksCount,
          })}
        </Text>
      </Flex>

      <Spacer x={1} />

      {isSelected ? (
        <CheckCircleIcon width={ICON_SIZE} height={ICON_SIZE} />
      ) : (
        <EmptyCheckCircleIcon width={ICON_SIZE} height={ICON_SIZE} />
      )}
    </Clickable>
  )
}

export const SelectListItemFragmentContainer = createFragmentContainer(
  SelectListItem,
  {
    item: graphql`
      fragment SelectListItem_item on Collection {
        name
        artworksCount
        artworksConnection(first: 1) {
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

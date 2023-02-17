import { CheckCircleIcon, Clickable, Flex, Spacer, Text } from "@artsy/palette"
import EmptyCheckCircleIcon from "@artsy/icons/EmptyCheckCircleIcon"
import { FC } from "react"
import { useTranslation } from "react-i18next"
import { createFragmentContainer, graphql } from "react-relay"
import { SelectListItem_item$data } from "__generated__/SelectListItem_item.graphql"
import { SelectListItemImage } from "Apps/CollectorProfile/Routes/Saves2/Components/SelectListsForArtworkModal/SelectListItemImage"
import { extractNodes } from "Utils/extractNodes"

const ICON_SIZE = 24

interface SelectListItemProps {
  item: SelectListItem_item$data
  isSelected: boolean
  onClick: (id: string) => void
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
      onClick={() => onClick(item.internalID)}
    >
      <SelectListItemImage url={imageURL} />

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
        internalID
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

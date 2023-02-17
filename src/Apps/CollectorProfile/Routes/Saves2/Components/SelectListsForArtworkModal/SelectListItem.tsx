import { CheckCircleIcon, Clickable, Flex, Spacer, Text } from "@artsy/palette"
import EmptyCheckCircleIcon from "@artsy/icons/EmptyCheckCircleIcon"
import { FC } from "react"
import { useTranslation } from "react-i18next"

const ICON_SIZE = 24

export interface ListItemEntity {
  id: string
  title: string
  count: number
}

interface SelectListItemProps {
  item: ListItemEntity
  isSelected: boolean
  onClick: (id: string) => void
}

export const SelectListItem: FC<SelectListItemProps> = ({
  isSelected,
  item,
  onClick,
}) => {
  const { t } = useTranslation()

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
      onClick={() => onClick(item.id)}
    >
      <Flex width={60} height={60} bg="black10" flexShrink={0} />

      <Spacer x={1} />

      <Flex flexDirection="column" flex={1}>
        <Text variant="sm-display">{item.title}</Text>
        <Text variant="sm-display" color="black60">
          {t("collectorSaves.artworkLists.artworkWithCount", {
            count: item.count,
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

import { Button, Flex, Text } from "@artsy/palette"
import { FC } from "react"
import { useTranslation } from "react-i18next"

interface SelectListsForArtworkFooterProps {
  selectedListsCount: number
  onSaveClick: () => void
}

export const SelectListsForArtworkFooter: FC<SelectListsForArtworkFooterProps> = ({
  selectedListsCount,
  onSaveClick,
}) => {
  const { t } = useTranslation()

  return (
    <Flex
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
    >
      <Text variant="sm-display">
        {t("collectorSaves.selectedListsForArtwork.listsCount", {
          count: selectedListsCount,
        })}
      </Text>
      <Button onClick={onSaveClick}>Save</Button>
    </Flex>
  )
}

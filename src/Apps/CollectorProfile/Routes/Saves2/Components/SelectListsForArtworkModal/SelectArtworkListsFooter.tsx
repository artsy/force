import { Button, Flex, Text } from "@artsy/palette"
import { FC } from "react"
import { useTranslation } from "react-i18next"

interface SelectArtworkListsFooterProps {
  selectedListsCount: number
  hasChanges?: boolean
  isSaving?: boolean
  onSaveClick: () => void
}

export const SelectArtworkListsFooter: FC<SelectArtworkListsFooterProps> = ({
  selectedListsCount,
  hasChanges,
  isSaving,
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
        {t("collectorSaves.selectArtworkLists.footer.listsCount", {
          count: selectedListsCount,
        })}
      </Text>
      <Button onClick={onSaveClick} loading={isSaving} disabled={!hasChanges}>
        {t("collectorSaves.selectArtworkLists.footer.saveButton")}
      </Button>
    </Flex>
  )
}

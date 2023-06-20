import { Text, Flex, Join, Separator, Spacer } from "@artsy/palette"
import { SavedSearchAlertPills } from "Components/SavedSearchAlert/Components/SavedSearchAlertPills"
import { useSavedSearchAlertContext } from "Components/SavedSearchAlert/SavedSearchAlertContext"
import { FC } from "react"
import { useTranslation } from "react-i18next"

export const ConfirmationModalHeader: FC = () => {
  const { pills } = useSavedSearchAlertContext()
  const { t } = useTranslation()

  return (
    <Flex flexDirection="column" mt={-2}>
      <Join separator={<Spacer y={2} />}>
        <Text variant="sm-display" color="black60">
          {t("createAlertModal.confirmationStep.weWillNotifyYou")}
        </Text>
        <Flex flexWrap="wrap" mx={-0.5}>
          <SavedSearchAlertPills items={pills} onDeletePress={() => {}} />
        </Flex>
        <Separator />
      </Join>
    </Flex>
  )
}

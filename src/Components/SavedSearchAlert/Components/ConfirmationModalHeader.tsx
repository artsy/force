import { Text, Flex, Join, Separator, Spacer, Pill } from "@artsy/palette"
import { useSavedSearchAlertContext } from "Components/SavedSearchAlert/SavedSearchAlertContext"
import { FC } from "react"
import { useTranslation } from "react-i18next"

export const ConfirmationModalHeader: FC = () => {
  const { t } = useTranslation()
  const { pills } = useSavedSearchAlertContext()

  return (
    <Flex flexDirection="column">
      <Join separator={<Spacer y={2} />}>
        <Text variant="sm-display" color="black60">
          {t("createAlertModal.confirmationStep.weWillNotifyYou")}
        </Text>

        <Flex flexWrap="wrap">
          {pills.map(pill => {
            return (
              <Pill
                key={`filter-label-${pill.field}-${pill.value}`}
                variant="filter"
                mb={1}
                mr={1}
                disabled
              >
                {pill.displayValue}
              </Pill>
            )
          })}
        </Flex>
        <Separator />
      </Join>
    </Flex>
  )
}

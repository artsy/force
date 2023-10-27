import { Expandable, Spacer, Text } from "@artsy/palette"
import { PriceRange } from "Components/PriceRange/PriceRange"
import {
  CustomRange,
  DEFAULT_PRICE_RANGE,
} from "Components/PriceRange/constants"
import { useSavedSearchAlertContext } from "Components/SavedSearchAlert/SavedSearchAlertContext"
import { useFeatureFlag } from "System/useFeatureFlag"
import { FC } from "react"
import { useTranslation } from "react-i18next"

interface PricaRangeFilterProps {
  expanded?: boolean
}

export const PriceRangeFilter: FC<PricaRangeFilterProps> = ({
  expanded = true,
}) => {
  const { criteria, setCriteriaValue } = useSavedSearchAlertContext()
  const { t } = useTranslation()

  const handlePriceRangeUpdate = (updatedRange: CustomRange) => {
    setCriteriaValue("priceRange", updatedRange.join("-"))
  }

  const addFiltersEnabled = useFeatureFlag("onyx_create-alert-filters-screen")

  return (
    <>
      {!addFiltersEnabled ? (
        <Expandable
          label={t("createAlertModal.setPriceRange")}
          expanded={expanded}
          borderColor="white100"
        >
          <Spacer y={2} />

          <PriceRange
            priceRange={criteria.priceRange ?? DEFAULT_PRICE_RANGE}
            onPriceRangeUpdate={handlePriceRangeUpdate}
          />
        </Expandable>
      ) : (
        <>
          <Text variant="sm-display">Price Range</Text>
          <Spacer y={2} />
          <PriceRange
            priceRange={criteria.priceRange ?? DEFAULT_PRICE_RANGE}
            onPriceRangeUpdate={handlePriceRangeUpdate}
          />
        </>
      )}
    </>
  )
}

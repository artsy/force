import { Dropdown, type DropdownProps } from "@artsy/palette"
import { Z } from "Apps/Components/constants"
import { initialArtworkFilterState } from "Components/ArtworkFilter/ArtworkFilterContext"
import { usePriceRangeFilter } from "Components/ArtworkFilter/ArtworkFilters/PriceRangeFilter"
import {
  FilterQuickDropdownAnchor,
  FilterQuickDropdownPanel,
} from "Components/ArtworkFilter/ArtworkFiltersQuick/FilterQuick"
import { formatPriceRangeLabel } from "Components/ArtworkFilter/Utils/formatPriceRangeLabel"
import { PriceRange } from "Components/PriceRange/PriceRange"
import type { FC } from "react"

export interface PriceRangeFilterQuickProps
  extends Omit<DropdownProps, "dropdown" | "children"> {
  label?: string
  /**
   * Renders the applied range in place of the label, in a pill that reads as
   * selected — "Under $5,000" rather than "Price Range • 1".
   */
  labelAppliedValues?: boolean
}

export const PriceRangeFilterQuick: FC<
  React.PropsWithChildren<PriceRangeFilterQuickProps>
> = ({ label = "Price Range", labelAppliedValues, ...props }) => {
  const { count, field, filters, range, histogram, onPriceRangeUpdate } =
    usePriceRangeFilter()

  const appliedLabel = labelAppliedValues ? formatPriceRangeLabel(field) : null

  const handleClear = () => {
    filters.setFilter("priceRange", initialArtworkFilterState.priceRange)
  }

  return (
    <Dropdown
      dropdownZIndex={Z.dropdown}
      // FIXME: REACT_18_UPGRADE
      // eslint-disable-next-line react/no-unstable-nested-components
      dropdown={({ onHide }) => {
        return (
          <FilterQuickDropdownPanel
            count={count}
            onConfirm={onHide}
            onClear={() => {
              handleClear()
              onHide()
            }}
            maxHeight="auto"
            p={2}
          >
            <PriceRange
              priceRange={range.join("-")}
              bars={histogram}
              onDebouncedUpdate={onPriceRangeUpdate}
            />
          </FilterQuickDropdownPanel>
        )
      }}
      openDropdownByClick
      placement="bottom-start"
      {...props}
    >
      {props => {
        return (
          <FilterQuickDropdownAnchor
            label={label}
            count={count}
            appliedLabels={appliedLabel ? [appliedLabel] : undefined}
            {...props}
          />
        )
      }}
    </Dropdown>
  )
}

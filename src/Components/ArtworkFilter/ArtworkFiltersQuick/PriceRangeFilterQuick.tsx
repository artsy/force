import { Dropdown, type DropdownProps } from "@artsy/palette"
import { Z } from "Apps/Components/constants"
import { initialArtworkFilterState } from "Components/ArtworkFilter/ArtworkFilterContext"
import { usePriceRangeFilter } from "Components/ArtworkFilter/ArtworkFilters/PriceRangeFilter"
import {
  FilterQuickDropdownAnchor,
  FilterQuickDropdownPanel,
} from "Components/ArtworkFilter/ArtworkFiltersQuick/FilterQuick"
import { PriceRange } from "Components/PriceRange/PriceRange"
import type { FC } from "react"

export interface PriceRangeFilterQuickProps
  extends Omit<DropdownProps, "dropdown" | "children"> {}

export const PriceRangeFilterQuick: FC<
  React.PropsWithChildren<PriceRangeFilterQuickProps>
> = props => {
  const { count, filters, range, histogram, onPriceRangeUpdate } =
    usePriceRangeFilter()

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
            label="Price Range"
            count={count}
            {...props}
          />
        )
      }}
    </Dropdown>
  )
}

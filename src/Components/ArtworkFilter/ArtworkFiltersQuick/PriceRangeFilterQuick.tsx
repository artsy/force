import { FC } from "react"
import { initialArtworkFilterState } from "Components/ArtworkFilter/ArtworkFilterContext"
import { PriceRange } from "Components/PriceRange/PriceRange"
import { Dropdown, DropdownProps } from "@artsy/palette"
import {
  FilterQuickDropdownAnchor,
  FilterQuickDropdownPanel,
} from "Components/ArtworkFilter/ArtworkFiltersQuick/FilterQuick"
import { usePriceRangeFilter } from "Components/ArtworkFilter/ArtworkFilters/PriceRangeFilter"

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

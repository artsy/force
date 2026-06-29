import { Checkbox, Dropdown, type DropdownProps } from "@artsy/palette"
import { Z } from "Apps/Components/constants"
import {
  initialArtworkFilterState,
  useArtworkFilterContext,
  useCurrentlySelectedFilters,
} from "Components/ArtworkFilter/ArtworkFilterContext"
import {
  FilterQuickDropdownAnchor,
  FilterQuickDropdownPanel,
} from "Components/ArtworkFilter/ArtworkFiltersQuick/FilterQuick"
import type { FC } from "react"

export interface HybridFilterQuickProps
  extends Omit<DropdownProps, "dropdown" | "children"> {}

export const HybridFilterQuick: FC<
  React.PropsWithChildren<HybridFilterQuickProps>
> = props => {
  const { selectedFiltersCounts, setFilter } = useArtworkFilterContext()
  const selectedFilters = useCurrentlySelectedFilters()

  const count = selectedFiltersCounts.hybrid || 0
  const isSelected = !!selectedFilters.hybrid

  const handleClear = () => {
    setFilter("hybrid", initialArtworkFilterState.hybrid)
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
            <Checkbox
              selected={isSelected}
              onSelect={value => setFilter("hybrid", value)}
            >
              Enable hybrid search
            </Checkbox>
          </FilterQuickDropdownPanel>
        )
      }}
      openDropdownByClick
      placement="bottom-start"
      {...props}
    >
      {props => {
        return (
          <FilterQuickDropdownAnchor label="Hybrid" count={count} {...props} />
        )
      }}
    </Dropdown>
  )
}

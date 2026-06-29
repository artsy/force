import { Dropdown, type DropdownProps } from "@artsy/palette"
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
import { HybridWeightsRange } from "Components/HybridWeights/HybridWeightsRange"
import {
  DEFAULT_HYBRID_WEIGHTS,
  type HybridWeightsRange as HybridWeightsRangeTuple,
  joinHybridWeights,
} from "Components/HybridWeights/constants"
import type { FC } from "react"

export interface HybridWeightsFilterQuickProps
  extends Omit<DropdownProps, "dropdown" | "children"> {}

export const HybridWeightsFilterQuick: FC<
  React.PropsWithChildren<HybridWeightsFilterQuickProps>
> = props => {
  const { selectedFiltersCounts, setFilter } = useArtworkFilterContext()
  const selectedFilters = useCurrentlySelectedFilters()

  const count = selectedFiltersCounts.hybridWeights || 0
  const value = selectedFilters.hybridWeights || DEFAULT_HYBRID_WEIGHTS

  const handleClear = () => {
    setFilter("hybridWeights", initialArtworkFilterState.hybridWeights)
  }

  const handleUpdate = (range: HybridWeightsRangeTuple) => {
    setFilter("hybridWeights", joinHybridWeights(range))
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
            <HybridWeightsRange value={value} onDebouncedUpdate={handleUpdate} />
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
            label="Hybrid Weights"
            count={count}
            {...props}
          />
        )
      }}
    </Dropdown>
  )
}

import { FilterSelect } from "@artsy/palette"
import { FilterExpandable } from "./FilterExpandable"
import {
  type UseFilterSelectResultsProps,
  useFilterSelectResults,
} from "./Utils/useFilterSelectResults"
import type {
  FilterSelectChangeState,
  Item,
} from "@artsy/palette/dist/elements/FilterSelect/Components/FilterSelectContext"

interface ResultsFilterProps extends UseFilterSelectResultsProps {
  expanded?: boolean
  placeholder: string

  /**
   * If client-side keyword filtering should operate against something other
   * than simply the `item.label`, provide a function that returns the text
   * to filter against.
   */
  searchableText?: (item: Item) => string

  /**
   * If true, user will be able to select all currently displayed filtered items
   */
  enableSelectAll?: boolean
  onSelectAll?: (state: FilterSelectChangeState) => void
}

export const ResultsFilter: React.FC<
  React.PropsWithChildren<ResultsFilterProps>
> = props => {
  const {
    enableSelectAll,
    expanded,
    facetName,
    filtersCountKey,
    label,
    onSelectAll,
    placeholder,
    searchableText,
    slice,
  } = props

  const { handleFilterSelectChange, items, labelWithCount, selectedItems } =
    useFilterSelectResults({
      facetName,
      filtersCountKey,
      label,
      slice,
    })

  if (items.length === 0) {
    return null
  }

  return (
    <FilterExpandable label={labelWithCount} expanded={expanded}>
      <FilterSelect
        items={items}
        selectedItems={selectedItems}
        placeholder={placeholder}
        onChange={handleFilterSelectChange}
        searchableText={searchableText}
        enableSelectAll={enableSelectAll}
        onSelectAll={onSelectAll}
      />
    </FilterExpandable>
  )
}

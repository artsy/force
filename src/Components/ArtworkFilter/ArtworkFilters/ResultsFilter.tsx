import { FilterSelect } from "@artsy/palette"
import { FilterExpandable } from "./FilterExpandable"
import {
  useFilterSelectResults,
  UseFilterSelectResultsProps,
} from "./Utils/useFilterSelectResults"

interface ResultsFilterProps extends UseFilterSelectResultsProps {
  expanded?: boolean
  placeholder: string
}

export const ResultsFilter: React.FC<ResultsFilterProps> = ({
  expanded,
  facetName,
  filtersCountKey,
  label,
  placeholder,
  slice,
}) => {
  const {
    handleFilterSelectChange,
    items,
    labelWithCount,
    selectedItems,
  } = useFilterSelectResults({
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
      />
    </FilterExpandable>
  )
}

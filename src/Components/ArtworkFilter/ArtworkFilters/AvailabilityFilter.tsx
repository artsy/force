import { Checkbox } from "@artsy/palette"
import { useArtworkFilterContext } from "Components/ArtworkFilter/ArtworkFilterContext"
import { FilterExpandable } from "Components/ArtworkFilter/ArtworkFilters/FilterExpandable"

export const AvailabilityFilter: React.FC = () => {
  const { setFilter, unsetFilter, filters } = useArtworkFilterContext()

  return (
    <FilterExpandable label="Availability" expanded>
      <Checkbox
        selected={!!filters?.forSale}
        onSelect={selected => {
          selected ? setFilter("forSale", true) : unsetFilter("forSale")
        }}
        my={1}
      >
        Only show for-sale works
      </Checkbox>
    </FilterExpandable>
  )
}

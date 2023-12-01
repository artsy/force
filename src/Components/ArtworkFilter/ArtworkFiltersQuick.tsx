import { DropdownProps } from "@artsy/palette"
import { ATTRIBUTION_CLASS_OPTIONS } from "Components/ArtworkFilter/ArtworkFilters/AttributionClassFilter"
import { MEDIUM_OPTIONS } from "Components/ArtworkFilter/ArtworkFilters/MediumFilter"
import { FilterQuick } from "Components/ArtworkFilter/ArtworkFiltersQuick/FilterQuick"
import { PriceRangeFilterQuick } from "Components/ArtworkFilter/ArtworkFiltersQuick/PriceRangeFilterQuick"
import { ArtistSeriesFilterQuick } from "Components/ArtworkFilter/ArtworkFiltersQuick/ArtistSeriesFilterQuick"
import { FC } from "react"

// NOTE: Keep in sync with components below
export const ARTWORK_FILTERS_QUICK_FIELDS = [
  "attributionClass",
  "additionalGeneIDs",
  "priceRange",
]

interface ArtworkFiltersQuickProps
  extends Omit<DropdownProps, "dropdown" | "children"> {}

export const ArtworkFiltersQuick: FC<ArtworkFiltersQuickProps> = props => {
  return (
    <>
      <FilterQuick
        label="Rarity"
        name="attributionClass"
        options={ATTRIBUTION_CLASS_OPTIONS}
        {...props}
      />

      <FilterQuick
        label="Medium"
        name="additionalGeneIDs"
        slice="MEDIUM"
        options={MEDIUM_OPTIONS}
        {...props}
      />

      <PriceRangeFilterQuick {...props} />

      <ArtistSeriesFilterQuick {...props} />
    </>
  )
}

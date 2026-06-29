import type { DropdownProps } from "@artsy/palette"
import { ATTRIBUTION_CLASS_OPTIONS } from "Components/ArtworkFilter/ArtworkFilters/AttributionClassFilter"
import { MEDIUM_OPTIONS } from "Components/ArtworkFilter/ArtworkFilters/MediumFilter"
import { ArtistSeriesFilterQuick } from "Components/ArtworkFilter/ArtworkFiltersQuick/ArtistSeriesFilterQuick"
import { FeaturedKeywordsFilterQuick } from "Components/ArtworkFilter/ArtworkFiltersQuick/FeaturedKeywordsFilterQuick"
import { FilterQuick } from "Components/ArtworkFilter/ArtworkFiltersQuick/FilterQuick"
import { HybridFilterQuick } from "Components/ArtworkFilter/ArtworkFiltersQuick/HybridFilterQuick"
import { HybridWeightsFilterQuick } from "Components/ArtworkFilter/ArtworkFiltersQuick/HybridWeightsFilterQuick"
import { PriceRangeFilterQuick } from "Components/ArtworkFilter/ArtworkFiltersQuick/PriceRangeFilterQuick"
import type { FC } from "react"

// NOTE: Keep in sync with components below
export const ARTWORK_FILTERS_QUICK_FIELDS = [
  "attributionClass",
  "additionalGeneIDs",
  "priceRange",
  "hybrid",
  "hybridWeights",
]

interface ArtworkFiltersQuickProps
  extends Omit<DropdownProps, "dropdown" | "children"> {
  featuredKeywords: readonly string[] | null | undefined
  enableHybridFilters?: boolean
}

export const ArtworkFiltersQuick: FC<
  React.PropsWithChildren<ArtworkFiltersQuickProps>
> = ({ enableHybridFilters, ...props }) => {
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

      {enableHybridFilters && (
        <>
          <HybridFilterQuick {...props} />

          <HybridWeightsFilterQuick {...props} />
        </>
      )}

      <ArtistSeriesFilterQuick {...props} />

      <FeaturedKeywordsFilterQuick {...props} />
    </>
  )
}

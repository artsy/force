import { ATTRIBUTION_CLASS_OPTIONS } from "Components/ArtworkFilter/ArtworkFilters/AttributionClassFilter"
import { MEDIUM_OPTIONS } from "Components/ArtworkFilter/ArtworkFilters/MediumFilter"
import { FilterQuick } from "Components/ArtworkFilter/ArtworkFiltersQuick/FilterQuick"
import { FC } from "react"

export const ArtworkFiltersQuick: FC = () => {
  return (
    <>
      <FilterQuick
        label="Rarity"
        name="attributionClass"
        options={ATTRIBUTION_CLASS_OPTIONS}
      />

      <FilterQuick
        label="Medium"
        name="additionalGeneIDs"
        slice="MEDIUM"
        options={MEDIUM_OPTIONS}
      />
    </>
  )
}

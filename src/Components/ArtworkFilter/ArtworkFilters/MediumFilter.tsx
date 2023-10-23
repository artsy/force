import { Checkbox, Flex } from "@artsy/palette"
import { FC } from "react"
import {
  SelectedFiltersCountsLabels,
  useArtworkFilterContext,
  useCurrentlySelectedFilters,
} from "Components/ArtworkFilter/ArtworkFilterContext"
import { ShowMore, INITIAL_ITEMS_TO_SHOW } from "./ShowMore"
import { intersection } from "lodash"
import { FilterExpandable } from "./FilterExpandable"
import { useFilterLabelCountByKey } from "Components/ArtworkFilter/Utils/useFilterLabelCountByKey"
import { sortResults } from "./Utils/sortResults"

export interface MediumFilterProps {
  expanded?: boolean
}

export const MediumFilter: FC<MediumFilterProps> = ({ expanded }) => {
  const { aggregations, counts, setFilter } = useArtworkFilterContext()
  const { additionalGeneIDs = [], medium } = useCurrentlySelectedFilters()

  const filtersCount = useFilterLabelCountByKey(
    SelectedFiltersCountsLabels.additionalGeneIDs
  )
  const label = `Medium${filtersCount}`

  const mediums = aggregations?.find(agg => agg.slice === "MEDIUM") || {
    slice: "",
    counts: [],
  }

  const allowedMediums =
    mediums && mediums.counts.length ? mediums.counts : MEDIUM_OPTIONS

  const toggleMediumSelection = (selected, slug) => {
    let updatedValues = additionalGeneIDs

    if (selected) {
      updatedValues = [...updatedValues, slug]
    } else {
      updatedValues = updatedValues.filter(item => item !== slug)
    }

    setFilter("additionalGeneIDs", updatedValues)
  }

  const intersected = intersection(
    additionalGeneIDs,
    allowedMediums.slice(INITIAL_ITEMS_TO_SHOW).map(({ value }) => value)
  )
  const hasBelowTheFoldMediumFilter = intersected.length > 0
  const resultsSorted = sortResults(additionalGeneIDs, allowedMediums)

  return (
    <FilterExpandable
      label={label}
      expanded={(!counts?.artworks || counts.artworks > 0) && expanded}
    >
      <Flex flexDirection="column" alignItems="left">
        <ShowMore expanded={hasBelowTheFoldMediumFilter}>
          {resultsSorted.map(({ value: slug, name }, index) => {
            return (
              <Checkbox
                selected={additionalGeneIDs.includes(slug) || medium === slug}
                key={index}
                onSelect={selected => toggleMediumSelection(selected, slug)}
                my={1}
              >
                {name}
              </Checkbox>
            )
          })}
        </ShowMore>
      </Flex>
    </FilterExpandable>
  )
}

export const MEDIUM_OPTIONS = [
  { value: "painting", name: "Painting" },
  { value: "photography", name: "Photography" },
  { value: "sculpture", name: "Sculpture" },
  { value: "prints", name: "Prints" },
  { value: "work-on-paper", name: "Work on Paper" },
  { value: "nft", name: "NFT" },
  { value: "design", name: "Design" },
  { value: "drawing", name: "Drawing" },
  { value: "installation", name: "Installation" },
  { value: "film-slash-video", name: "Film/Video" },
  { value: "jewelry", name: "Jewelry" },
  { value: "performance-art", name: "Performance Art" },
  { value: "reproduction", name: "Reproduction" },
  { value: "ephemera-or-merchandise", name: "Ephemera or Merchandise" },
]

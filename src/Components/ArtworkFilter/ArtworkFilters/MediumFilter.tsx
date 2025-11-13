import {
  SelectedFiltersCountsLabels,
  useArtworkFilterContext,
  useCurrentlySelectedFilters,
} from "Components/ArtworkFilter/ArtworkFilterContext"
import { useFilterLabelCountByKey } from "Components/ArtworkFilter/Utils/useFilterLabelCountByKey"
import { Checkbox, Flex } from "@artsy/palette"
import { intersection } from "lodash"
import type { FC } from "react"
import { FilterExpandable } from "./FilterExpandable"
import { INITIAL_ITEMS_TO_SHOW, ShowMore } from "./ShowMore"
import { sortResults } from "./Utils/sortResults"

export interface MediumFilterProps {
  expanded?: boolean
}

export const MediumFilter: FC<React.PropsWithChildren<MediumFilterProps>> = ({
  expanded,
}) => {
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
  { value: "painting", name: "Painting", plural: "Paintings" },
  { value: "photography", name: "Photography", plural: "Photographs" },
  { value: "sculpture", name: "Sculpture", plural: "Sculptures" },
  { value: "prints", name: "Prints", plural: "Prints" },
  { value: "work-on-paper", name: "Work on Paper", plural: "Works on Paper" },
  { value: "nft", name: "NFT", plural: "NFTs" },
  { value: "design", name: "Design", plural: "Design" },
  { value: "drawing", name: "Drawing", plural: "Drawings" },
  { value: "installation", name: "Installation", plural: "Installations" },
  { value: "film-slash-video", name: "Film/Video", plural: "Films/Videos" },
  { value: "jewelry", name: "Jewelry", plural: "Jewelry" },
  {
    value: "performance-art",
    name: "Performance Art",
    plural: "Performance Art",
  },
  { value: "reproduction", name: "Reproduction", plural: "Reproductions" },
  {
    value: "ephemera-or-merchandise",
    name: "Ephemera or Merchandise",
    plural: "Ephemera or Merchandise",
  },
  { value: "digital-art", name: "Digital Art", plural: "Digital Art" },
]

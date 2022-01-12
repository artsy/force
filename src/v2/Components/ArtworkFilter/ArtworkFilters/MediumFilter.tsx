import { Checkbox, Flex, useThemeConfig } from "@artsy/palette"
import { FC, useContext } from "react"
import {
  SelectedFiltersCountsLabels,
  useArtworkFilterContext,
} from "../ArtworkFilterContext"
import { ShowMore, INITIAL_ITEMS_TO_SHOW } from "./ShowMore"
import { intersection } from "lodash"
import { sortResults } from "./ResultsFilter"
import { FilterExpandable } from "./FilterExpandable"
import { useFilterLabelCountByKey } from "../Utils/useFilterLabelCountByKey"
import { userIsAdmin } from "v2/Utils/user"
import { SystemContext } from "v2/System"

export interface MediumFilterProps {
  expanded?: boolean
}

export const MediumFilter: FC<MediumFilterProps> = ({ expanded }) => {
  const { aggregations, counts, ...filterContext } = useArtworkFilterContext()
  const { user } = useContext(SystemContext)

  const filtersCount = useFilterLabelCountByKey(
    SelectedFiltersCountsLabels.additionalGeneIDs
  )
  const label = `Medium${filtersCount}`

  const mediums = aggregations?.find(agg => agg.slice === "MEDIUM") || {
    slice: "",
    counts: [],
  }

  const filteredHardcodedMediums = userIsAdmin(user)
    ? hardcodedMediums
    : hardcodedMediums.filter(medium => medium.value !== "nft")

  const allowedMediums =
    mediums && mediums.counts.length ? mediums.counts : filteredHardcodedMediums

  const toggleMediumSelection = (selected, slug) => {
    let geneIDs =
      filterContext.currentlySelectedFilters?.()?.additionalGeneIDs?.slice() ??
      []
    if (selected) {
      geneIDs.push(slug)
    } else {
      geneIDs = geneIDs.filter(item => item !== slug)
    }
    filterContext.setFilter("additionalGeneIDs", geneIDs)
  }

  const currentFilters = filterContext.currentlySelectedFilters?.() ?? {}
  const hasBelowTheFoldMediumFilter =
    intersection(
      currentFilters.additionalGeneIDs ?? [],
      allowedMediums.slice(INITIAL_ITEMS_TO_SHOW).map(({ value }) => value)
    ).length > 0

  const tokens = useThemeConfig({
    v2: { my: 0.5 },
    v3: { my: 1 },
  })
  const resultsSorted = sortResults(
    currentFilters.additionalGeneIDs ?? [],
    allowedMediums
  )

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
                selected={
                  currentFilters.additionalGeneIDs?.includes(slug) ||
                  currentFilters.medium === slug
                }
                key={index}
                onSelect={selected => toggleMediumSelection(selected, slug)}
                my={tokens.my}
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

export const hardcodedMediums = [
  {
    value: "painting",
    name: "Painting",
  },
  {
    value: "photography",
    name: "Photography",
  },
  {
    value: "sculpture",
    name: "Sculpture",
  },
  {
    value: "prints",
    name: "Prints",
  },
  {
    value: "work-on-paper",
    name: "Work on Paper",
  },
  {
    value: "design",
    name: "Design",
  },
  {
    value: "drawing",
    name: "Drawing",
  },
  {
    value: "installation",
    name: "Installation",
  },
  {
    value: "film-slash-video",
    name: "Film/Video",
  },
  {
    value: "jewelry",
    name: "Jewelry",
  },
  {
    value: "performance-art",
    name: "Performance Art",
  },
  {
    value: "reproduction",
    name: "Reproduction",
  },
  {
    value: "ephemera-or-merchandise",
    name: "Ephemera or Merchandise",
  },
  {
    value: "nft",
    name: "NFT",
  },
]

import { Checkbox, Flex, Expandable, useThemeConfig } from "@artsy/palette"
import React, { FC } from "react"
import { useArtworkFilterContext } from "../ArtworkFilterContext"
import { ShowMore, INITIAL_ITEMS_TO_SHOW } from "./ShowMore"
import { intersection } from "lodash"

export const MediumFilter: FC = () => {
  const { aggregations, counts, ...filterContext } = useArtworkFilterContext()
  const mediums = aggregations.find(agg => agg.slice === "MEDIUM") || {
    slice: "",
    counts: [],
  }
  const allowedMediums =
    mediums && mediums.counts.length ? mediums.counts : hardcodedMediums

  const isExpanded = !counts.artworks || counts.artworks > 0

  const toggleMediumSelection = (selected, slug) => {
    let geneIDs = filterContext
      .currentlySelectedFilters()
      .additionalGeneIDs.slice()
    if (selected) {
      geneIDs.push(slug)
    } else {
      geneIDs = geneIDs.filter(item => item !== slug)
    }
    filterContext.setFilter("additionalGeneIDs", geneIDs)
  }

  const currentFilters = filterContext.currentlySelectedFilters()
  const hasBelowTheFoldMediumFilter =
    intersection(
      currentFilters.additionalGeneIDs,
      allowedMediums.slice(INITIAL_ITEMS_TO_SHOW).map(({ value }) => value)
    ).length > 0

  const tokens = useThemeConfig({
    v2: { my: 0.5 },
    v3: { my: 1 },
  })

  return (
    <Expandable mb={1} label="Medium" expanded={isExpanded}>
      <Flex flexDirection="column" alignItems="left">
        <ShowMore expanded={hasBelowTheFoldMediumFilter}>
          {allowedMediums.map(({ value: slug, name }, index) => {
            return (
              <Checkbox
                selected={
                  currentFilters.additionalGeneIDs.includes(slug) ||
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
    </Expandable>
  )
}

const hardcodedMediums = [
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
]

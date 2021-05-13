import { Flex, Radio, RadioGroup, useThemeConfig } from "@artsy/palette"
import { sortBy } from "lodash"
import React, { FC } from "react"
import { useArtworkFilterContext } from "../ArtworkFilterContext"
import { FilterExpandable } from "./FilterExpandable"

export const GalleryFilter: FC = () => {
  const { aggregations, ...filterContext } = useArtworkFilterContext()
  // @ts-expect-error STRICT_NULL_CHECK
  const items = aggregations.find(agg => agg.slice === "GALLERY")

  const tokens = useThemeConfig({
    v2: { my: 0.5 },
    v3: { my: 1 },
  })

  if (!(items && items.counts)) {
    return null
  }

  // @ts-expect-error STRICT_NULL_CHECK
  const selectedGallery = filterContext.currentlySelectedFilters().partnerID

  return (
    <FilterExpandable label="Gallery">
      <Flex flexDirection="column" alignItems="left">
        <RadioGroup
          deselectable
          defaultValue={selectedGallery}
          onSelect={selectedOption => {
            filterContext.setFilter("partnerID", selectedOption)
          }}
        >
          {sortBy(items.counts, ["name"]).map((item, index) => {
            return (
              <Radio
                key={index}
                my={tokens.my}
                value={item.value.toLocaleLowerCase()}
                label={item.name}
              />
            )
          })}
        </RadioGroup>
      </Flex>
    </FilterExpandable>
  )
}

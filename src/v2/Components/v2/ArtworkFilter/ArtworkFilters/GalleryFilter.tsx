import { Flex, Radio, RadioGroup, Expandable } from "@artsy/palette"
import { sortBy } from "lodash"
import React, { FC } from "react"
import { useArtworkFilterContext } from "../ArtworkFilterContext"

export const GalleryFilter: FC = () => {
  const { aggregations, ...filterContext } = useArtworkFilterContext()
  const items = aggregations.find(agg => agg.slice === "GALLERY")

  if (!(items && items.counts)) {
    return null
  }

  const selectedGallery = filterContext.currentlySelectedFilters().partnerID

  return (
    <Expandable mb={1} label="Gallery">
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
                my={0.3}
                value={item.value.toLocaleLowerCase()}
                label={item.name}
              />
            )
          })}
        </RadioGroup>
      </Flex>
    </Expandable>
  )
}

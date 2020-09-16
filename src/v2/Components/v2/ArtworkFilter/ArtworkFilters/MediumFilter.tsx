import { Flex, Radio, RadioGroup, Toggle } from "@artsy/palette"
import React, { FC } from "react"
import { useArtworkFilterContext } from "../ArtworkFilterContext"
import { OptionText } from "./OptionText"

export const MediumFilter: FC = () => {
  const { aggregations, counts, ...filterContext } = useArtworkFilterContext()
  const mediums = aggregations.find(agg => agg.slice === "MEDIUM") || {
    slice: "",
    counts: [],
  }
  const allowedMediums =
    mediums && mediums.counts.length ? mediums.counts : hardcodedMediums

  const selectedMedium = filterContext.currentlySelectedFilters().medium
  const isExpanded = !counts.artworks || counts.artworks > 0

  return (
    <Toggle label="Medium" expanded={isExpanded}>
      <Flex flexDirection="column" alignItems="left">
        <RadioGroup
          deselectable
          defaultValue={selectedMedium}
          onSelect={selectedOption => {
            filterContext.setFilter("medium", selectedOption)
          }}
        >
          {allowedMediums.map((medium, index) => {
            return (
              <Radio
                key={index}
                my={0.3}
                value={medium.value.toLocaleLowerCase()}
                label={<OptionText>{medium.name}</OptionText>}
              />
            )
          })}
        </RadioGroup>
      </Flex>
    </Toggle>
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
    value: "work-on-Paper",
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
]

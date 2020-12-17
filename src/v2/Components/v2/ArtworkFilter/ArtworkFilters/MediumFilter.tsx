import { Flex, Radio, RadioGroup, Toggle } from "@artsy/palette"
import React, { FC } from "react"
import { useArtworkFilterContext } from "../ArtworkFilterContext"
import { OptionText } from "./OptionText"

export const MediumFilter: FC = () => {
  const { aggregations, counts, ...filterContext } = useArtworkFilterContext()
  const mediums = aggregations.find(agg => agg.slice === "MEDIUM") || {
    counts: [],
    slice: "",
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
    name: "Painting",
    value: "painting",
  },
  {
    name: "Photography",
    value: "photography",
  },
  {
    name: "Sculpture",
    value: "sculpture",
  },
  {
    name: "Prints",
    value: "prints",
  },
  {
    name: "Work on Paper",
    value: "work-on-Paper",
  },
  {
    name: "Design",
    value: "design",
  },
  {
    name: "Drawing",
    value: "drawing",
  },
  {
    name: "Installation",
    value: "installation",
  },
  {
    name: "Film/Video",
    value: "film-slash-video",
  },
  {
    name: "Jewelry",
    value: "jewelry",
  },
  {
    name: "Performance Art",
    value: "performance-art",
  },
]

import React from "react"
import { Checkbox, Expandable, Flex, useThemeConfig } from "@artsy/palette"
import { useArtworkFilterContext } from "../ArtworkFilterContext"

const checkboxValues = [
  {
    name: "Unique",
    value: "unique",
  },
  {
    name: "Limited Edition",
    value: "limited edition",
  },
  {
    name: "Open Edition",
    value: "open edition",
  },
  {
    name: "Unknown Edition",
    value: "unknown edition",
  },
]

export interface AttributionClassFilterProps {
  expanded?: boolean
}

export const AttributionClassFilter: React.FC<AttributionClassFilterProps> = ({
  expanded,
}) => {
  const filterContext = useArtworkFilterContext()

  const toggleSelection = (selected, name) => {
    let attributions = filterContext
      .currentlySelectedFilters()
      .attributionClass.slice()

    selected
      ? attributions.push(name)
      : (attributions = attributions.filter(item => item !== name))

    filterContext.setFilter("attributionClass", attributions)
  }

  const tokens = useThemeConfig({
    v2: { my: 0.5 },
    v3: { my: 1 },
  })

  return (
    <Expandable mb={1} label="Rarity" expanded={expanded}>
      <Flex flexDirection="column">
        {checkboxValues.map(({ name, value }, index) => {
          return (
            <Checkbox
              key={index}
              my={tokens.my}
              onSelect={selected => toggleSelection(selected, value)}
              selected={filterContext
                .currentlySelectedFilters()
                .attributionClass.includes(value)}
            >
              {name}
            </Checkbox>
          )
        })}
      </Flex>
    </Expandable>
  )
}

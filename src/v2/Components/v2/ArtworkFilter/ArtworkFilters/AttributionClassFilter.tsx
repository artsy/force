import React from "react"
import { Checkbox, Expandable, Flex } from "@artsy/palette"
import { useArtworkFilterContext } from "../ArtworkFilterContext"
import { OptionText } from "./OptionText"

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

export const AttributionClassFilter: React.FC = () => {
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

  return (
    <Expandable label="Rarity" expanded>
      <Flex flexDirection="column">
        {checkboxValues.map(({ name, value }, index) => {
          const props = {
            key: index,
            onSelect: selected => {
              toggleSelection(selected, value)
            },
            selected: filterContext
              .currentlySelectedFilters()
              .attributionClass.includes(value),
          }
          return (
            <Checkbox {...props}>
              <OptionText>{name}</OptionText>
            </Checkbox>
          )
        })}
      </Flex>
    </Expandable>
  )
}

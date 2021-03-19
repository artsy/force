import { Checkbox, Toggle } from "@artsy/palette"
import React from "react"
import { useArtworkFilterContext } from "../ArtworkFilterContext"
import { OptionText } from "./OptionText"
import { ShowMore } from "./ShowMore"

const MaterialsTermOption: React.FC<{ name: string }> = ({ name }) => {
  const { currentlySelectedFilters, setFilter } = useArtworkFilterContext()

  const toggleMaterialsTermSelection = (selected, name) => {
    let materialsTerms = currentlySelectedFilters().materialsTerms.slice()
    if (selected) {
      materialsTerms.push(name)
    } else {
      materialsTerms = materialsTerms.filter(item => item !== name)
    }
    setFilter("materialsTerms", materialsTerms)
  }

  return (
    <Checkbox
      onSelect={selected => {
        toggleMaterialsTermSelection(selected, name)
      }}
      selected={currentlySelectedFilters().materialsTerms.includes(name)}
      key={name}
    >
      <OptionText>{name}</OptionText>
    </Checkbox>
  )
}

export const MaterialsFilter = () => {
  const { aggregations } = useArtworkFilterContext()
  const materialsTerms = aggregations.find(
    agg => agg.slice === "MATERIALS_TERMS"
  )

  if (!(materialsTerms && materialsTerms.counts)) {
    return null
  }

  return (
    <Toggle label="Materials" expanded>
      <ShowMore>
        {materialsTerms.counts.map(({ name, value, count }) => {
          return <MaterialsTermOption key={name} name={name} />
        })}
      </ShowMore>
    </Toggle>
  )
}

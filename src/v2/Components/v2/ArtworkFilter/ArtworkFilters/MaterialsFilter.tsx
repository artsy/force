import { Checkbox, Toggle } from "@artsy/palette"
import React from "react"
import { useArtworkFilterContext } from "../ArtworkFilterContext"
import { OptionText } from "./OptionText"
import { ShowMore } from "./ShowMore"

const MaterialsTermOption: React.FC<{
  /** Display value (capitalized) for this term */
  name: string

  /** Database value for this term */
  value: string
}> = ({ name, value }) => {
  const { currentlySelectedFilters, setFilter } = useArtworkFilterContext()

  const toggleMaterialsTermSelection = (selected, value) => {
    let materialsTerms = currentlySelectedFilters().materialsTerms.slice()
    if (selected) {
      materialsTerms.push(value)
    } else {
      materialsTerms = materialsTerms.filter(item => item !== value)
    }
    setFilter("materialsTerms", materialsTerms)
  }

  return (
    <Checkbox
      onSelect={selected => {
        toggleMaterialsTermSelection(selected, value)
      }}
      selected={currentlySelectedFilters().materialsTerms.includes(value)}
      key={value}
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
        {materialsTerms.counts.map(({ name, value }) => {
          return <MaterialsTermOption key={value} name={name} value={value} />
        })}
      </ShowMore>
    </Toggle>
  )
}

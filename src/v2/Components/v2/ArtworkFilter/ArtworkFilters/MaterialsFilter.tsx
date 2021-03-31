import { intersection } from "lodash"
import { Checkbox, Flex, Toggle } from "@artsy/palette"
import React from "react"
import { useArtworkFilterContext } from "../ArtworkFilterContext"
import { FacetAutosuggest } from "./FacetAutosuggest"
import { OptionText } from "./OptionText"
import { INITIAL_ITEMS_TO_SHOW, ShowMore } from "./ShowMore"

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
  const { aggregations, currentlySelectedFilters } = useArtworkFilterContext()
  const materialsTerms = aggregations.find(
    agg => agg.slice === "MATERIALS_TERMS"
  )

  if (!materialsTerms?.counts?.length) {
    return null
  }

  const hasBelowTheFoldMaterialsFilter =
    intersection(
      currentlySelectedFilters().materialsTerms,
      materialsTerms.counts
        .slice(INITIAL_ITEMS_TO_SHOW)
        .map(({ value }) => value)
    ).length > 0

  return (
    <Toggle label="Material" expanded>
      <Flex flexDirection="column">
        <FacetAutosuggest
          facetName="materialsTerms"
          placeholder="Enter a material"
          facets={materialsTerms.counts}
        />
        <ShowMore expanded={hasBelowTheFoldMaterialsFilter}>
          {materialsTerms.counts.map(({ name, value }) => {
            return <MaterialsTermOption key={value} name={name} value={value} />
          })}
        </ShowMore>
      </Flex>
    </Toggle>
  )
}

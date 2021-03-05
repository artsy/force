import { BorderBox, Box, Checkbox } from "@artsy/palette"
import { uniq } from "lodash"
import React, { FC, useState } from "react"
import Autosuggest from "react-autosuggest"
import { SearchInputContainer } from "v2/Components/Search/SearchInputContainer"
import {
  ArrayArtworkFilter,
  useArtworkFilterContext,
} from "../ArtworkFilterContext"
import { OptionText } from "./OptionText"

type Facet = {
  name: string
  count: number
  value: string
}

const MAX_SUGGESTIONS = 10
const MIN_ITEMS = 7

export const FacetAutosuggest: FC<{
  facets: Array<Facet>
  facetName: ArrayArtworkFilter
  placeholder: string
  alwaysShow?: boolean
}> = ({ facets, facetName, placeholder, alwaysShow = false }) => {
  const getSuggestions = ({ value }) => {
    const inputValue = value.trim().toLowerCase()
    const inputLength = inputValue.length

    return inputLength === 0
      ? []
      : facets
          .filter(
            facet =>
              facet.name.toLowerCase().slice(0, inputLength) === inputValue
          )
          .sort()
          .slice(0, MAX_SUGGESTIONS)
  }

  const getSuggestionValue = ({ name }) => name

  const renderSuggestion = ({ name }, { isHighlighted }) => {
    return (
      <Checkbox selected={isHighlighted}>
        <OptionText>{name}</OptionText>
      </Checkbox>
    )
  }

  const [value, setValue] = useState("")
  const [suggestions, setSuggestions] = useState([])
  const [focused, setFocus] = useState(false)

  const inputProps = {
    placeholder,
    value,
    onChange: (_e, { newValue }) => setValue(newValue),
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
  }

  const filterContext = useArtworkFilterContext()

  const onSuggestionSelected = ({ suggestion: { value } }) => {
    let selectedValues = filterContext
      .currentlySelectedFilters()
      [facetName].slice()
    selectedValues.push(value)
    filterContext.setFilter(facetName, uniq(selectedValues))
  }

  const renderInputComponent = props => <SearchInputContainer {...props} />

  const renderSuggestionsContainer = ({ children, containerProps }) => {
    const noResults = suggestions.length === 0

    if (focused && noResults && value) {
      return "No results found."
    }

    return noResults ? (
      <Box>{children}</Box>
    ) : (
      <BorderBox {...containerProps}>{children}</BorderBox>
    )
  }

  if (!alwaysShow && facets.length < MIN_ITEMS) return null

  return (
    <Autosuggest
      suggestions={suggestions}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={renderSuggestion}
      inputProps={inputProps}
      onSuggestionsFetchRequested={val => setSuggestions(getSuggestions(val))}
      onSuggestionsClearRequested={() => {
        setSuggestions([])
        setFocus(false)
      }}
      onSuggestionSelected={(_e, selection) => {
        onSuggestionSelected(selection)
      }}
      renderInputComponent={renderInputComponent}
      renderSuggestionsContainer={props => renderSuggestionsContainer(props)}
    />
  )
}

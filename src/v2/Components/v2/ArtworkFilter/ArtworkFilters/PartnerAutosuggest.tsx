import { BorderBox, Box, Checkbox } from "@artsy/palette"
import React, { FC, useState } from "react"
import Autosuggest from "react-autosuggest"
import { SearchInputContainer } from "v2/Components/Search/SearchInputContainer"
import { useArtworkFilterContext } from "../ArtworkFilterContext"
import { OptionText } from "./OptionText"

type Partner = {
  name: string
  count: number
  value: string
}

const MAX_SUGGESTIONS = 10

export const PartnerAutosuggest: FC<{ partners: Array<Partner> }> = ({
  partners,
}) => {
  const getSuggestions = ({ value }) => {
    const inputValue = value.trim().toLowerCase()
    const inputLength = inputValue.length

    return inputLength === 0
      ? []
      : partners
          .filter(
            partner =>
              !filterContext
                .currentlySelectedFilters()
                .partnerIDs.includes(partner.value) &&
              partner.name.toLowerCase().slice(0, inputLength) === inputValue
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
    placeholder: "Enter a gallery",
    value,
    onChange: (_e, { newValue }) => setValue(newValue),
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
  }

  const filterContext = useArtworkFilterContext()

  const onSuggestionSelected = ({ suggestion: { value } }) => {
    let partnerIDs = filterContext.currentlySelectedFilters().partnerIDs.slice()
    partnerIDs.push(value)
    filterContext.setFilter("partnerIDs", partnerIDs)
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

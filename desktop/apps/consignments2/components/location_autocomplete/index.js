import Autosuggest from 'react-autosuggest'
import Close from '../../../../components/main_layout/public/icons/close.svg'
import PropTypes from 'prop-types'
import React from 'react'
import block from 'bem-cn'
import { connect } from 'react-redux'
import {
  chooseLocation,
  clearLocationSuggestions,
  fetchLocationSuggestions,
  unfreezeLocationInput,
  updateLocationAutocomplete
} from '../../client/actions'

function getSuggestionValue (suggestion) {
  return suggestion.description
}

function renderSuggestion (suggestion) {
  return (
    <div className='autosuggest-suggestion'>
      <div>{suggestion.description}</div>
    </div>
  )
}

function LocationAutocomplete (props) {
  const {
    chooseLocationAction,
    clearLocationSuggestionsAction,
    fetchLocationSuggestionsAction,
    locationAutocompleteFrozen,
    locationAutocompleteSuggestions,
    locationAutocompleteValue,
    unfreezeLocationInputAction,
    updateLocationAutocompleteAction
  } = props

  const b = block('consignments2-location-input')

  const locationAutosuggestInputProps = {
    value: locationAutocompleteValue,
    onChange: updateLocationAutocompleteAction
  }

  const renderInputComponent = inputProps => (
    <div>
      <input {...inputProps} className={b('input').mix('bordered-input')} />
    </div>
  )

  return (
    <div className={b({ disabled: locationAutocompleteFrozen })}>
      <Autosuggest
        suggestions={locationAutocompleteSuggestions}
        onSuggestionsFetchRequested={fetchLocationSuggestionsAction}
        onSuggestionsClearRequested={clearLocationSuggestionsAction}
        onSuggestionSelected={chooseLocationAction}
        getSuggestionValue={getSuggestionValue}
        renderInputComponent={renderInputComponent}
        renderSuggestion={renderSuggestion}
        inputProps={locationAutosuggestInputProps}
      />
      { locationAutocompleteFrozen && <div className={b('unfreeze')} onClick={unfreezeLocationInputAction}><Close /></div> }
    </div>
  )
}

const mapStateToProps = (state) => ({
  locationAutocompleteFrozen: state.submissionFlow.locationAutocompleteFrozen,
  locationAutocompleteSuggestions: state.submissionFlow.locationAutocompleteSuggestions,
  locationAutocompleteValue: state.submissionFlow.locationAutocompleteValue
})

const mapDispatchToProps = (dispatch) => {
  return {
    chooseLocationAction (event, { suggestion, suggestionValue }) {
      dispatch(chooseLocation(suggestion))
    },
    clearLocationSuggestionsAction () {
      dispatch(clearLocationSuggestions())
    },
    fetchLocationSuggestionsAction ({ value }) {
      dispatch(fetchLocationSuggestions(value))
    },
    unfreezeLocationInputAction () {
      dispatch(unfreezeLocationInput())
    },
    updateLocationAutocompleteAction (event, { newValue }) {
      dispatch(updateLocationAutocomplete(newValue))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LocationAutocomplete)

LocationAutocomplete.propTypes = {
  chooseLocationAction: PropTypes.func.isRequired,
  clearLocationSuggestionsAction: PropTypes.func.isRequired,
  fetchLocationSuggestionsAction: PropTypes.func.isRequired,
  locationAutocompleteFrozen: PropTypes.bool.isRequired,
  locationAutocompleteSuggestions: PropTypes.array,
  locationAutocompleteValue: PropTypes.string,
  unfreezeLocationInputAction: PropTypes.func.isRequired,
  updateLocationAutocompleteAction: PropTypes.func.isRequired
}

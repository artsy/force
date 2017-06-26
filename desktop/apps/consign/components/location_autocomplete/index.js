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

function LocationAutocomplete (props) {
  const {
    chooseLocationAction,
    clearLocationSuggestionsAction,
    fetchLocationSuggestionsAction,
    input,
    locationAutocompleteFrozen,
    locationAutocompleteSuggestions,
    locationAutocompleteValue,
    meta: {
      error,
      touched
    },
    unfreezeLocationInputAction,
    updateLocationAutocompleteAction
  } = props

  const b = block('consignments-location-input')

  const locationAutosuggestInputProps = {
    disabled: locationAutocompleteFrozen,
    onChange: updateLocationAutocompleteAction,
    value: locationAutocompleteValue
  }

  const renderInputComponent = inputProps => (
    <div>
      <input {...inputProps} className={b('input').mix('bordered-input')} />
      {
        touched && (
          (error && <div className={b('error')}>{error}</div>)
        )
      }
    </div>
  )

  const getSuggestionValue = suggestion => (
    suggestion.description
  )

  const renderSuggestion = suggestion => (
    <div className='autosuggest-suggestion'>
      <div>{suggestion.description}</div>
    </div>
  )

  const chooseLocationOption = (event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }) => {
    chooseLocationAction(suggestion)
    input.onChange(suggestionValue)
  }

  const unfreeze = () => {
    unfreezeLocationInputAction()
    input.onChange('')
  }

  return (
    <div className={b({ disabled: locationAutocompleteFrozen, error: Boolean(touched && error) })} name={'location'}>
      <Autosuggest
        suggestions={locationAutocompleteSuggestions}
        onSuggestionsFetchRequested={fetchLocationSuggestionsAction}
        onSuggestionsClearRequested={clearLocationSuggestionsAction}
        onSuggestionSelected={chooseLocationOption}
        getSuggestionValue={getSuggestionValue}
        renderInputComponent={renderInputComponent}
        renderSuggestion={renderSuggestion}
        inputProps={locationAutosuggestInputProps}
      />
      { locationAutocompleteFrozen && <div className={b('unfreeze')} onClick={unfreeze}><Close /></div> }
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
    chooseLocationAction (suggestion) {
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
  input: PropTypes.object.isRequired,
  locationAutocompleteFrozen: PropTypes.bool.isRequired,
  locationAutocompleteSuggestions: PropTypes.array,
  locationAutocompleteValue: PropTypes.string,
  meta: PropTypes.object.isRequired,
  unfreezeLocationInputAction: PropTypes.func.isRequired,
  updateLocationAutocompleteAction: PropTypes.func.isRequired
}

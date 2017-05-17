import Autosuggest from 'react-autosuggest'
import PropTypes from 'prop-types'
import React from 'react'
import block from 'bem-cn'
import { connect } from 'react-redux'
import { get } from 'lodash'
import {
  clearArtistSuggestions,
  chooseArtistAndAdvance,
  fetchArtistSuggestions,
  showNotConsigningMessage,
  updateArtistAutocompleteValue
} from '../../client/actions'

function getSuggestionValue (suggestion) {
  return suggestion.name
}

function renderSuggestion (suggestion) {
  const imageUrl = get(suggestion, 'image_urls.square', '/images/missing_image.png')
  return (
    <div className='autosuggest-suggestion'>
      <img src={imageUrl} />
      <div>{suggestion.name}</div>
    </div>
  )
}

function ChooseArtist (props) {
  const {
    artistAutocompleteSuggestions,
    artistAutocompleteValue,
    clearArtistSuggestionsAction,
    chooseArtistAndAdvanceAction,
    fetchArtistSuggestionsAction,
    notConsigningArtist,
    showNotConsigningMessageAction,
    onSuggestionsClearRequested,
    updateArtistAutocompleteValueAction
  } = props
  const b = block('consignments2-submission-choose-artist')

  const inputProps = {
    value: artistAutocompleteValue,
    onChange: updateArtistAutocompleteValueAction
  }

  const renderInputComponent = inputProps => (
    <div>
      <input {...inputProps} className={b('input').mix('bordered-input')} />
    </div>
  )

  const nextEnabled = artistAutocompleteValue.length > 0

  return (
    <div className={b()}>
      <div className={b('label')}>Artist/Designer Name</div>
      <div className={b('autosuggest')}>
        <Autosuggest
          suggestions={artistAutocompleteSuggestions}
          onSuggestionsFetchRequested={fetchArtistSuggestionsAction}
          onSuggestionsClearRequested={clearArtistSuggestionsAction}
          onSuggestionSelected={chooseArtistAndAdvanceAction}
          getSuggestionValue={getSuggestionValue}
          renderInputComponent={renderInputComponent}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
        />
      </div>
      <div
        className={b('next-button').mix('avant-garde-button-black')}
        onClick={showNotConsigningMessageAction}
        disabled={!nextEnabled}
      >
        Next
      </div>
      {
        notConsigningArtist &&
        <div className={b('not-consigning')}>
          Unfortunately, we are not currently consigning works for {artistAutocompleteValue}.<br /><a href='/'>Back to Artsy</a>
        </div>
      }
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    artistAutocompleteSuggestions: state.submissionFlow.artistAutocompleteSuggestions,
    artistAutocompleteValue: state.submissionFlow.artistAutocompleteValue,
    notConsigningArtist: state.submissionFlow.notConsigningArtist
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    chooseArtistAndAdvanceAction (event, { suggestion, suggestionValue }) {
      dispatch(chooseArtistAndAdvance(suggestion))
    },
    clearArtistSuggestionsAction () {
      dispatch(clearArtistSuggestions())
    },
    fetchArtistSuggestionsAction ({ value }) {
      dispatch(fetchArtistSuggestions(value))
    },
    showNotConsigningMessageAction () {
      dispatch(showNotConsigningMessage())
    },
    updateArtistAutocompleteValueAction (event, { newValue }) {
      dispatch(updateArtistAutocompleteValue(newValue))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChooseArtist)

ChooseArtist.propTypes = {
}

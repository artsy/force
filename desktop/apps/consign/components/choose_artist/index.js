import Autosuggest from 'react-autosuggest'
import PropTypes from 'prop-types'
import React from 'react'
import block from 'bem-cn'
import { connect } from 'react-redux'
import { get } from 'lodash'
import {
  clearArtistSuggestions,
  chooseArtist,
  chooseArtistAdvance,
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
    artistName,
    clearArtistSuggestionsAction,
    chooseArtistAction,
    chooseArtistAdvanceAction,
    fetchArtistSuggestionsAction,
    notConsigningArtist,
    showNotConsigningMessageAction,
    updateArtistAutocompleteValueAction
  } = props
  const b = block('consignments-submission-choose-artist')

  const inputProps = {
    autoFocus: true,
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
      <div className={b('title')}>
        Enter the name of the artist/designer who created the work
      </div>
      <div className={b('form')}>
        <div className={b('label')}>Artist/Designer Name</div>
        <div className={b('autosuggest')}>
          <Autosuggest
            suggestions={artistAutocompleteSuggestions}
            onSuggestionsFetchRequested={fetchArtistSuggestionsAction}
            onSuggestionsClearRequested={clearArtistSuggestionsAction}
            onSuggestionSelected={chooseArtistAction}
            getSuggestionValue={getSuggestionValue}
            renderInputComponent={renderInputComponent}
            renderSuggestion={renderSuggestion}
            inputProps={inputProps}
          />
        </div>
        <div
          className={b('next-button').mix('avant-garde-button-black')}
          onClick={artistAutocompleteValue === artistName ? chooseArtistAdvanceAction : showNotConsigningMessageAction}
          disabled={!nextEnabled}
        >
          Next
        </div>
        {
          notConsigningArtist &&
          <div className={b('not-consigning')}>
            Unfortunately we are not accepting consignments for works by {artistAutocompleteValue}.<br /><a href='/'>Back to Artsy</a>
          </div>
        }
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    artistAutocompleteSuggestions: state.submissionFlow.artistAutocompleteSuggestions,
    artistAutocompleteValue: state.submissionFlow.artistAutocompleteValue,
    artistName: state.submissionFlow.artistName,
    notConsigningArtist: state.submissionFlow.notConsigningArtist
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    chooseArtistAction (event, { suggestion, suggestionValue }) {
      dispatch(chooseArtist(suggestion))
    },
    chooseArtistAdvanceAction () {
      dispatch(chooseArtistAdvance())
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
  artistAutocompleteSuggestions: PropTypes.array,
  artistAutocompleteValue: PropTypes.string,
  artistName: PropTypes.string,
  clearArtistSuggestionsAction: PropTypes.func.isRequired,
  chooseArtistAndAdvanceAction: PropTypes.func.isRequired,
  fetchArtistSuggestionsAction: PropTypes.func.isRequired,
  notConsigningArtist: PropTypes.bool,
  showNotConsigningMessageAction: PropTypes.func.isRequired,
  updateArtistAutocompleteValueAction: PropTypes.func.isRequired
}

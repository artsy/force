import * as actions from './actions'
import u from 'updeep'
import { combineReducers } from 'redux'
import { data as sd } from 'sharify'
import { last } from 'underscore'
import { reducer as formReducer } from 'redux-form'
import { routerReducer } from 'react-router-redux'

const stepsMapping = [
  {
    id: 'create_account',
    label: 'Create Account',
    title: 'Create an Account'
  },
  {
    id: 'choose_artist',
    label: 'Verify Artist/Designer',
    title: 'Enter the name of the artist/designer who created the work'
  },
  {
    id: 'describe_work',
    label: 'Describe the Work',
    title: 'Enter details about the work'
  },
  {
    id: 'upload_photos',
    label: 'Upload Photo',
    title: 'Upload photos'
  }
]

const initialState = {
  artistAutocompleteSuggestions: [],
  artistAutocompleteValue: '',
  currentStep: 0,
  inputs: {
    artist_id: '',
    authenticity_certificate: 'yes',
    depth: '',
    dimensions_metric: 'in',
    edition: false,
    height: '',
    location: '',
    medium: 'painting',
    provenance: '',
    signature: 'yes',
    title: '',
    width: '',
    year: ''
  },
  locationAutocompleteSuggestions: [],
  locationAutocompleteValue: '',
  notConsigningArtist: false,
  steps: sd && sd.CURRENT_USER ? last(stepsMapping, 3) : stepsMapping,
  submission: null,
  user: sd.CURRENT_USER
}

function submissionFlow (state = initialState, action) {
  switch (action.type) {
    case actions.CLEAR_ARTIST_SUGGESTIONS: {
      return u({
        artistAutocompleteSuggestions: []
      }, state)
    }
    case actions.CLEAR_LOCATION_SUGGESTIONS: {
      return u({
        locationAutocompleteSuggestions: []
      }, state)
    }
    case actions.HIDE_NOT_CONSIGNING_MESSAGE: {
      return u({
        notConsigningArtist: false
      }, state)
    }
    case actions.INCREMENT_STEP: {
      const step = state.currentStep
      if (step < state.steps.length) {
        return u({
          currentStep: step + 1
        }, state)
      } else {
        return state
      }
    }
    case actions.SHOW_NOT_CONSIGNING_MESSAGE: {
      return u({
        notConsigningArtist: true
      }, state)
    }
    case actions.UPDATE_ARTIST_AUTOCOMPLETE_VALUE: {
      return u({
        artistAutocompleteValue: action.payload.value
      }, state)
    }
    case actions.UPDATE_ARTIST_ID: {
      return u({
        inputs: {
          artist_id: action.payload.artistId
        }
      }, state)
    }
    case actions.UPDATE_ARTIST_SUGGESTIONS: {
      return u({
        artistAutocompleteSuggestions: action.payload.suggestions
      }, state)
    }
    case actions.UPDATE_INPUTS: {
      return u({
        inputs: {
          ...state.inputs,
          ...action.payload.inputs
        }
      }, state)
    }
    case actions.UPDATE_LOCATION_AUTOCOMPLETE_VALUE: {
      console.log("ehllo?")
      return u({
        locationAutocompleteValue: action.payload.value
      }, state)
    }
    case actions.UPDATE_LOCATION_SUGGESTIONS: {
      return u({
        locationAutocompleteSuggestions: action.payload.suggestions
      }, state)
    }
    case actions.UPDATE_LOCATION_VALUES: {
      return u({
        inputs: {
          location: action.payload.location
        }
      }, state)
    }
    case actions.UPDATE_SUBMISSION: {
      return u({
        submission: action.payload.submission
      }, state)
    }
    default: return state
  }
}

export default combineReducers({
  submissionFlow,
  router: routerReducer,
  form: formReducer
})

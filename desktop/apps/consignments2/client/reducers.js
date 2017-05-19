import * as actions from './actions'
import u from 'updeep'
import { combineReducers } from 'redux'
import { data as sd } from 'sharify'
import { contains, last } from 'underscore'
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
  currentStep: 2,
  error: null,
  inputs: {
    artist_id: '',
    authenticity_certificate: true,
    depth: '',
    dimensions_metric: 'in',
    edition: false,
    height: '',
    location_city: '',
    location_state: '',
    location_country: '',
    medium: 'painting',
    provenance: '',
    signature: true,
    title: '',
    width: '',
    year: ''
  },
  locationAutocompleteSuggestions: [],
  locationAutocompleteValue: '',
  notConsigningArtist: false,
  processingImages: [],
  skipPhotoSubmission: false,
  steps: sd && sd.CURRENT_USER ? last(stepsMapping, 3) : stepsMapping,
  submission: {
    id: 46
  },
  submissionIdFromServer: sd.SUBMISSION_ID,
  uploadedImages: []
}

function submissionFlow (state = initialState, action) {
  switch (action.type) {
    case actions.ADD_IMAGE_TO_UPLOADED_IMAGES: {
      const newImage = {
        fileName: action.payload.fileName,
        processing: true,
        src: action.payload.src
      }
      return u({
        uploadedImages: state.uploadedImages.concat(newImage)
      }, state)
    }
    case actions.CLEAR_ARTIST_SUGGESTIONS: {
      return u({
        artistAutocompleteSuggestions: []
      }, state)
    }
    case actions.CLEAR_ERROR: {
      return u({
        error: null
      }, state)
    }
    case actions.CLEAR_LOCATION_DATA: {
      return u({
        inputs: {
          location_city: '',
          location_country: '',
          location_state: ''
        }
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
    case actions.START_PROCESSING_PHOTO: {
      const fileName = action.payload.fileName
      if (!contains(state.processingImages, fileName)) {
        return u({
          processingImages: state.processingImages.concat(fileName)
        }, state)
      }
      return state
    }
    case actions.STOP_PROCESSING_PHOTO: {
      const fileName = action.payload.fileName
      if (contains(state.processingImages, fileName)) {
        return u({
          processingImages: u.reject((ff) => ff === fileName)
        }, state)
      }
      return state
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
    case actions.UPDATE_ERROR: {
      return u({
        error: action.payload.error
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
      return u({
        locationAutocompleteValue: action.payload.value
      }, state)
    }
    case actions.UPDATE_LOCATION_CITY_VALUE: {
      return u({
        inputs: {
          location_city: action.payload.city
        }
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
          location_city: action.payload.city,
          location_country: action.payload.country,
          location_state: action.payload.state
        }
      }, state)
    }
    case actions.UPDATE_SKIP_PHOTO_SUBMISSION: {
      return u({
        skipPhotoSubmission: action.payload.skip
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

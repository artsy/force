import * as actions from './actions'
import u from 'updeep'
import { combineReducers } from 'redux'
import { composeReducers } from '../../../components/react/utils/composeReducers'
import { data as sd } from 'sharify'
import { contains } from 'underscore'
import { reducer as formReducer } from 'redux-form'
import { responsiveWindowReducer } from 'desktop/components/react/responsive_window'
import { routerReducer } from 'react-router-redux'

const createAccountStep = 'createAccount'
const chooseArtistStep = 'chooseArtist'
const describeWorkStep = 'describeWork'
const uploadPhotosStep = 'uploadPhotos'

export const initialState = {
  artistAutocompleteSuggestions: [],
  artistAutocompleteValue: '',
  artistName: sd.SUBMISSION_ARTIST_NAME || '',
  authFormState: 'signUp',
  categoryOptions: [
    'Painting',
    'Sculpture',
    'Photography',
    'Print',
    'Drawing, Collage or other Work on Paper',
    'Mixed Media',
    'Performance Art',
    'Installation',
    'Video/Film/Animation',
    'Architecture',
    'Fashion Design and Wearable Art',
    'Jewelry',
    'Design/Decorative Art',
    'Textile Arts',
    'Other'
  ],
  currentStep: createAccountStep,
  error: null,
  erroredImages: [],
  inputs: {
    artist_id: '',
    authenticity_certificate: false,
    category: 'Painting',
    depth: '',
    dimensions_metric: 'in',
    edition: false,
    edition_number: '',
    edition_size: 0,
    height: '',
    location_city: '',
    location_state: '',
    location_country: '',
    medium: '',
    provenance: '',
    signature: false,
    title: '',
    width: '',
    year: ''
  },
  isMobile: false,
  loading: false,
  locationAutocompleteFrozen: false,
  locationAutocompleteSuggestions: [],
  locationAutocompleteValue: '',
  notConsigningArtist: false,
  processingImages: [],
  progressBars: {},
  redirectOnAuth: true,
  resetPasswordSuccess: false,
  skipPhotoSubmission: false,
  steps: [],
  submission: sd.SUBMISSION || {},
  submissionIdFromServer: sd.SUBMISSION_ID,
  uploadedImages: [],
  user: sd.CURRENT_USER
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
    case actions.ERROR_ON_IMAGE: {
      const fileName = action.payload.fileName
      if (!contains(state.erroredImages, fileName)) {
        return u({
          erroredImages: state.erroredImages.concat(fileName)
        }, state)
      }
      return state
    }
    case actions.FREEZE_LOCATION_INPUT: {
      return u({
        locationAutocompleteFrozen: true
      }, state)
    }
    case actions.HIDE_NOT_CONSIGNING_MESSAGE: {
      return u({
        notConsigningArtist: false
      }, state)
    }
    case actions.IGNORE_REDIRECT_ON_AUTH: {
      return u({
        redirectOnAuth: false
      }, state)
    }
    case actions.REMOVE_ERRORED_IMAGE: {
      const fileName = action.payload.fileName
      if (contains(state.erroredImages, fileName)) {
        return u({
          erroredImages: u.reject((ff) => ff === fileName)
        }, state)
      }
      return state
    }
    case actions.REMOVE_UPLOADED_IMAGE: {
      const fileName = action.payload.fileName
      return u({
        uploadedImages: u.reject((ff) => ff.fileName === fileName)
      }, state)
    }
    case actions.SHOW_NOT_CONSIGNING_MESSAGE: {
      return u({
        notConsigningArtist: true
      }, state)
    }
    case actions.SHOW_RESET_PASSWORD_SUCCESS_MESSAGE: {
      return u({
        resetPasswordSuccess: true
      }, state)
    }
    case actions.START_LOADING: {
      return u({
        loading: true
      }, state)
    }
    case actions.START_PROCESSING_IMAGE: {
      const fileName = action.payload.fileName
      if (!contains(state.processingImages, fileName)) {
        return u({
          processingImages: state.processingImages.concat(fileName)
        }, state)
      }
      return state
    }
    case actions.STOP_LOADING: {
      return u({
        loading: false
      }, state)
    }
    case actions.STOP_PROCESSING_IMAGE: {
      const fileName = action.payload.fileName
      if (contains(state.processingImages, fileName)) {
        return u({
          processingImages: u.reject((ff) => ff === fileName)
        }, state)
      }
      return state
    }
    case actions.UNFREEZE_LOCATION_INPUT: {
      return u({
        locationAutocompleteFrozen: false,
        locationAutocompleteValue: ''
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
    case actions.UPDATE_ARTIST_NAME: {
      return u({
        artistName: action.payload.artistName
      }, state)
    }
    case actions.UPDATE_ARTIST_SUGGESTIONS: {
      return u({
        artistAutocompleteSuggestions: action.payload.suggestions
      }, state)
    }
    case actions.UPDATE_AUTH_FORM_STATE: {
      return u({
        authFormState: action.payload.state
      }, state)
    }
    case actions.UPDATE_CURRENT_STEP: {
      return u({
        currentStep: action.payload.step
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
    case actions.UPDATE_PROGRESS_BAR: {
      const updatedProgress = { [action.payload.fileName]: action.payload.percent }
      return u({
        progressBars: {
          ...state.progressBars,
          ...updatedProgress
        }
      }, state)
    }
    case actions.UPDATE_SKIP_PHOTO_SUBMISSION: {
      return u({
        skipPhotoSubmission: action.payload.skip
      }, state)
    }
    case actions.UPDATE_STEPS_WITH_USER: {
      return u({
        currentStep: chooseArtistStep,
        steps: [chooseArtistStep, describeWorkStep, uploadPhotosStep]
      }, state)
    }
    case actions.UPDATE_STEPS_WITHOUT_USER: {
      return u({
        currentStep: createAccountStep,
        steps: [createAccountStep, chooseArtistStep, describeWorkStep, uploadPhotosStep]
      }, state)
    }
    case actions.UPDATE_SUBMISSION: {
      return u({
        submission: action.payload.submission
      }, state)
    }
    case actions.UPDATE_USER: {
      return u({
        user: action.payload.user
      }, state)
    }
    default: return state
  }
}

export default combineReducers({
  submissionFlow: composeReducers(
    responsiveWindowReducer,
    submissionFlow
  ),
  router: routerReducer,
  form: formReducer
})

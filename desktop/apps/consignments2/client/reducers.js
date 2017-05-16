import * as actions from './actions'
import u from 'updeep'
import { combineReducers } from 'redux'
import { data as sd } from 'sharify'
import { last } from 'underscore'
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
  currentStep: 1,
  inputs: {
    authenticity_certificate: true,
    depth: '',
    dimensions_metric: 'in',
    edition: false,
    height: '',
    location: '',
    medium: '',
    provenance: '',
    signature: true,
    title: '',
    width: '',
    year: ''
  },
  steps: sd && sd.CURRENT_USER ? last(stepsMapping, 3) : stepsMapping,
  submission: null,
  user: sd.CURRENT_USER
}

function submissionFlow (state = initialState, action) {
  switch (action.type) {
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
    case actions.UPDATE_AUTHENTICITY_CERTIFICATE: {
      return u({
        inputs: {
          authenticity_certificate: action.payload.authenticity_certificate
        }
      }, state)
    }
    case actions.UPDATE_DEPTH: {
      return u({
        inputs: {
          depth: action.payload.depth
        }
      }, state)
    }
    case actions.UPDATE_DIMENSIONS_METRIC: {
      return u({
        inputs: {
          dimensions_metric: action.payload.dimensions_metric
        }
      }, state)
    }
    case actions.UPDATE_EDITION: {
      return u({
        inputs: {
          edition: !state.inputs.edition
        }
      }, state)
    }
    case actions.UPDATE_HEIGHT: {
      return u({
        inputs: {
          height: action.payload.height
        }
      }, state)
    }
    case actions.UPDATE_LOCATION: {
      return u({
        inputs: {
          location: action.payload.location
        }
      }, state)
    }
    case actions.UPDATE_MEDIUM: {
      return u({
        inputs: {
          medium: action.payload.medium
        }
      }, state)
    }
    case actions.UPDATE_PROVENANCE: {
      return u({
        inputs: {
          provenance: action.payload.provenance
        }
      }, state)
    }
    case actions.UPDATE_SIGNATURE: {
      return u({
        inputs: {
          signature: action.payload.signature
        }
      }, state)
    }
    case actions.UPDATE_SUBMISSION: {
      return u({
        submission: action.payload.submission
      }, state)
    }
    case actions.UPDATE_TITLE: {
      return u({
        inputs: {
          title: action.payload.title
        }
      }, state)
    }
    case actions.UPDATE_WIDTH: {
      return u({
        inputs: {
          width: action.payload.width
        }
      }, state)
    }
    case actions.UPDATE_YEAR: {
      return u({
        inputs: {
          year: action.payload.year
        }
      }, state)
    }
    default: return state
  }
}

export default combineReducers({
  submissionFlow,
  router: routerReducer
})

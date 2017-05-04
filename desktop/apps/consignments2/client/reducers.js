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
    nextDisabled: true,
    title: 'Enter the name of the artist/designer who created the work'
  },
  {
    id: 'describe_work',
    label: 'Describe the Work',
    nextDisabled: true,
    title: 'Enter details about the work'
  },
  {
    id: 'upload_photos',
    label: 'Upload Photo',
    nextDisabled: true,
    title: 'Upload photos'
  }
]

const initialState = {
  currentStep: 1,
  inputs: {
    authenticity_certificate: true,
    depth: null,
    dimensions_metric: 'in',
    edition: false,
    height: null,
    location: null,
    medium: null,
    provenance: null,
    signature: true,
    title: null,
    width: null,
    year: null
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
  router: routerReducer
})

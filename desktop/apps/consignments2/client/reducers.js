import * as actions from './actions'
import { combineReducers } from 'redux'
import { data as sd } from 'sharify'
import { contains, last } from 'underscore'
import { routerReducer } from 'react-router-redux'
import u from 'updeep'
import ChooseArtist from '../components/choose_artist'
import CreateAccount from '../components/create_account'
import DescribeWork from '../components/describe_work'
import UploadPhoto from '../components/upload_photo'

const stepsMapping = [
  {
    component: CreateAccount,
    label: 'Create Account',
    title: 'Create an Account'
  },
  {
    component: ChooseArtist,
    label: 'Verify Artist/Designer',
    title: 'Enter the name of the artist/designer who created the work'
  },
  {
    component: DescribeWork,
    label: 'Describe the Work',
    title: 'Enter details about the work'
  },
  {
    component: UploadPhoto,
    label: 'Upload Photo',
    title: 'Upload photos'
  }
]

const initialState = {
  currentStep: 0,
  steps: sd && sd.CURRENT_USER ? last(stepsMapping, 3) : stepsMapping,
  submission: null,
  user: sd.CURRENT_USER
}

function submissionFlow(state = initialState, action) {
  switch (action.type) {
    case actions.INCREMENT_STEP: {
      const step = state.currentStep
      return u({
        currentStep: step + 1
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
  routing: routerReducer
})

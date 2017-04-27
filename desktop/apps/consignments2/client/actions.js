import { push } from 'react-router-redux'

// Action types
export const INCREMENT_STEP = 'INCREMENT_STEP'
export const UPDATE_SUBMISSION = 'UPDATE_SUBMISSION'

// Action creators
export function incrementStep() {
  return {
    type: INCREMENT_STEP
  }
}

export function submitPhoto() {
  return (dispatch) => {
    // this will come from the response of the PUT request to convection
    const dummySubmission = {
      id: 'subbymission',
      image_url: null
    }
    dispatch(updateSubmission(dummySubmission))
    dispatch(push('/consign2/submission/thank_you'))
  }
}

export function updateSubmission(submission) {
  return {
    type: UPDATE_SUBMISSION,
    payload: {
      submission
    }
  }
}

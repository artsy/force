import { push } from 'react-router-redux'

// Action types
export const INCREMENT_STEP = 'INCREMENT_STEP'
export const UPDATE_AUTHENTICITY_CERTIFICATE = 'UPDATE_AUTHENTICITY_CERTIFICATE'
export const UPDATE_DEPTH = 'UPDATE_DEPTH'
export const UPDATE_DIMENSIONS_METRIC = 'UPDATE_DIMENSIONS_METRIC'
export const UPDATE_EDITION = 'UPDATE_EDITION'
export const UPDATE_HEIGHT = 'UPDATE_HEIGHT'
export const UPDATE_LOCATION = 'UPDATE_LOCATION'
export const UPDATE_MEDIUM = 'UPDATE_MEDIUM'
export const UPDATE_PROVENANCE = 'UPDATE_PROVENANCE'
export const UPDATE_SIGNATURE = 'UPDATE_SIGNATURE'
export const UPDATE_SUBMISSION = 'UPDATE_SUBMISSION'
export const UPDATE_TITLE = 'UPDATE_TITLE'
export const UPDATE_WIDTH = 'UPDATE_WIDTH'
export const UPDATE_YEAR = 'UPDATE_YEAR'

// Action creators
export function incrementStep () {
  return {
    type: INCREMENT_STEP
  }
}

export function submitPhoto () {
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

export function updateAuthenticityCertificate (option) {
  return {
    type: UPDATE_AUTHENTICITY_CERTIFICATE,
    payload: {
      authenticity_certificate: option
    }
  }
}

export function updateDepth (depth) {
  return {
    type: UPDATE_DEPTH,
    payload: {
      depth
    }
  }
}

export function updateDimensionsMetric (dimensions_metric) {
  return {
    type: UPDATE_DIMENSIONS_METRIC,
    payload: {
      dimensions_metric
    }
  }
}

export function updateEdition () {
  return {
    type: UPDATE_EDITION
  }
}

export function updateHeight (height) {
  return {
    type: UPDATE_HEIGHT,
    payload: {
      height
    }
  }
}

export function updateLocation (location) {
  return {
    type: UPDATE_LOCATION,
    payload: {
      location
    }
  }
}


export function updateMedium (medium) {
  return {
    type: UPDATE_MEDIUM,
    payload: {
      medium
    }
  }
}

export function updateProvenance (provenance) {
  return {
    type: UPDATE_PROVENANCE,
    payload: {
      provenance
    }
  }
}

export function updateSignature (option) {
  return {
    type: UPDATE_SIGNATURE,
    payload: {
      signature: option
    }
  }
}

export function updateSubmission (submission) {
  return {
    type: UPDATE_SUBMISSION,
    payload: {
      submission
    }
  }
}

export function updateTitle (title) {
  return {
    type: UPDATE_TITLE,
    payload: {
      title
    }
  }
}

export function updateWidth (width) {
  return {
    type: UPDATE_WIDTH,
    payload: {
      width
    }
  }
}

export function updateYear (year) {
  return {
    type: UPDATE_YEAR,
    payload: {
      year
    }
  }
}

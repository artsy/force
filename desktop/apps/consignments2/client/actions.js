import request from 'superagent'
import { data as sd } from 'sharify'
import { find } from 'underscore'
import { push } from 'react-router-redux'

import gemup from 'gemup'

// Action types
export const ADD_IMAGE_TO_UPLOADED_IMAGES = 'ADD_IMAGE_TO_UPLOADED_IMAGES'
export const CLEAR_ARTIST_SUGGESTIONS = 'CLEAR_ARTIST_SUGGESTIONS'
export const CLEAR_ERROR = 'CLEAR_ERROR'
export const CLEAR_LOCATION_DATA = 'CLEAR_LOCATION_DATA'
export const CLEAR_LOCATION_SUGGESTIONS = 'CLEAR_LOCATION_SUGGESTIONS'
export const HIDE_NOT_CONSIGNING_MESSAGE = 'HIDE_NOT_CONSIGNING_MESSAGE'
export const INCREMENT_STEP = 'INCREMENT_STEP'
export const SHOW_NOT_CONSIGNING_MESSAGE = 'SHOW_NOT_CONSIGNING_MESSAGE'
export const SHOW_RESET_PASSWORD_SUCCESS_MESSAGE = 'SHOW_RESET_PASSWORD_SUCCESS_MESSAGE'
export const START_PROCESSING_IMAGE = 'START_PROCESSING_IMAGE'
export const STOP_PROCESSING_IMAGE = 'STOP_PROCESSING_IMAGE'
export const UPDATE_ARTIST_AUTOCOMPLETE_VALUE = 'UPDATE_ARTIST_AUTOCOMPLETE_VALUE'
export const UPDATE_ARTIST_ID = 'UPDATE_ARTIST_ID'
export const UPDATE_ARTIST_SUGGESTIONS = 'UPDATE_ARTIST_SUGGESTIONS'
export const UPDATE_AUTH_FORM_STATE = 'UPDATE_AUTH_FORM_STATE'
export const UPDATE_ERROR = 'UPDATE_ERROR'
export const UPDATE_INPUTS = 'UPDATE_INPUTS'
export const UPDATE_LOCATION_AUTOCOMPLETE_VALUE = 'UPDATE_LOCATION_AUTOCOMPLETE_VALUE'
export const UPDATE_LOCATION_CITY_VALUE = 'UPDATE_LOCATION_CITY_VALUE'
export const UPDATE_LOCATION_SUGGESTIONS = 'UPDATE_LOCATION_SUGGESTIONS'
export const UPDATE_LOCATION_VALUES = 'UPDATE_LOCATION_VALUES'
export const UPDATE_PROGRESS_BAR = 'UPDATE_PROGRESS_BAR'
export const UPDATE_SKIP_PHOTO_SUBMISSION = 'UPDATE_SKIP_PHOTO_SUBMISSION'
export const UPDATE_SUBMISSION = 'UPDATE_SUBMISSION'
export const UPDATE_USER = 'UPDATE_USER'

// Action creators
export function addImageToUploadedImages (fileName, src) {
  return {
    type: ADD_IMAGE_TO_UPLOADED_IMAGES,
    payload: {
      fileName,
      src
    }
  }
}

export function chooseArtistAndAdvance (value) {
  return (dispatch) => {
    dispatch(updateArtistId(value._id))
    dispatch(incrementStep()) // move to next step
  }
}

export function chooseLocation (location) {
  return async (dispatch, getState) => {
    const parseDetails = (place, status) => {
      if (status !== window.google.maps.places.PlacesServiceStatus.OK) {
        console.error('Unable to reach maps API', status)
      } else {
        const { address_components } = place
        const city = find(address_components, (comp) => comp.types[0] === 'locality')
        const state = find(address_components, (comp) => comp.types[0] === 'administrative_area_level_1')
        const country = find(address_components, (comp) => comp.types[0] === 'country')

        const cityDisplay = city && city.long_name
        const countryDisplay = country && country.long_name
        const stateDisplay = state && state.long_name

        dispatch(updateLocationInputValues(cityDisplay, stateDisplay, countryDisplay))
      }
    }

    try {
      if (window.google) {
        const placesService = new window.google.maps.places.PlacesService(document.createElement('div'))
        await placesService.getDetails({ placeId: location.place_id }, parseDetails)
      }
    } catch (err) {
      console.error('error!', err)
    }
  }
}

export function clearArtistSuggestions () {
  return {
    type: CLEAR_ARTIST_SUGGESTIONS
  }
}

export function clearError () {
  return {
    type: CLEAR_ERROR
  }
}

export function clearLocationData () {
  return {
    type: CLEAR_LOCATION_DATA
  }
}

export function clearLocationSuggestions () {
  return {
    type: CLEAR_LOCATION_SUGGESTIONS
  }
}

export function completeSubmission () {
  return async (dispatch, getState) => {
    try {
      const {
        submissionFlow: {
          submission,
          submissionIdFromServer,
          user
        }
      } = getState()
      const token = await fetchToken(user)

      const submissionQueryParam = submission.id || submissionIdFromServer
      const submissionResponse = await request
                          .put(`${sd.CONVECTION_APP_URL}/api/submissions/${submissionQueryParam}`)
                          .set('Authorization', `Bearer ${token}`)
                          .send({ state: 'submitted' })

      dispatch(updateSubmission(submissionResponse.body))
      dispatch(push('/consign2/submission/thank_you'))
    } catch (err) {
      dispatch(updateError('Unable to submit at this time.'))
      console.error('error!', err)
    }
  }
}

export function createSubmission () {
  return async (dispatch, getState) => {
    try {
      const {
        submissionFlow: {
          inputs,
          user
        }
      } = getState()
      const token = await fetchToken(user)
      const { body } = await request
                          .post(`${sd.CONVECTION_APP_URL}/api/submissions`)
                          .set('Authorization', `Bearer ${token}`)
                          .send(inputs)
      dispatch(updateSubmission(body)) // update state to reflect current submission
      dispatch(incrementStep()) // move to next step
    } catch (err) {
      dispatch(updateError('Unable to submit at this time.'))
      console.error('error!', err)
    }
  }
}

export function fetchArtistSuggestions (value) {
  return async (dispatch, getState) => {
    try {
      const { submissionFlow: { user } } = getState()
      const res = await request
                          .get(`${sd.API_URL}/api/v1/match/artists`)
                          .query({ visible_to_public: 'true', term: value })
                          .set('X-ACCESS-TOKEN', user.accessToken)
      dispatch(updateArtistSuggestions(res.body))
      dispatch(hideNotConsigningMessage())
    } catch (err) {
      console.error('error!', err)
    }
  }
}

export function fetchLocationSuggestions (value) {
  return async (dispatch, getState) => {
    const displaySuggestions = (predictions, status) => {
      if (status !== window.google.maps.places.PlacesServiceStatus.OK) {
        console.error('Unable to reach maps API', status)
      } else {
        dispatch(updateLocationSuggestions(predictions))
      }
    }

    try {
      if (window.google) {
        const autocompleteService = new window.google.maps.places.AutocompleteService()
        await autocompleteService.getPlacePredictions({ input: value, types: ['(cities)'] }, displaySuggestions)
      }
    } catch (error) {
      console.error('error!', error)
    }
  }
}

export function handleImageUpload (file) {
  return async (dispatch, getState) => {
    try {
      const options = {
        acl: 'private',
        app: sd.CONVECTION_GEMINI_APP,
        key: sd.GEMINI_S3_ACCESS_KEY,
        fail: (_err) => {
          dispatch(updateError('Unable to upload at this time.'))
        },
        add: (src) => {
          dispatch(addImageToUploadedImages(file.name, src))
          dispatch(startProcessingImage(file.name))
        },
        progress: (percent) => {
          dispatch(updateProgressBar(file.name, percent))
        },
        done: (src, geminiKey, bucket) => {
          const key = `${geminiKey}/${file.name}`
          dispatch(uploadImageToGemini(key, bucket, file.name))
        }
      }
      gemup(file, options)
    } catch (err) {
      console.error('error!', err)
    }
  }
}

export function hideNotConsigningMessage () {
  return {
    type: HIDE_NOT_CONSIGNING_MESSAGE
  }
}

export function incrementStep () {
  return {
    type: INCREMENT_STEP
  }
}

export function logIn (values) {
  return async (dispatch, getState) => {
    try {
      const options = {
        email: values.email,
        password: values.password,
        _csrf: sd.CSRF_TOKEN
      }
      const user = await request
                      .post(sd.AP.loginPagePath)
                      .set('Content-Type', 'application/json')
                      .set('Accept', 'application/json')
                      .set('X-Requested-With', 'XMLHttpRequest')
                      .send(options)

      dispatch(updateUser(user.body.user))
      dispatch(incrementStep())
      dispatch(clearError())
    } catch (err) {
      dispatch(updateError(err.response.body.error))
    }
  }
}

export function resetPassword (values) {
  return async (dispatch, getState) => {
    try {
      const options = {
        email: values.email
      }
      await request
        .post(`${sd.API_URL}/api/v1/users/send_reset_password_instructions`)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .set('X-XAPP-TOKEN', sd.ARTSY_XAPP_TOKEN)
        .send(options)
      dispatch(clearError())
      dispatch(showResetPasswordSuccessMessage())
    } catch (err) {
      dispatch(updateError(err.response.body.error))
    }
  }
}

export function scrubLocation () {
  return (dispatch, getState) => {
    const { submissionFlow: { inputs, locationAutocompleteValue } } = getState()
    // if user has selected from the autocomplete, one of these should be filled
    // in the off-chance it's not, stick the outlier data in the city field
    if (!(inputs.location_city ||
          inputs.location_country ||
          inputs.location_state) &&
          locationAutocompleteValue) {
      dispatch(updateLocationCityValue(locationAutocompleteValue))
    }
  }
}

export function showNotConsigningMessage () {
  return {
    type: SHOW_NOT_CONSIGNING_MESSAGE
  }
}

export function showResetPasswordSuccessMessage () {
  return {
    type: SHOW_RESET_PASSWORD_SUCCESS_MESSAGE
  }
}

export function signUp (values) {
  return async (dispatch, getState) => {
    try {
      const options = {
        email: values.email,
        name: values.name,
        password: values.password,
        _csrf: sd.CSRF_TOKEN
      }
      await request
              .post(sd.AP.signupPagePath)
              .set('Content-Type', 'application/json')
              .set('Accept', 'application/json')
              .set('X-Requested-With', 'XMLHttpRequest')
              .send(options)

      dispatch(logIn(values))
    } catch (err) {
      dispatch(updateError(err.response.body.error))
    }
  }
}

export function startProcessingImage (fileName) {
  return {
    type: START_PROCESSING_IMAGE,
    payload: {
      fileName
    }
  }
}

export function stopProcessingImage (fileName) {
  return {
    type: STOP_PROCESSING_IMAGE,
    payload: {
      fileName
    }
  }
}

export function submitDescribeWork (values) {
  return (dispatch) => {
    dispatch(updateInputs(values)) // update the inputs
    dispatch(scrubLocation())
    dispatch(createSubmission()) // create the submission in convection
  }
}

export function selectPhoto (file) {
  return (dispatch) => {
    dispatch(handleImageUpload(file)) // update the inputs
  }
}

export function submitPhoto () {
  return async (dispatch, getState) => {
    try {
      dispatch(completeSubmission())
    } catch (err) {
      dispatch(updateError('Unable to submit at this time.'))
      console.error('error!', err)
    }
  }
}

export function updateArtistAutocompleteValue (value) {
  return {
    type: UPDATE_ARTIST_AUTOCOMPLETE_VALUE,
    payload: {
      value
    }
  }
}

export function updateArtistId (artistId) {
  return {
    type: UPDATE_ARTIST_ID,
    payload: {
      artistId
    }
  }
}

export function updateArtistSuggestions (suggestions) {
  return {
    type: UPDATE_ARTIST_SUGGESTIONS,
    payload: {
      suggestions
    }
  }
}

export function updateAuthFormState (state) {
  return {
    type: UPDATE_AUTH_FORM_STATE,
    payload: {
      state
    }
  }
}

export function updateAuthFormStateAndClearError (state) {
  return (dispatch, getState) => {
    dispatch(updateAuthFormState(state))
    dispatch(clearError())
  }
}

export function updateError (error) {
  return {
    type: UPDATE_ERROR,
    payload: {
      error
    }
  }
}

export function updateInputs (inputs) {
  if (inputs.signature) {
    const boolSignature = (inputs.signature === 'yes')
    inputs.signature = boolSignature
  }

  if (inputs.authenticity_certificate) {
    const boolCertificate = (inputs.authenticity_certificate === 'yes')
    inputs.authenticity_certificate = boolCertificate
  }

  return {
    type: UPDATE_INPUTS,
    payload: {
      inputs
    }
  }
}

export function updateLocationAutocomplete (value) {
  return (dispatch) => {
    dispatch(clearLocationData())
    dispatch(updateLocationAutocompleteValue(value))
  }
}

export function updateLocationAutocompleteValue (value) {
  return {
    type: UPDATE_LOCATION_AUTOCOMPLETE_VALUE,
    payload: {
      value
    }
  }
}

export function updateLocationCityValue (city) {
  return {
    type: UPDATE_LOCATION_CITY_VALUE,
    payload: {
      city
    }
  }
}

export function updateLocationInputValues (city, state, country) {
  return {
    type: UPDATE_LOCATION_VALUES,
    payload: {
      city,
      state,
      country
    }
  }
}

export function updateLocationSuggestions (suggestions) {
  return {
    type: UPDATE_LOCATION_SUGGESTIONS,
    payload: {
      suggestions
    }
  }
}

export function updateProgressBar (fileName, percent) {
  return {
    type: UPDATE_PROGRESS_BAR,
    payload: {
      fileName,
      percent
    }
  }
}

export function updateSkipPhotoSubmission (skip) {
  return {
    type: UPDATE_SKIP_PHOTO_SUBMISSION,
    payload: {
      skip
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

export function updateUser (user) {
  return {
    type: UPDATE_USER,
    payload: {
      user
    }
  }
}

export function uploadImageToConvection (geminiToken, fileName) {
  return async (dispatch, getState) => {
    try {
      const { submissionFlow: { submission, submissionIdFromServer, user } } = getState()
      const submissionId = submission.id || submissionIdFromServer
      const token = await fetchToken(user)
      const inputs = {
        submission_id: submissionId,
        gemini_token: geminiToken
      }
      await request
        .post(`${sd.CONVECTION_APP_URL}/api/assets`)
        .set('Authorization', `Bearer ${token}`)
        .send(inputs)

      dispatch(stopProcessingImage(fileName))
    } catch (err) {
      dispatch(updateError('Unable to upload image.'))
      console.error('error!', err)
    }
  }
}

export function uploadImageToGemini (key, bucket, fileName) {
  return async (dispatch, getState) => {
    try {
      const { submissionFlow: { submission, submissionIdFromServer } } = getState()
      const submissionId = submission.id || submissionIdFromServer
      const inputs = {
        entry: {
          template_key: sd.CONVECTION_GEMINI_APP,
          source_key: key,
          source_bucket: bucket,
          metadata: {
            id: submissionId,
            _type: 'Consignment'
          }
        }
      }
      const response = await request
        .post(`${sd.GEMINI_APP}/entries.json`)
        .set('Authorization', `Basic ${encode(sd.CONVECTION_GEMINI_APP, '')}`)
        .send(inputs)

      const token = response.body.token

      dispatch(uploadImageToConvection(token, fileName))
    } catch (err) {
      dispatch(updateError('Unable to process image.'))
      console.error('error!', err)
    }
  }
}

// helpers
async function fetchToken (user) {
  const {
    body: {
      token
    }
  } = await request
              .post(`${sd.API_URL}/api/v1/me/token`)
              .set('X-ACCESS-TOKEN', user.accessToken)
              .send({ client_application_id: sd.CONVECTION_APP_ID })
  return token
}

function encode (key, secret) {
  return btoa(unescape(encodeURIComponent([key, secret].join(':'))))
}

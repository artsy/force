import request from 'superagent'
import gemup from 'gemup'
import get from 'lodash.get'
import stepsConfig from './steps_config'
import { data as sd } from 'sharify'
import { fetchToken, formattedLocation } from '../helpers'
import { find } from 'underscore'
import { push } from 'react-router-redux'

// Action types
export const ADD_ASSET_ID = 'ADD_ASSET_ID'
export const ADD_IMAGE_TO_UPLOADED_IMAGES = 'ADD_IMAGE_TO_UPLOADED_IMAGES'
export const CLEAR_ARTIST_SUGGESTIONS = 'CLEAR_ARTIST_SUGGESTIONS'
export const CLEAR_ERROR = 'CLEAR_ERROR'
export const CLEAR_LOCATION_DATA = 'CLEAR_LOCATION_DATA'
export const CLEAR_LOCATION_SUGGESTIONS = 'CLEAR_LOCATION_SUGGESTIONS'
export const ERROR_ON_IMAGE = 'ERROR_ON_IMAGE'
export const FREEZE_LOCATION_INPUT = 'FREEZE_LOCATION_INPUT'
export const HIDE_NOT_CONSIGNING_MESSAGE = 'HIDE_NOT_CONSIGNING_MESSAGE'
export const IGNORE_REDIRECT_ON_AUTH = 'IGNORE_REDIRECT_ON_AUTH'
export const REMOVE_ERRORED_IMAGE = 'REMOVE_ERRORED_IMAGE'
export const REMOVE_UPLOADED_IMAGE = 'REMOVE_UPLOADED_IMAGE'
export const SHOW_NOT_CONSIGNING_MESSAGE = 'SHOW_NOT_CONSIGNING_MESSAGE'
export const SHOW_RESET_PASSWORD_SUCCESS_MESSAGE = 'SHOW_RESET_PASSWORD_SUCCESS_MESSAGE'
export const START_LOADING = 'START_LOADING'
export const START_PROCESSING_IMAGE = 'START_PROCESSING_IMAGE'
export const STOP_LOADING = 'STOP_LOADING'
export const STOP_PROCESSING_IMAGE = 'STOP_PROCESSING_IMAGE'
export const SUBMISSION_CREATED = 'SUBMISSION_CREATED'
export const SUBMISSION_COMPLETED = 'SUBMISSION_COMPLETED'
export const SUBMISSION_ERROR = 'SUBMISSION_ERROR'
export const SUBMIT_ARTIST = 'SUBMIT_ARTIST'
export const UNFREEZE_LOCATION_INPUT = 'UNFREEZE_LOCATION_INPUT'
export const UPDATE_ARTIST_AUTOCOMPLETE_VALUE = 'UPDATE_ARTIST_AUTOCOMPLETE_VALUE'
export const UPDATE_ARTIST_ID = 'UPDATE_ARTIST_ID'
export const UPDATE_ARTIST_NAME = 'UPDATE_ARTIST_NAME'
export const UPDATE_ARTIST_SUGGESTIONS = 'UPDATE_ARTIST_SUGGESTIONS'
export const UPDATE_AUTH_FORM_STATE = 'UPDATE_AUTH_FORM_STATE'
export const UPDATE_CURRENT_STEP = 'UPDATE_CURRENT_STEP'
export const UPDATE_ERROR = 'UPDATE_ERROR'
export const UPDATE_INPUTS = 'UPDATE_INPUTS'
export const UPDATE_LOCATION_AUTOCOMPLETE_VALUE = 'UPDATE_LOCATION_AUTOCOMPLETE_VALUE'
export const UPDATE_LOCATION_CITY_VALUE = 'UPDATE_LOCATION_CITY_VALUE'
export const UPDATE_LOCATION_SUGGESTIONS = 'UPDATE_LOCATION_SUGGESTIONS'
export const UPDATE_LOCATION_VALUES = 'UPDATE_LOCATION_VALUES'
export const UPDATE_PROGRESS_BAR = 'UPDATE_PROGRESS_BAR'
export const UPDATE_SKIP_PHOTO_SUBMISSION = 'UPDATE_SKIP_PHOTO_SUBMISSION'
export const UPDATE_STEPS_WITH_USER = 'UPDATE_STEPS_WITH_USER'
export const UPDATE_STEPS_WITHOUT_USER = 'UPDATE_STEPS_WITHOUT_USER'
export const UPDATE_SUBMISSION = 'UPDATE_SUBMISSION'
export const UPDATE_USER = 'UPDATE_USER'

// Action creators
export function addAssetId (assetId) {
  return {
    type: ADD_ASSET_ID,
    payload: {
      assetId
    }
  }
}

export function addImageToUploadedImages (fileName, src) {
  return {
    type: ADD_IMAGE_TO_UPLOADED_IMAGES,
    payload: {
      fileName,
      src
    }
  }
}

export function chooseArtist (value) {
  return (dispatch) => {
    dispatch(updateArtistId(value._id))
    dispatch(updateArtistName(value.name))
  }
}

export function chooseArtistAdvance () {
  return (dispatch) => {
    dispatch(submitArtist())
    dispatch(push(stepsConfig.describeWork.path))
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
        dispatch(freezeLocationInput())
      }
    }

    try {
      if (window.google) {
        const placesService = new window.google.maps.places.PlacesService(document.createElement('div'))
        await placesService.getDetails({ placeId: location.place_id }, parseDetails)
      }
    } catch (err) {
      console.error(
        '(consignments/client/actions.js @ chooseLocation) Error:', err
      )
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
      const token = await fetchToken(user.accessToken)

      const submissionQueryParam = submission.id || submissionIdFromServer
      const submissionResponse = await request
                          .put(`${sd.CONVECTION_APP_URL}/api/submissions/${submissionQueryParam}`)
                          .set('Authorization', `Bearer ${token}`)
                          .send({ state: 'submitted' })

      dispatch(updateSubmission(submissionResponse.body))
      dispatch(submissionCompleted())
      dispatch(stopLoading())
      dispatch(push(stepsConfig.thankYou.submissionPath.replace(':id', submissionResponse.body.id)))
    } catch (err) {
      dispatch(stopLoading())
      dispatch(submissionError('convection_complete_submission'))
      dispatch(updateError('Unable to submit at this time.'))
      console.error(
        '(consignments/client/actions.js @ completeSubmission) Error:', err
      )
    }
  }
}

export function createSubmission () {
  return async (dispatch, getState) => {
    try {
      const {
        submissionFlow: {
          inputs,
          submission,
          user
        }
      } = getState()
      const token = await fetchToken(user.accessToken)

      let submissionBody
      if (submission.id) {
        submissionBody = await request
                           .put(`${sd.CONVECTION_APP_URL}/api/submissions/${submission.id}`)
                           .set('Authorization', `Bearer ${token}`)
                           .send(inputs)
      } else {
        submissionBody = await request
                           .post(`${sd.CONVECTION_APP_URL}/api/submissions`)
                           .set('Authorization', `Bearer ${token}`)
                           .send(inputs)
      }
      dispatch(submissionCreated(submissionBody.body.id))
      dispatch(updateSubmission(submissionBody.body)) // update state to reflect current submission
      dispatch(stopLoading())
      dispatch(push(stepsConfig.describeWork.submissionPath.replace(':id', submissionBody.body.id)))
      dispatch(push(stepsConfig.uploadPhotos.submissionPath.replace(':id', submissionBody.body.id)))
    } catch (err) {
      dispatch(stopLoading())
      dispatch(submissionError('convection_create'))
      dispatch(updateError('Unable to submit at this time.'))
      console.error(
        '(consignments/client/actions.js @ createSubmission) Error:', err
      )
    }
  }
}

export function errorOnImage (fileName) {
  return {
    type: ERROR_ON_IMAGE,
    payload: {
      fileName
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
      console.error(
        '(consignments/client/actions.js @ fetchArtistSuggestions) Error:', err
      )
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
    } catch (err) {
      console.error(
        '(consignments/client/actions.js @ fetchLocationSuggestions) Error:', err
      )
    }
  }
}

export function freezeLocationInput () {
  return {
    type: FREEZE_LOCATION_INPUT
  }
}

export function handleImageUpload (file) {
  return async (dispatch, getState) => {
    try {
      if (file.type === 'image/jpeg' || file.type === 'image/png') {
        const options = {
          acl: 'private',
          app: sd.CONVECTION_GEMINI_APP,
          key: sd.GEMINI_S3_ACCESS_KEY,
          fail: (_err) => {
            dispatch(errorOnImage(file.name))
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
      } else {
        dispatch(addImageToUploadedImages(file.name))
        dispatch(errorOnImage(file.name))
      }
    } catch (err) {
      console.error(
        '(consignments/client/actions.js @ handleImageUpload) Error:', err
      )
    }
  }
}

export function hideNotConsigningMessage () {
  return {
    type: HIDE_NOT_CONSIGNING_MESSAGE
  }
}

export function ignoreRedirectOnAuth () {
  return {
    type: IGNORE_REDIRECT_ON_AUTH
  }
}

export function logIn (values, accountCreated = false) {
  return async (dispatch, getState) => {
    try {
      const {
        submissionFlow: {
          redirectOnAuth
        }
      } = getState()

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

      dispatch(updateUser(user.body.user, accountCreated))
      redirectOnAuth && dispatch(push(stepsConfig.chooseArtist.path))
      dispatch(clearError())
    } catch (err) {
      const errorMessage = get(err, 'response.body.error', false)
      dispatch(updateError(errorMessage))
      console.error(
        '(consignments/client/actions.js @ logIn) Error:', err
      )
    }
  }
}

export function removeErroredImage (fileName) {
  return {
    type: REMOVE_ERRORED_IMAGE,
    payload: {
      fileName
    }
  }
}

export function removeImage (fileName) {
  return (dispatch) => {
    dispatch(removeErroredImage(fileName))
    dispatch(stopProcessingImage(fileName))
    dispatch(removeUploadedImage(fileName))
  }
}

export function removeUploadedImage (fileName) {
  return {
    type: REMOVE_UPLOADED_IMAGE,
    payload: {
      fileName
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
      dispatch(logIn(values, true))
    } catch (err) {
      const errorMessage = get(err, 'response.body.error', false)
      dispatch(updateError(errorMessage))
      console.error(
        '(consignments/client/actions.js @ signUp) Error:', err
      )
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

export function submitArtist () {
  return {
    type: SUBMIT_ARTIST
  }
}

export function submitDescribeWork (values) {
  return (dispatch) => {
    dispatch(clearError())
    dispatch(startLoading())
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

export function startLoading () {
  return {
    type: START_LOADING
  }
}

export function stopLoading () {
  return {
    type: STOP_LOADING
  }
}

export function submissionCreated (submissionId) {
  return {
    type: SUBMISSION_CREATED,
    payload: {
      submissionId
    }
  }
}

export function submissionCompleted () {
  return {
    type: SUBMISSION_COMPLETED
  }
}

export function submissionError (errorType) {
  return {
    type: SUBMISSION_ERROR,
    payload: {
      errorType
    }
  }
}

export function submitPhoto () {
  return async (dispatch, getState) => {
    dispatch(startLoading())
    try {
      dispatch(completeSubmission())
    } catch (err) {
      dispatch(stopLoading())
      dispatch(updateError('Unable to submit at this time.'))
      console.error(
        '(consignments/client/actions.js @ submitPhoto) Error:', err
      )
    }
  }
}

export function unfreezeLocationInput () {
  return {
    type: UNFREEZE_LOCATION_INPUT
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

export function updateArtistName (artistName) {
  return {
    type: UPDATE_ARTIST_NAME,
    payload: {
      artistName
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
  return (dispatch) => {
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

export function updateCurrentStep (step) {
  return {
    type: UPDATE_CURRENT_STEP,
    payload: {
      step
    }
  }
}

export function updateInputs (inputs) {
  if (inputs.edition === false) {
    inputs.edition_number = ''
    inputs.edition_size = 0
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

export function updateLocationFromSubmissionAndFreeze (city, state, country) {
  return (dispatch, getState) => {
    const {
      submissionFlow: {
        submission: {
          location_city,
          location_state,
          location_country
        }
      }
    } = getState()
    const location = formattedLocation(location_city, location_state, location_country)

    dispatch(updateLocationAutocompleteValue(location))
    dispatch(freezeLocationInput())
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

export function updateStepsWithUser () {
  return {
    type: UPDATE_STEPS_WITH_USER
  }
}

export function updateStepsWithoutUser () {
  return {
    type: UPDATE_STEPS_WITHOUT_USER
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

export function updateUser (user, accountCreated) {
  return {
    type: UPDATE_USER,
    payload: {
      user,
      accountCreated
    }
  }
}

export function uploadImageToConvection (geminiToken, fileName) {
  return async (dispatch, getState) => {
    try {
      const { submissionFlow: { submission, submissionIdFromServer, user } } = getState()
      const submissionId = submission.id || submissionIdFromServer
      const token = await fetchToken(user.accessToken)
      const inputs = {
        submission_id: submissionId,
        gemini_token: geminiToken
      }
      const assetResponse = await request
        .post(`${sd.CONVECTION_APP_URL}/api/assets`)
        .set('Authorization', `Bearer ${token}`)
        .send(inputs)
      const assetId = assetResponse.body.id

      dispatch(stopProcessingImage(fileName))
      dispatch(addAssetId(assetId))
    } catch (err) {
      dispatch(errorOnImage(fileName))
      console.error(
        '(consignments/client/actions.js @ uploadImageToConvection) Error:', err
      )
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
      dispatch(errorOnImage(fileName))
      console.error(
        '(consignments/client/actions.js @ uploadImageToGemini) Error:', err
      )
    }
  }
}

// helpers
function encode (key, secret) {
  return btoa(unescape(encodeURIComponent([key, secret].join(':'))))
}

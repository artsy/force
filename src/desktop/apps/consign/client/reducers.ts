import * as actions from "./actions"
import u from "updeep"
import qs from "qs"
import { combineReducers } from "redux"
import { composeReducers } from "../../../components/react/utils/composeReducers"
import { data as sd } from "sharify"
import { contains } from "underscore"
import { reducer as formReducer } from "redux-form"
import { responsiveWindowReducer } from "../../../components/react/responsive_window"
import { routerReducer } from "react-router-redux"

const queryParams = qs.parse(window.location.search.replace(/^\?/, ""))

const createAccountStep = "createAccount"
const chooseArtistStep = "chooseArtist"
const describeWorkStep = "describeWork"
const uploadPhotosStep = "uploadPhotos"

const initialState = {
  artistAutocompleteSuggestions: [],
  artistAutocompleteValue: "",
  artistName: sd.SUBMISSION_ARTIST_NAME || "",
  assetIds: [],
  authFormState: "signup",
  categoryOptions: [
    "Painting",
    "Sculpture",
    "Photography",
    "Print",
    "Drawing, Collage or other Work on Paper",
    "Mixed Media",
    "Performance Art",
    "Installation",
    "Video/Film/Animation",
    "Architecture",
    "Fashion Design and Wearable Art",
    "Jewelry",
    "Design/Decorative Art",
    "Textile Arts",
    "Other",
  ],

  currencyOptions: ["USD", "GBP"],
  currentStep: createAccountStep,
  error: null,
  erroredImages: [],
  inputs: {
    artist_id: "",
    authenticity_certificate: false,
    category: "Painting",
    currency: "USD",
    depth: "",
    dimensions_metric: "in",
    edition: false,
    edition_number: "",
    edition_size: "",
    height: "",
    location_city: "",
    location_state: "",
    location_country: "",
    medium: "",
    minimum_price_yesno: false,
    minimum_price_dollars: "",
    phone: "",
    provenance: "",
    signature: false,
    title: "",
    width: "",
    year: "",
  },
  isMobile: false,
  isLoading: false,
  locationAutocompleteFrozen: false,
  locationAutocompleteSuggestions: [],
  locationAutocompleteValue: "",
  notConsigningArtist: false,
  processingImages: [],
  progressBars: {},
  redirectOnAuth: true,
  resetPasswordSuccess: false,
  steps: [],
  submission: sd.SUBMISSION || {},
  submissionIdFromServer: sd.SUBMISSION_ID,
  uploadedImages: [],
  user: sd.CURRENT_USER,

  /*
    Tracking parameters from Reaction
  */
  contextPath: queryParams.contextPath, // Typically set if a user has entered a consignment from an artist /consign microfunnel page.
  subject: queryParams.subject, // The subject of the event
}

function submissionFlow(state = initialState, action) {
  switch (action.type) {
    case actions.ADD_ASSET_ID: {
      return u(
        {
          assetIds: state.assetIds.concat(action.payload.assetId),
        },
        state
      )
    }
    case actions.ADD_IMAGE_TO_UPLOADED_IMAGES: {
      const newImage = {
        fileName: action.payload.fileName,
        processing: true,
        src: action.payload.src,
      }
      return u(
        {
          // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
          uploadedImages: state.uploadedImages.concat(newImage),
        },
        state
      )
    }
    case actions.CLEAR_ARTIST_SUGGESTIONS: {
      return u(
        {
          artistAutocompleteSuggestions: [],
        },
        state
      )
    }
    case actions.CLEAR_ERROR: {
      return u(
        {
          error: null,
        },
        state
      )
    }
    case actions.CLEAR_LOCATION_DATA: {
      return u(
        {
          inputs: {
            location_city: "",
            location_country: "",
            location_state: "",
          },
        },
        state
      )
    }
    case actions.CLEAR_LOCATION_SUGGESTIONS: {
      return u(
        {
          locationAutocompleteSuggestions: [],
        },
        state
      )
    }
    case actions.ERROR_ON_IMAGE: {
      const fileName = action.payload.fileName
      if (!contains(state.erroredImages, fileName)) {
        return u(
          {
            erroredImages: state.erroredImages.concat(fileName),
          },
          state
        )
      }
      return state
    }
    case actions.FREEZE_LOCATION_INPUT: {
      return u(
        {
          locationAutocompleteFrozen: true,
        },
        state
      )
    }
    case actions.HIDE_LOADER: {
      return u(
        {
          isLoading: false,
        },
        state
      )
    }
    case actions.HIDE_NOT_CONSIGNING_MESSAGE: {
      return u(
        {
          notConsigningArtist: false,
        },
        state
      )
    }
    case actions.IGNORE_REDIRECT_ON_AUTH: {
      return u(
        {
          redirectOnAuth: false,
        },
        state
      )
    }
    case actions.REMOVE_ERRORED_IMAGE: {
      const fileName = action.payload.fileName
      if (contains(state.erroredImages, fileName)) {
        return u(
          {
            erroredImages: u.reject(ff => ff === fileName),
          },
          state
        )
      }
      return state
    }
    case actions.REMOVE_UPLOADED_IMAGE: {
      const fileName = action.payload.fileName
      return u(
        {
          uploadedImages: u.reject(ff => ff.fileName === fileName),
        },
        state
      )
    }
    case actions.SHOW_LOADER: {
      return u(
        {
          isLoading: true,
        },
        state
      )
    }
    case actions.SHOW_NOT_CONSIGNING_MESSAGE: {
      return u(
        {
          notConsigningArtist: true,
        },
        state
      )
    }
    case actions.SHOW_RESET_PASSWORD_SUCCESS_MESSAGE: {
      return u(
        {
          resetPasswordSuccess: true,
        },
        state
      )
    }
    case actions.START_PROCESSING_IMAGE: {
      const fileName = action.payload.fileName
      if (!contains(state.processingImages, fileName)) {
        return u(
          {
            processingImages: state.processingImages.concat(fileName),
          },
          state
        )
      }
      return state
    }
    case actions.STOP_PROCESSING_IMAGE: {
      const fileName = action.payload.fileName
      if (contains(state.processingImages, fileName)) {
        return u(
          {
            processingImages: u.reject(ff => ff === fileName),
          },
          state
        )
      }
      return state
    }
    case actions.UNFREEZE_LOCATION_INPUT: {
      return u(
        {
          locationAutocompleteFrozen: false,
          locationAutocompleteValue: "",
        },
        state
      )
    }
    case actions.UPDATE_ARTIST_AUTOCOMPLETE_VALUE: {
      return u(
        {
          artistAutocompleteValue: action.payload.value,
        },
        state
      )
    }
    case actions.UPDATE_ARTIST_ID: {
      return u(
        {
          inputs: {
            artist_id: action.payload.artistId,
          },
        },
        state
      )
    }
    case actions.UPDATE_ARTIST_NAME: {
      return u(
        {
          artistName: action.payload.artistName,
        },
        state
      )
    }
    case actions.UPDATE_ARTIST_SUGGESTIONS: {
      return u(
        {
          artistAutocompleteSuggestions: action.payload.suggestions,
        },
        state
      )
    }
    case actions.UPDATE_AUTH_FORM_STATE: {
      return u(
        {
          authFormState: action.payload.state,
        },
        state
      )
    }
    case actions.UPDATE_CURRENT_STEP: {
      return u(
        {
          currentStep: action.payload.step,
        },
        state
      )
    }
    case actions.UPDATE_ERROR: {
      return u(
        {
          error: action.payload.error,
        },
        state
      )
    }
    case actions.UPDATE_INPUTS: {
      return u(
        {
          inputs: {
            ...state.inputs,
            ...action.payload.inputs,
          },
        },
        state
      )
    }
    case actions.UPDATE_LOCATION_AUTOCOMPLETE_VALUE: {
      return u(
        {
          locationAutocompleteValue: action.payload.value,
        },
        state
      )
    }
    case actions.UPDATE_LOCATION_CITY_VALUE: {
      return u(
        {
          inputs: {
            location_city: action.payload.city,
          },
        },
        state
      )
    }
    case actions.UPDATE_LOCATION_SUGGESTIONS: {
      if (action.payload.searchText !== state.locationAutocompleteValue) {
        return state
      }
      return u(
        {
          locationAutocompleteSuggestions: action.payload.suggestions,
        },
        state
      )
    }
    case actions.UPDATE_LOCATION_VALUES: {
      return u(
        {
          inputs: {
            location_city: action.payload.city,
            location_country: action.payload.country,
            location_state: action.payload.state,
          },
        },
        state
      )
    }
    case actions.UPDATE_PROGRESS_BAR: {
      const updatedProgress = {
        [action.payload.fileName]: action.payload.percent,
      }
      return u(
        {
          progressBars: {
            ...state.progressBars,
            ...updatedProgress,
          },
        },
        state
      )
    }
    case actions.UPDATE_STEPS_WITH_USER: {
      return u(
        {
          currentStep: chooseArtistStep,
          steps: [chooseArtistStep, describeWorkStep, uploadPhotosStep],
        },
        state
      )
    }
    case actions.UPDATE_STEPS_AFTER_CREATE_USER: {
      return u(
        {
          currentStep: describeWorkStep,
          steps: [chooseArtistStep, describeWorkStep, uploadPhotosStep],
        },
        state
      )
    }
    case actions.UPDATE_STEPS_WITHOUT_USER: {
      return u(
        {
          currentStep: chooseArtistStep,
          steps: [
            chooseArtistStep,
            createAccountStep,
            describeWorkStep,
            uploadPhotosStep,
          ],
        },
        state
      )
    }
    case actions.UPDATE_SUBMISSION: {
      return u(
        {
          submission: action.payload.submission,
        },
        state
      )
    }
    case actions.UPDATE_USER: {
      return u(
        {
          user: action.payload.user,
        },
        state
      )
    }
    case actions.UPDATE_USER_PHONE: {
      return u(
        {
          user: {
            phone: action.payload.phone,
          },
        },
        state
      )
    }
    default:
      return state
  }
}

export default combineReducers({
  submissionFlow: composeReducers(
    responsiveWindowReducer,
    submissionFlow
  ) as any,
  router: routerReducer,
  form: formReducer,
}) as any

import Autosuggest from 'react-autosuggest'
import PropTypes from 'prop-types'
import React from 'react'
import block from 'bem-cn'
import { Field, reduxForm } from 'redux-form'
import { compose } from 'underscore'
import { connect } from 'react-redux'
import { renderCheckboxInput } from '../checkbox_input'
import { renderRadioInput } from '../radio_input'
import { renderSelectInput } from '../select_input'
import { renderTextInput } from '../text_input'
import {
  chooseLocation,
  clearLocationSuggestions,
  fetchLocationSuggestions,
  submitDescribeWork,
  updateLocationAutocomplete
} from '../../client/actions'

function validate (values) {
  const {
    authenticity_certificate,
    height,
    location,
    medium,
    signature,
    title,
    width,
    year
  } = values
  const errors = {}

  if (!authenticity_certificate) errors.authenticity_certificate = 'Required'
  if (!height) errors.height = 'Required'
  if (!location) errors.location = 'Required'
  if (!medium) errors.medium = 'Required'
  if (!signature) errors.signature = 'Required'
  if (!title) errors.title = 'Required'
  if (!width) errors.width = 'Required'
  if (!year) errors.year = 'Required'

  return errors
}

function getSuggestionValue (suggestion) {
  return suggestion.description
}

function renderSuggestion (suggestion) {
  return (
    <div className='autosuggest-suggestion'>
      <div>{suggestion.description}</div>
    </div>
  )
}

function DescribeWork (props) {
  const {
    categoryOptions,
    chooseLocationAction,
    clearLocationSuggestionsAction,
    error,
    fetchLocationSuggestionsAction,
    handleSubmit,
    locationAutocompleteSuggestions,
    locationAutocompleteValue,
    submitDescribeWorkAction,
    updateLocationAutocompleteAction,
    invalid,
    pristine
  } = props

  const b = block('consignments2-submission-describe-work')

  const locationAutosuggestInputProps = {
    value: locationAutocompleteValue,
    onChange: updateLocationAutocompleteAction
  }

  const renderInputComponent = inputProps => (
    <div>
      <input {...inputProps} className={b('input').mix('bordered-input')} />
    </div>
  )

  return (
    <form className={b()} onSubmit={handleSubmit(submitDescribeWorkAction)}>
      <div className={b('row')}>
        <div className={b('row-item')}>
          <Field name='title' component={renderTextInput}
            item={'title'}
            instructions={'If the title is unknown, please enter your best guess.'}
            label={'Title*'}
          />
        </div>
      </div>
      <div className={b('row')}>
        <div className={b('row-item')}>
          <Field name='medium' component={renderTextInput}
            item={'medium'}
            label={'Medium*'}
          />
        </div>
      </div>
      <div className={b('row')}>
        <div className={b('row-item')}>
          <Field name='category' component={renderSelectInput}
            item={'category'}
            label={'Category*'}
            options={categoryOptions}
          />
        </div>
        <div className={b('row-item')}>
          <Field name='year' component={renderTextInput}
            item={'year'}
            label={'Year*'}
          />
        </div>
      </div>
      <div className={b('row')}>
        <div className={b('row-item')}>
          <Field name='height' component={renderTextInput}
            item={'height'}
            label={'Height*'}
          />
        </div>
        <div className={b('row-item')}>
          <Field name='width' component={renderTextInput}
            item={'width'}
            label={'Width*'}
          />
        </div>
        <div className={b('row-item')}>
          <Field name='depth' component={renderTextInput}
            item={'depth'}
            label={'Depth'}
          />
        </div>
        <div className={b('row-item')}>
          <Field name='dimensions_metric' component={renderSelectInput}
            item={'dimensions_metric'}
            label={'Units*'}
            options={['in', 'cm']}
          />
        </div>
      </div>
      <div className={b('row', {'border-bottom': true})}>
        <div className={b('row-item')}>
          <Field name='edition' component={renderCheckboxInput}
            item={'edition'}
            label={'This is an edition'}
          />
        </div>
      </div>
      <div className={b('small-row', {'border-bottom': true})}>
        <div className={b('row-item')}>
          <Field name='signature' component={renderRadioInput}
            item={'signature'}
            label={'Is this work signed?*'}
            options={['yes', 'no']}
          />
        </div>
      </div>
      <div className={b('small-row', {'border-bottom': true})}>
        <div className={b('row-item')}>
          <Field name='authenticity_certificate' component={renderRadioInput}
            item={'authenticity_certificate'}
            label={'Does this work come with a certificate of authenticity?*'}
            options={['yes', 'no']}
          />
        </div>
      </div>
      <div className={b('row')}>
        <div className={b('row-item')}>
          <Field name='provenance' component={renderTextInput}
            item={'provenance'}
            instructions={'Where did you acquire this work?'}
            label={'Provenance'}
          />
        </div>
      </div>
      <div className={b('row')}>
        <div className={b('row-item')}>
          <div className={b('instructions')}>What city is the work located in?*</div>
          <Autosuggest
            suggestions={locationAutocompleteSuggestions}
            onSuggestionsFetchRequested={fetchLocationSuggestionsAction}
            onSuggestionsClearRequested={clearLocationSuggestionsAction}
            onSuggestionSelected={chooseLocationAction}
            getSuggestionValue={getSuggestionValue}
            renderInputComponent={renderInputComponent}
            renderSuggestion={renderSuggestion}
            inputProps={locationAutosuggestInputProps}
          />
        </div>
      </div>
      <button
        className={b('next-button').mix('avant-garde-button-black')}
        disabled={pristine || invalid || locationAutocompleteValue.length === 0}
        type='submit'
      >
        Next
      </button>
      {
        error && <div className={b('error')}>{error}</div>
      }
    </form>
  )
}

const mapStateToProps = (state) => {
  return {
    categoryOptions: state.submissionFlow.categoryOptions,
    error: state.submissionFlow.error,
    locationAutocompleteSuggestions: state.submissionFlow.locationAutocompleteSuggestions,
    locationAutocompleteValue: state.submissionFlow.locationAutocompleteValue
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    chooseLocationAction (event, { suggestion, suggestionValue }) {
      dispatch(chooseLocation(suggestion))
    },
    clearLocationSuggestionsAction () {
      dispatch(clearLocationSuggestions())
    },
    fetchLocationSuggestionsAction ({ value }) {
      dispatch(fetchLocationSuggestions(value))
    },
    submitDescribeWorkAction (values) {
      dispatch(submitDescribeWork(values))
    },
    updateLocationAutocompleteAction (event, { newValue }) {
      dispatch(updateLocationAutocomplete(newValue))
    }
  }
}

DescribeWork.propTypes = {
  categoryOptions: PropTypes.array.isRequired,
  chooseLocationAction: PropTypes.func.isRequired,
  clearLocationSuggestionsAction: PropTypes.func.isRequired,
  error: PropTypes.string,
  fetchLocationSuggestionsAction: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  invalid: PropTypes.bool,
  locationAutocompleteSuggestions: PropTypes.array,
  locationAutocompleteValue: PropTypes.string,
  pristine: PropTypes.bool,
  submitDescribeWorkAction: PropTypes.func.isRequired,
  updateLocationAutocompleteAction: PropTypes.func.isRequired
}

export default compose(
  reduxForm({
    form: 'describeWork', // a unique identifier for this form
    validate
  }),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(DescribeWork)

import LocationAutocomplete from '../location_autocomplete'
import PropTypes from 'prop-types'
import React from 'react'
import block from 'bem-cn'
import { Field, formValueSelector, reduxForm } from 'redux-form'
import { compose } from 'underscore'
import { connect } from 'react-redux'
import { renderRadioInput } from '../radio_input'
import { renderSelectInput } from '../select_input'
import { renderTextInput } from '../text_input'
import {
  submitDescribeWork
} from '../../client/actions'

function validate (values, props) {
  const {
    location,
    title,
    year
  } = values
  const errors = {}

  if (!location) errors.location = 'Required'
  if (!title) errors.title = 'Required'
  if (!year) errors.year = 'Required'

  return errors
}

export function makeDescribeWorkMobile (initialValues = {}) {
  function DescribeWorkMobile (props) {
    const {
      artistName,
      categoryOptions,
      error,
      loading,
      handleSubmit,
      locationAutocompleteFrozen,
      locationAutocompleteValue,
      submitDescribeWorkAction,
      invalid,
      pristine
    } = props

    const b = block('consignments2-submission-describe-work-mobile')

    return (
      <div className={b()}>
        <div className={b('title')}>
          Enter details about the work by {artistName}
        </div>
        <form className={b('form')} onSubmit={handleSubmit(submitDescribeWorkAction)}>
          <div className={b('row')}>
            <div className={b('row-item')}>
              <Field name='title' component={renderTextInput}
                item={'title'}
                instructions={'If the title is unknown, please enter your best guess.'}
                label={'Title*'}
                autofocus
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
          </div>
          <div className={b('row')}>
            <div className={b('row-item')}>
              <Field name='year' component={renderTextInput}
                item={'year'}
                label={'Year*'}
              />
            </div>
          </div>
          <div className={b('small-row', {'border-bottom': true})}>
            <div className={b('row-item')}>
              <Field name='signature' component={renderRadioInput}
                item={'signature'}
                label={'Is this work signed?*'}
                options={[{ label: 'yes', val: true }, { label: 'no', val: false }]}
              />
            </div>
          </div>
          <div className={b('small-row', {'border-bottom': true})}>
            <div className={b('row-item')}>
              <Field name='authenticity_certificate' component={renderRadioInput}
                item={'authenticity_certificate'}
                label={'Does this work come with a certificate of authenticity?*'}
                options={[{ label: 'yes', val: true }, { label: 'no', val: false }]}
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
              <LocationAutocomplete />
            </div>
          </div>
          <button
            className={b('next-button').mix('avant-garde-button-black')}
            disabled={pristine || locationAutocompleteValue.length === 0 || !locationAutocompleteFrozen}
            type='submit'
          >
            {
              loading ? <div className='loading-spinner-white' /> : 'Submit'
            }
          </button>
          {
            error && <div className={b('error')}>{error}</div>
          }
        </form>
      </div>
    )
  }

  const mapStateToProps = (state) => {
    const selector = formValueSelector('describeWork')
    const hasEditionValue = selector(state, 'edition')

    return {
      artistName: state.submissionFlow.artistName,
      categoryOptions: state.submissionFlow.categoryOptions,
      error: state.submissionFlow.error,
      isMobile: state.submissionFlow.isMobile,
      loading: state.submissionFlow.loading,
      hasEditionValue,
      locationAutocompleteFrozen: state.submissionFlow.locationAutocompleteFrozen,
      locationAutocompleteValue: state.submissionFlow.locationAutocompleteValue
    }
  }

  const mapDispatchToProps = {
    submitDescribeWorkAction: submitDescribeWork
  }

  DescribeWorkMobile.propTypes = {
    artistName: PropTypes.string.isRequired,
    categoryOptions: PropTypes.array.isRequired,
    error: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    invalid: PropTypes.bool,
    locationAutocompleteFrozen: PropTypes.bool.isRequired,
    locationAutocompleteValue: PropTypes.string,
    pristine: PropTypes.bool,
    submitDescribeWorkAction: PropTypes.func.isRequired
  }

  return compose(
    reduxForm({
      form: 'describeWork', // a unique identifier for this form
      validate,
      initialValues,
      enableReinitialize: true
    }),
    connect(
      mapStateToProps,
      mapDispatchToProps
    )
  )(DescribeWorkMobile)
}

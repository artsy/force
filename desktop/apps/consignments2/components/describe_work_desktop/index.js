import LocationAutocomplete from '../location_autocomplete'
import PropTypes from 'prop-types'
import React from 'react'
import block from 'bem-cn'
import { Field, formValueSelector, reduxForm } from 'redux-form'
import { compose } from 'underscore'
import { connect } from 'react-redux'
import { renderCheckboxInput } from '../checkbox_input'
import { renderRadioInput } from '../radio_input'
import { renderSelectInput } from '../select_input'
import { renderTextInput } from '../text_input'
import {
  submitDescribeWork
} from '../../client/actions'

function validate (values, props) {
  const {
    authenticity_certificate,
    edition,
    edition_number,
    edition_size,
    height,
    medium,
    signature,
    title,
    width,
    year
  } = values
  const errors = {}

  if (!authenticity_certificate) errors.authenticity_certificate = 'Required'
  if (!signature) errors.signature = 'Required'
  if (!title) errors.title = 'Required'
  if (!year) errors.year = 'Required'
  if (!width) errors.width = 'Required'
  if (!medium) errors.medium = 'Required'
  if (!height) errors.height = 'Required'

  if (edition) {
    if (!edition_size) errors.edition_size = 'Required'
    if (!edition_number) errors.edition_number = 'Required'
  }

  return errors
}

function DescribeWorkDesktop (props) {
  const {
    artistName,
    categoryOptions,
    error,
    loading,
    handleSubmit,
    hasEditionValue,
    locationAutocompleteFrozen,
    locationAutocompleteValue,
    submitDescribeWorkAction,
    invalid,
    pristine
  } = props

  const b = block('consignments2-submission-describe-work')

  return (
    <div className={b()}>
      <div className={b('title')}>
        Enter details about the work by {artistName}
      </div>
      <div className={b('subtitle')}>
        To ensure a quick response please provide as much information as possible.
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
          <div className={b('row-item')}>
            <Field name='year' component={renderTextInput}
              item={'year'}
              label={'Year*'}
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
        {
          hasEditionValue && (
            <div className={b('row')}>
              <div className={b('row-item')}>
                <Field name='edition_number' component={renderTextInput}
                  item={'edition_number'}
                  label={'Edition Number*'}
                />
              </div>
              <div className={b('row-item')}>
                <Field name='edition_size' component={renderTextInput}
                  item={'edition_size'}
                  label={'Size of Edition*'}
                />
              </div>
            </div>
          )
        }
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
            <LocationAutocomplete />
          </div>
        </div>
        <button
          className={b('next-button').mix('avant-garde-button-black')}
          disabled={pristine || invalid || locationAutocompleteValue.length === 0 || !locationAutocompleteFrozen}
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
    loading: state.submissionFlow.loading,
    hasEditionValue,
    locationAutocompleteFrozen: state.submissionFlow.locationAutocompleteFrozen,
    locationAutocompleteValue: state.submissionFlow.locationAutocompleteValue
  }
}

const mapDispatchToProps = {
  submitDescribeWorkAction: submitDescribeWork
}

DescribeWorkDesktop.propTypes = {
  artistName: PropTypes.string.isRequired,
  categoryOptions: PropTypes.array.isRequired,
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  hasEditionValue: PropTypes.bool.isRequired,
  invalid: PropTypes.bool,
  locationAutocompleteFrozen: PropTypes.bool.isRequired,
  locationAutocompleteValue: PropTypes.string,
  pristine: PropTypes.bool,
  submitDescribeWorkAction: PropTypes.func.isRequired
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
)(DescribeWorkDesktop)

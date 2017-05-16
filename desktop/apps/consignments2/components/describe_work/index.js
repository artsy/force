import PropTypes from 'prop-types'
import React from 'react'
import block from 'bem-cn'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { renderCheckboxInput } from '../checkbox_input'
import { renderRadioInput } from '../radio_input'
import { renderSelectInput } from '../select_input'
import { renderTextInput } from '../text_input'
import {
  submitDescribeWork
} from '../../client/actions'

function validate (values) {
  const {
    authenticity_certificate,
    height,
    location,
    signature,
    title,
    width,
    year
  } = values
  const errors = {}

  if (!authenticity_certificate) errors.authenticity_certificate = 'Required'
  if (!height) errors.height = 'Required'
  if (!location) errors.location = 'Required'
  if (!signature) errors.signature = 'Required'
  if (!title) errors.title = 'Required'
  if (!width) errors.width = 'Required'
  if (!year) errors.year = 'Required'

  return errors
}

let DescribeWork = props => {
  const {
    handleSubmit,
    submitDescribeWorkAction,
    invalid,
    pristine
  } = props

  const b = block('consignments2-submission-describe-work')

  return (
    <form className={b()} onSubmit={handleSubmit(submitDescribeWorkAction)}>
      <div className={b('row')}>
        <div className={b('row-item')}>
          <Field name='title' component={renderTextInput}
            item={'title'}
            instructions={'If the title is unknown, please enter your best guess.'}
            label={'Title'}
          />
        </div>
      </div>
      <div className={b('row')}>
        <div className={b('row-item')}>
          <Field name='medium' component={renderSelectInput}
            item={'medium'}
            label={'Medium'}
            options={['painting', 'sculpture', 'print']}
          />
        </div>
        <div className={b('row-item')}>
          <Field name='year' component={renderTextInput}
            item={'year'}
            label={'Year'}
          />
        </div>
      </div>
      <div className={b('row')}>
        <div className={b('row-item')}>
          <Field name='height' component={renderTextInput}
            item={'height'}
            label={'Height'}
          />
        </div>
        <div className={b('row-item')}>
          <Field name='width' component={renderTextInput}
            item={'width'}
            label={'Width'}
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
            label={'Units'}
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
            label={'Is this work signed?'}
            options={['yes', 'no']}
          />
        </div>
      </div>
      <div className={b('small-row', {'border-bottom': true})}>
        <div className={b('row-item')}>
          <Field name='authenticity_certificate' component={renderRadioInput}
            item={'authenticity_certificate'}
            label={'Does this work come with a certificate of authenticity?'}
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
          <Field name='location' component={renderTextInput}
            item={'location'}
            instructions={'What city is the work located in?'}
            label={'Location'}
          />
        </div>
      </div>
      <button
        className={b('next-button').mix('avant-garde-button-black')}
        disabled={pristine || invalid}
        type='submit'
      >
        Next
      </button>
    </form>
  )
}

const mapDispatchToProps = {
  submitDescribeWorkAction: submitDescribeWork
}

DescribeWork.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  invalid: PropTypes.bool,
  pristine: PropTypes.bool,
  submitDescribeWorkAction: PropTypes.func.isRequired
}

DescribeWork = connect(
  null,
  mapDispatchToProps
)(DescribeWork)

DescribeWork = reduxForm({
  form: 'describeWork', // a unique identifier for this form
  validate
})(DescribeWork)

export default DescribeWork

import PropTypes from 'prop-types'
import React from 'react'
import block from 'bem-cn'
import { Field, reduxForm } from 'redux-form'
import { compose } from 'underscore'
import { connect } from 'react-redux'
import { renderTextInput } from '../text_input'
import {
  logIn
} from '../../client/actions'

function validate (values) {
  const {
    email,
    password
  } = values
  const errors = {}

  if (!email) errors.email = 'Required'
  if (!password) errors.password = 'Required'

  return errors
}

function ForgotPassword (props) {
  const {
    error,
    handleSubmit,
    logInAction,
    invalid,
    pristine
  } = props

  const b = block('consignments2-submission-log-in')

  return (
    <form className={b()} onSubmit={handleSubmit(logInAction)}>
      <div className={b('row')}>
        <div className={b('row-item')}>
          <Field name='email' component={renderTextInput}
            item={'email'}
            label={'Email'}
          />
        </div>
      </div>
      <div className={b('row')}>
        <div className={b('row-item')}>
          <Field name='password' component={renderTextInput}
            item={'password'}
            label={'Password'}
            type={'password'}
          />
        </div>
      </div>
      <button
        className={b('next-button').mix('avant-garde-button-black')}
        disabled={pristine || invalid}
        type='submit'
      >
        Log In
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
    logInAction (values) {
      dispatch(logIn(values))
    }
  }
}

ForgotPassword.propTypes = {
  error: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  invalid: PropTypes.bool,
  logInAction: PropTypes.func.isRequired,
  pristine: PropTypes.bool
}

export default compose(
  reduxForm({
    form: 'logIn', // a unique identifier for this form
    validate
  }),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(ForgotPassword)

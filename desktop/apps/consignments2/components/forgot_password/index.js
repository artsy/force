import PropTypes from 'prop-types'
import React from 'react'
import block from 'bem-cn'
import { Field, reduxForm } from 'redux-form'
import { compose } from 'underscore'
import { connect } from 'react-redux'
import { renderTextInput } from '../text_input'
import {
  resetPassword,
  updateAuthFormStateAndClearError
} from '../../client/actions'

function validate (values) {
  const {
    email
  } = values
  const errors = {}

  if (!email) errors.email = 'Required'
  return errors
}

function ForgotPassword (props) {
  const {
    error,
    handleSubmit,
    invalid,
    pristine,
    resetPasswordAction,
    resetPasswordSuccess,
    updateAuthFormStateAndClearErrorAction
  } = props

  const b = block('consignments2-submission-forgot-password')

  return (
    <div className={b()}>
      <div className={b('title')}>
        Enter the email address associated with your account
      </div>
      <div className={b('subtitle')}>
        New to Artsy? <span className={b('clickable')} onClick={() => updateAuthFormStateAndClearErrorAction('signUp')}>Sign up</span>.
      </div>
      <form className={b()} onSubmit={handleSubmit(resetPasswordAction)}>
        <div className={b('row')}>
          <div className={b('row-item')}>
            <Field name='email' component={renderTextInput}
              item={'email'}
              label={'Email'}
            />
          </div>
        </div>
        <button
          className={b('reset-password-button').mix('avant-garde-button-black')}
          disabled={pristine || invalid}
          type='submit'
        >
          Reset Password
        </button>
        {
          error && <div className={b('error')}>{error}</div>
        }
        {
          resetPasswordSuccess && <div className={b('success')}>Instructions on how to reset your password have been sent.</div>
        }
      </form>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    categoryOptions: state.submissionFlow.categoryOptions,
    error: state.submissionFlow.error,
    locationAutocompleteSuggestions: state.submissionFlow.locationAutocompleteSuggestions,
    locationAutocompleteValue: state.submissionFlow.locationAutocompleteValue,
    resetPasswordSuccess: state.submissionFlow.resetPasswordSuccess
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    resetPasswordAction (values) {
      dispatch(resetPassword(values))
    },
    updateAuthFormStateAndClearErrorAction (state) {
      dispatch(updateAuthFormStateAndClearError(state))
    }
  }
}

ForgotPassword.propTypes = {
  error: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  invalid: PropTypes.bool,
  pristine: PropTypes.bool,
  resetPasswordAction: PropTypes.func.isRequired,
  resetPasswordSuccess: PropTypes.bool.isRequired,
  updateAuthFormStateAndClearErrorAction: PropTypes.func.isRequired
}

export default compose(
  reduxForm({
    form: 'forgotPassword', // a unique identifier for this form
    validate
  }),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(ForgotPassword)

import PropTypes from 'prop-types'
import React from 'react'
import block from 'bem-cn-lite'
import { Field, reduxForm } from 'redux-form'
import { compose } from 'underscore'
import { connect } from 'react-redux'
import { renderTextInput } from '../text_input'
import {
  signUp,
  updateAuthFormStateAndClearError
} from '../../client/actions'

function validate (values) {
  const {
    email,
    name,
    password
  } = values
  const errors = {}

  if (!name) errors.name = 'Required'
  if (!email) errors.email = 'Required'
  if (!password) errors.password = 'Required'

  return errors
}

function SignUp (props) {
  const {
    error,
    handleSubmit,
    isLoading,
    signUpAction,
    updateAuthFormStateAndClearErrorAction
  } = props

  const b = block('consignments-submission-sign-up')

  return (
    <div className={b()}>
      <div className={b('title')}>
        Create an Account
      </div>
      <div className={b('subtitle')}>
        Already have an account? <span className={b('clickable')} onClick={() => updateAuthFormStateAndClearErrorAction('logIn')}>Log in</span>.
      </div>
      <form className={b('form')} onSubmit={handleSubmit(signUpAction)}>
        <div className={b('row')}>
          <div className={b('row-item')}>
            <Field name='name' component={renderTextInput}
              item={'name'}
              label={'Full Name'}
              autofocus
            />
          </div>
        </div>
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
          className={b.builder()('sign-up-button').mix('avant-garde-button-black')()}
          type='submit'
        >
          {
            isLoading ? <div className='loading-spinner-white' /> : 'Submit'
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
  return {
    error: state.submissionFlow.error,
    isLoading: state.submissionFlow.isLoading
  }
}

const mapDispatchToProps = {
  signUpAction: signUp,
  updateAuthFormStateAndClearErrorAction: updateAuthFormStateAndClearError
}

SignUp.propTypes = {
  error: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  signUpAction: PropTypes.func.isRequired,
  updateAuthFormStateAndClearErrorAction: PropTypes.func.isRequired
}

export default compose(
  reduxForm({
    form: 'signUp', // a unique identifier for this form
    validate
  }),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(SignUp)

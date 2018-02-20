import _ForgotPassword from '../forgot_password'
import _LogIn from '../log_in'
import PropTypes from 'prop-types'
import React from 'react'
import _SignUp from '../sign_up'
import block from 'bem-cn-lite'
import { connect } from 'react-redux'
import { incrementStep } from '../../client/actions'

// NOTE: Required to enable rewire hooks in tests
// TODO: Refactor with jest
let ForgotPassword = _ForgotPassword
let LogIn = _LogIn
let SignUp = _SignUp

function CreateAccount({ CurrentStateComponent }) {
  const b = block('consignments-submission-create-account')

  return (
    <div className={b()}>
      <CurrentStateComponent />
    </div>
  )
}

const mapDispatchToProps = {
  incrementStepAction: incrementStep,
}

const mapStateToProps = (state) => {
  const { submissionFlow: { authFormState } } = state

  const stateToComponents = {
    logIn: LogIn,
    signUp: SignUp,
    forgotPassword: ForgotPassword,
  }

  return {
    CurrentStateComponent: stateToComponents[authFormState],
  }
}

// TODO: Refactor out rewire
module.exports = connect(mapStateToProps, mapDispatchToProps)(CreateAccount)

CreateAccount.propTypes = {
  CurrentStateComponent: PropTypes.func.isRequired,
}

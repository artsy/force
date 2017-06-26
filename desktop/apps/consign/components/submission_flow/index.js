import PropTypes from 'prop-types'
import React from 'react'
import StepMarker from '../step_marker'
import block from 'bem-cn'
import stepsConfig from '../../client/steps_config'
import { connect } from 'react-redux'
import {
  resizeWindow
} from '../../client/actions'

function SubmissionFlow (props) {
  const b = block('consignments-submission-flow')
  const { CurrentStepComponent } = props

  return (
    <div className={b()}>
      <StepMarker />
      <div className={b('step-form')}>
        <CurrentStepComponent />
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  const {
    submissionFlow: {
      currentStep
    }
  } = state

  return {
    CurrentStepComponent: stepsConfig[currentStep].component
  }
}

const mapDispatchToProps = {
  responsiveWindowAction: resizeWindow
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubmissionFlow)

SubmissionFlow.propTypes = {
  CurrentStepComponent: PropTypes.func.isRequired
}

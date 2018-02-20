import PropTypes from 'prop-types'
import React from 'react'
import block from 'bem-cn-lite'
import _StepMarker from '../step_marker'
import _stepsConfig from '../../client/steps_config'
import { connect } from 'react-redux'
import { resizeWindow } from '../../client/actions'

// NOTE: Required to enable rewire hooks in tests
// TODO: Refactor with jest
// FIXME: Rewire
let stepsConfig = _stepsConfig
let StepMarker = _StepMarker

function SubmissionFlow(props) {
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
  const { submissionFlow: { currentStep } } = state

  return {
    CurrentStepComponent: stepsConfig[currentStep].component,
  }
}

const mapDispatchToProps = {
  responsiveWindowAction: resizeWindow,
}

// NOTE: Required to enable rewire hooks in tests
// TODO: Refactor with jest
// FIXME: Rewire
module.exports = connect(mapStateToProps, mapDispatchToProps)(SubmissionFlow)

SubmissionFlow.propTypes = {
  CurrentStepComponent: PropTypes.func.isRequired,
}

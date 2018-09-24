import PropTypes from "prop-types"
import React from "react"
import _StepMarker from "../step_marker"
import block from "bem-cn-lite"
import _stepsConfig from "../../client/steps_config"
import { connect } from "react-redux"

// FIXME: Rewire
let StepMarker = _StepMarker
let stepsConfig = _stepsConfig

function SubmissionFlow(props) {
  const b = block("consignments-submission-flow")
  const { CurrentStepComponent } = props

  return (
    <div className={b()}>
      <StepMarker />
      <div className={b("step-form")}>
        <CurrentStepComponent />
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  const { submissionFlow: { currentStep } } = state

  return {
    CurrentStepComponent: stepsConfig[currentStep].component,
  }
}

export default connect(mapStateToProps)(SubmissionFlow)

SubmissionFlow.propTypes = {
  CurrentStepComponent: PropTypes.func.isRequired,
}

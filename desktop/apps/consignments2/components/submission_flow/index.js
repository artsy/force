import PropTypes from 'prop-types'
import React from 'react'
import StepMarker from '../step_marker'
import block from 'bem-cn'
import { connect } from 'react-redux'

export function SubmissionFlow ({ CurrentStepComponent, currentStepTitle }) {
  const b = block('consignments2-submission')

  return (
    <div className={b()}>
      <div className={b('title')}>
        Consign your work to Artsy in just a few steps
      </div>
      <StepMarker />
      <div className={b('step-title')}>
        { currentStepTitle }
      </div>
      <div className={b('step-form')}>
        <CurrentStepComponent />
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  const {
    submissionFlow: {
      currentStep,
      steps
    }
  } = state

  const { component, title } = steps[currentStep]

  return {
    CurrentStepComponent: component,
    currentStepTitle: title
  }
}

export default connect(
  mapStateToProps,
)(SubmissionFlow)

SubmissionFlow.propTypes = {
  CurrentStepComponent: PropTypes.func.isRequired,
  currentStepTitle: PropTypes.string.isRequired
}

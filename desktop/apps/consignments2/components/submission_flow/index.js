import PropTypes from 'prop-types'
import React from 'react'
import StepMarker from '../step_marker'
import { connect } from 'react-redux'

export function SubmissionFlow ({ CurrentStepComponent, currentStepTitle }) {
  return (
    <div className='consignments2-submission'>
      <div className='consignments2-submission__title'>
        Consign your work to Artsy in just a few steps
      </div>
      <StepMarker />
      <div className='consignments2-submission__step-title'>
        { currentStepTitle }
      </div>
      <div className='consignments2-submission__step-form'>
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

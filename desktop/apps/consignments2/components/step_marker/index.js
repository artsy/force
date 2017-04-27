import classNames from 'classnames'
import React from 'react'
import { connect } from 'react-redux'
import { map, contains } from 'underscore'

function stepClass(stepIndex, currentStep, element) {
  return classNames(
    `consignments2-step-marker__${element}`,
    { active: stepIndex <= currentStep  }
  )
}

function StepMarker({ currentStep, steps }) {
  return (
    <div className='consignments2-step-marker'>
      <div className='consignments2-step-marker__steps'>
        {
          steps.map((step, index) => {
            return (
              <div className={stepClass(index, currentStep, 'step')} key={step.label}>
                <div className='consignments2-step-marker__dot'></div>
                <div className='consignments2-step-marker__label'>
                  {step.label}
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    currentStep: state.submissionFlow.currentStep,
    steps: state.submissionFlow.steps
  }
}

export default connect(
  mapStateToProps,
)(StepMarker)

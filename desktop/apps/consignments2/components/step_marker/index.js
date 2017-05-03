import PropTypes from 'prop-types'
import React from 'react'
import block from 'bem-cn'
import { connect } from 'react-redux'

function StepMarker ({ currentStep, steps }) {
  const b = block('consignments2-step-marker')

  return (
    <div className={b()}>
      <div className={b('steps')}>
        {
          steps.map((step, index) => {
            return (
              <div className={b('step', { active: index <= currentStep })} key={step.label}>
                <div className={b('dot')} />
                <div className={b('label')}>
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

const mapStateToProps = (state) => ({
  currentStep: state.submissionFlow.currentStep,
  steps: state.submissionFlow.steps
})

export default connect(
  mapStateToProps,
)(StepMarker)

StepMarker.propTypes = {
  currentStep: PropTypes.number.isRequired,
  steps: PropTypes.array.isRequired
}

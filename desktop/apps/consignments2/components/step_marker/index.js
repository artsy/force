import PropTypes from 'prop-types'
import React from 'react'
import block from 'bem-cn'
import stepsConfig from '../../client/steps_config'
import { connect } from 'react-redux'

function StepMarker ({ currentStep, isMobile, steps }) {
  const b = block('consignments2-step-marker')

  return (
    <div className={b({mobile: isMobile})}>
      <div className={b('steps')}>
        <ul>
          {
            steps.map((step) => {
              const stepLabel = stepsConfig[step]
              return (
                <li className={b('step', { active: step === currentStep })} key={stepLabel.label}>
                  <div className={b('label')}>
                    {isMobile ? stepLabel.shortLabel : stepLabel.label}
                  </div>
                </li>
              )
            })
          }
        </ul>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  const {
    submissionFlow: {
      currentStep,
      isMobile,
      steps
    }
  } = state

  return {
    currentStep,
    isMobile,
    steps
  }
}

export default connect(
  mapStateToProps,
)(StepMarker)

StepMarker.propTypes = {
  currentStep: PropTypes.string.isRequired,
  isMobile: PropTypes.bool.isRequired,
  steps: PropTypes.array.isRequired
}

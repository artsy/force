import PropTypes from 'prop-types'
import React from 'react'
import block from 'bem-cn'
import { connect } from 'react-redux'

function StepMarker ({ currentStep, isMobile, stepLabels, steps }) {
  const b = block('consignments2-step-marker')

  return (
    <div className={b({mobile: isMobile})}>
      <div className={b('steps')}>
        <ul>
          {
            steps.map((step) => {
              const stepLabel = stepLabels[step]
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

  const stepLabels = {
    createAccount: {
      label: 'Create Account',
      shortLabel: 'Create'
    },
    chooseArtist: {
      label: 'Consign Artist/Designer',
      shortLabel: 'Consign'
    },
    describeWork: {
      label: 'Describe the Work',
      shortLabel: 'Describe'
    },
    uploadPhotos: {
      label: 'Upload Photos',
      shortLabel: 'Upload'
    }
  }
  return {
    currentStep,
    isMobile,
    stepLabels,
    steps
  }
}

export default connect(
  mapStateToProps,
)(StepMarker)

StepMarker.propTypes = {
  currentStep: PropTypes.string.isRequired,
  isMobile: PropTypes.bool.isRequired,
  stepLabels: PropTypes.object.isRequired,
  steps: PropTypes.array.isRequired
}

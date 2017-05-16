import ChooseArtist from '../choose_artist'
import CreateAccount from '../create_account'
import DescribeWork from '../describe_work'
import PropTypes from 'prop-types'
import React from 'react'
import UploadPhoto from '../upload_photo'
import StepMarker from '../step_marker'
import block from 'bem-cn'
import { connect } from 'react-redux'

function SubmissionFlow ({ CurrentStepComponent, currentStepTitle }) {
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

  const stepsToComponents = {
    create_account: CreateAccount,
    choose_artist: ChooseArtist,
    describe_work: DescribeWork,
    upload_photos: UploadPhoto
  }

  const { id, title } = steps[currentStep]

  return {
    CurrentStepComponent: stepsToComponents[id],
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

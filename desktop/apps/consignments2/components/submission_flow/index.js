import ChooseArtist from '../choose_artist'
import CreateAccount from '../create_account'
import DescribeWorkDesktop from '../describe_work_desktop'
import DescribeWorkMobile from '../describe_work_mobile'
import PropTypes from 'prop-types'
import React from 'react'
import UploadPhoto from '../upload_photo'
import StepMarker from '../step_marker'
import block from 'bem-cn'
import { connect } from 'react-redux'
import {
  resizeWindow
} from '../../client/actions'

function SubmissionFlow (props) {
  const b = block('consignments2-submission')
  const { CurrentStepComponent, isMobile } = props

  return (
    <div className={b()}>
      <div className={b('title', {mobile: isMobile})}>
        Consign your work through Artsy in just a few quick steps
      </div>
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
      currentStep,
      isMobile,
      steps
    }
  } = state

  const describeWorkComponent = isMobile ? DescribeWorkMobile : DescribeWorkDesktop
  const stepsToComponents = {
    create_account: CreateAccount,
    choose_artist: ChooseArtist,
    describe_work: describeWorkComponent,
    upload_photos: UploadPhoto
  }

  const { id } = steps[currentStep]

  return {
    CurrentStepComponent: stepsToComponents[id],
    isMobile
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
  CurrentStepComponent: PropTypes.func.isRequired,
  isMobile: PropTypes.bool.isRequired
}

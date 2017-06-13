import ChooseArtist from '../choose_artist'
import CreateAccount from '../create_account'
import DescribeWorkDesktop from '../describe_work_desktop'
import DescribeWorkMobile from '../describe_work_mobile'
import DescribeWorkContainer from '../describe_work_container'
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
    <div className={b({mobile: isMobile})}>
      <div className={b('title')}>
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
      isMobile
    }
  } = state

  // const describeWorkComponent = isMobile ? DescribeWorkMobile : DescribeWorkDesktop
  const stepsToComponents = {
    createAccount: CreateAccount,
    chooseArtist: ChooseArtist,
    describeWork: DescribeWorkContainer,
    uploadPhotos: UploadPhoto
  }

  return {
    CurrentStepComponent: stepsToComponents[currentStep],
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

import Document from '../../../../components/main_layout/public/icons/consignments-doc.svg'
import GreenCheck from '../../../../components/main_layout/public/icons/green-check.svg'
import OpposingArrows from '../../../../components/main_layout/public/icons/consignments-opposing-arrows.svg'
import PropTypes from 'prop-types'
import React from 'react'
import SpeechBubble from '../../../../components/main_layout/public/icons/consignments-speech-bubble.svg'
import { connect } from 'react-redux'

function ThankYou ({ submission }) {
  const submissionImage = submission.image_url ? submission.image_url : '/images/missing_image.png'

  return (
    <div className='consignments2-submission-thank-you'>
      <div className='consignments2-submission-thank-you__submitted-work'>
        <div className='consignments2-submission-thank-you__submitted-image'>
          <img src={submissionImage} />
        </div>
        <div className='consignments2-submission-thank-you__submitted-message'>
          Your work has been submitted
        </div>
        <div className='consignments2-submission-thank-you__icon-check'>
          <GreenCheck />
        </div>
      </div>
      <div className='consignments2-submission-thank-you__title'>
        What’s Next?
      </div>
      <div className='consignments2-submission-thank-you__next-steps'>
        <div className='consignments2-submission-thank-you__specialist'>
          <div className='consignments2-submission-thank-you__step-icon'>
            <SpeechBubble />
          </div>
          <div className='consignments2-submission-thank-you__instructions'>
            An Artsy specialist will reach out to confirm demand for your work.
          </div>
        </div>
        <div className='consignments2-submission-thank-you__review'>
          <div className='consignments2-submission-thank-you__step-icon'>
            <Document />
          </div>
          <div className='consignments2-submission-thank-you__instructions'>
            You’ll review any prospective estimates from our partner network.
          </div>
        </div>
        <div className='consignments2-submission-thank-you__connect'>
          <div className='consignments2-submission-thank-you__step-icon'>
            <OpposingArrows />
          </div>
          <div className='consignments2-submission-thank-you__instructions'>
            We will connect you and the partner directly.
          </div>
        </div>
      </div>
      <a className='consignments2-submission-thank-you__personalize-button avant-garde-button-black' href='/personalize'>
        Personalize My Artsy Account
      </a>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    submission: state.submissionFlow.submission
  }
}

export default connect(
  mapStateToProps,
)(ThankYou)

ThankYou.propTypes = {
  submission: PropTypes.object.isRequired
}

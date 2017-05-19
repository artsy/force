import Document from '../../../../components/main_layout/public/icons/consignments-doc.svg'
import GreenCheck from '../../../../components/main_layout/public/icons/green-check.svg'
import OpposingArrows from '../../../../components/main_layout/public/icons/consignments-opposing-arrows.svg'
import PropTypes from 'prop-types'
import React from 'react'
import SpeechBubble from '../../../../components/main_layout/public/icons/consignments-speech-bubble.svg'
import block from 'bem-cn'
import { connect } from 'react-redux'
import { get } from 'lodash'

function ThankYou ({ submission, uploadedImages }) {
  const b = block('consignments2-submission-thank-you')
  console.log(get('uploadedImages.0.src'))
  const submissionImage = get(uploadedImages, '0.src') ? get(uploadedImages, '0.src') : '/images/missing_image.png'

  return (
    <div className={b()}>
      <div className={b('submitted-work')}>
        <div className={b('submitted-image')}>
          <img src={submissionImage} />
        </div>
        <div className={b('submitted-message')}>
          Your work has been submitted
        </div>
        <div className={b('icon-check')}>
          <GreenCheck />
        </div>
      </div>
      <div className={b('title')}>
        What’s Next?
      </div>
      <div className={b('next-steps')}>
        <div className={b('specialist')}>
          <div className={b('step-icon')}>
            <SpeechBubble />
          </div>
          <div className={b('instructions')}>
            An Artsy specialist will reach out to confirm demand for your work.
          </div>
        </div>
        <div className={b('review')}>
          <div className={b('step-icon')}>
            <Document />
          </div>
          <div className={b('instructions')}>
            You’ll review any prospective estimates from our partner network.
          </div>
        </div>
        <div className={b('connect')}>
          <div className={b('step-icon')}>
            <OpposingArrows />
          </div>
          <div className={b('instructions')}>
            We will connect you and the partner directly.
          </div>
        </div>
      </div>
      <a className={b('personalize-button').mix('avant-garde-button-black')} href='/personalize'>
        Personalize My Artsy Account
      </a>
    </div>
  )
}

const mapStateToProps = (state) => ({
  submission: state.submissionFlow.submission,
  uploadedImages: state.submissionFlow.uploadedImages
})

export default connect(
  mapStateToProps,
)(ThankYou)

ThankYou.propTypes = {
  submission: PropTypes.object.isRequired,
  uploadedImages: PropTypes.array
}

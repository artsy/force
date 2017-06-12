import Document from '../../../../components/main_layout/public/icons/consignments-doc.svg'
import GreenCheck from '../../../../components/main_layout/public/icons/green-check.svg'
import PropTypes from 'prop-types'
import React from 'react'
import Select from '../../../../components/main_layout/public/icons/consignments-select.svg'
import SpeechBubble from '../../../../components/main_layout/public/icons/consignments-speech-bubble.svg'
import block from 'bem-cn'
import get from 'lodash.get'
import { connect } from 'react-redux'

function ThankYou ({ isMobile, submission, processingImages, uploadedImages }) {
  const b = block('consignments2-submission-thank-you')
  const uploadedImageSrc = get(uploadedImages, '0.src')
  const submissionImage = uploadedImageSrc && processingImages.length === 0 ? uploadedImageSrc : '/images/missing_image.png'

  return (
    <div className={b({mobile: isMobile})}>
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
        <div className={b('review')}>
          <div className={b('step-icon')}>
            <Document />
          </div>
          <div className={b('instructions')}>
            Privately review estimates from our partner network.
          </div>
        </div>
        <div className={b('select')}>
          <div className={b('step-icon')}>
            <Select />
          </div>
          <div className={b('instructions')}>
            Select the offer that is best for you.
          </div>
        </div>
        <div className={b('connect')}>
          <div className={b('step-icon')}>
            <SpeechBubble />
          </div>
          <div className={b('instructions')}>
            We will introduce you to the partner.
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
  isMobile: state.submissionFlow.isMobile,
  processingImages: state.submissionFlow.processingImages,
  submission: state.submissionFlow.submission,
  uploadedImages: state.submissionFlow.uploadedImages
})

export default connect(
  mapStateToProps,
)(ThankYou)

ThankYou.propTypes = {
  isMobile: PropTypes.bool.isRequired,
  processingImages: PropTypes.array.isRequired,
  submission: PropTypes.object.isRequired,
  uploadedImages: PropTypes.array
}

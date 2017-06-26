import CreateAccount from '../create_account'
import PropTypes from 'prop-types'
import React from 'react'
import UploadPhoto from '../upload_photo'
import block from 'bem-cn'
import { connect } from 'react-redux'

function UploadPhotoLanding ({ isMobile, user }) {
  const b = block('consignments-submission-upload-photo-landing')
  return (
    <div className={b({mobile: isMobile})}>
      {
        user ? (
          <div>
            <div className={b('title')}>
              Add photos to your consignment submission
            </div>
            <div className={b('step-form')}>
              <UploadPhoto hideCheckbox />
            </div>
          </div>
        ) : (
          <div className={b('step-form')}>
            <CreateAccount />
          </div>
        )
      }
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    isMobile: state.submissionFlow.isMobile,
    user: state.submissionFlow.user
  }
}

export default connect(
  mapStateToProps,
)(UploadPhotoLanding)

UploadPhotoLanding.propTypes = {
  isMobile: PropTypes.bool.isRequired,
  user: PropTypes.object
}

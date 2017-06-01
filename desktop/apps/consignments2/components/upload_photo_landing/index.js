import CreateAccount from '../create_account'
import PropTypes from 'prop-types'
import React from 'react'
import UploadPhoto from '../upload_photo'
import block from 'bem-cn'
import { connect } from 'react-redux'

function UploadPhotoLanding ({ user }) {
  const b = block('consignments2-submission-upload-photo-landing')
  return (
    <div className={b()}>
      {
        user ? (
          <div>
            <div className={b('title')}>
              Upload a Photo
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
    user: state.submissionFlow.user
  }
}

export default connect(
  mapStateToProps,
)(UploadPhotoLanding)

UploadPhotoLanding.propTypes = {
  user: PropTypes.object
}

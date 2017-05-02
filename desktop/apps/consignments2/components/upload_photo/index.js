import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { submitPhoto } from '../../client/actions'

function UploadPhoto ({ submitPhotoAction }) {
  return (
    <div className='consignments2-submission-upload-photo'>
      <div
        className='consignments2-submission-upload-photo__submit-button avant-garde-button-black'
        onClick={submitPhotoAction}
      >
        Submit
      </div>
    </div>
  )
}

const mapDispatchToProps = {
  submitPhotoAction: submitPhoto
}

export default connect(
  null,
  mapDispatchToProps
)(UploadPhoto)

UploadPhoto.propTypes = {
  submitPhotoAction: PropTypes.func.isRequired
}

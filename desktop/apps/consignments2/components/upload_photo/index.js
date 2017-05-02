import PropTypes from 'prop-types'
import React from 'react'
import block from 'bem-cn'
import { connect } from 'react-redux'
import { submitPhoto } from '../../client/actions'

function UploadPhoto ({ submitPhotoAction }) {
  const b = block('consignments2-submission-upload-photo')

  return (
    <div className='consignments2-submission-upload-photo'>
      <div
        className={b('submit-button').mix('avant-garde-button-black')}
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

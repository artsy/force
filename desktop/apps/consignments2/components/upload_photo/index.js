import PropTypes from 'prop-types'
import React from 'react'
import block from 'bem-cn'
import { connect } from 'react-redux'
import { submitPhoto } from '../../client/actions'

function UploadPhoto ({ error, submitPhotoAction }) {
  const b = block('consignments2-submission-upload-photo')

  return (
    <div className='consignments2-submission-upload-photo'>
      <div
        className={b('submit-button').mix('avant-garde-button-black')}
        onClick={submitPhotoAction}
      >
        Submit
      </div>
      {
        error && <div className={b('error')}>{error}</div>
      }
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    error: state.submissionFlow.error
  }
}
const mapDispatchToProps = {
  submitPhotoAction: submitPhoto
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UploadPhoto)

UploadPhoto.propTypes = {
  error: PropTypes.string,
  submitPhotoAction: PropTypes.func.isRequired
}

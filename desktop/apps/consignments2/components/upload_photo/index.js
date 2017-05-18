import Camera from '../../../../components/main_layout/public/icons/camera.svg'
import PropTypes from 'prop-types'
import React from 'react'
import UploadedImage from '../uploaded_image'
import block from 'bem-cn'
import { connect } from 'react-redux'
import { map } from 'underscore'
import { selectPhoto, submitPhoto } from '../../client/actions'

function UploadPhoto ({ error, selectPhotoAction, submitPhotoAction, uploadedImages }) {
  const b = block('consignments2-submission-upload-photo')

  return (
    <div className={b()}>
      <label htmlFor='file' className={b('drop-area')}>
        <div className={b('drop-area-contents')}>
          <input
            type='file'
            name='file'
            id='file'
            className={b('file-upload')}
            onChange={(e) => selectPhotoAction(e.target.files[0])}
          />
          <div className={b('camera-icon')}>
            <Camera />
          </div>
          <div className={b('cta')}>
            Drag or Click to upload photos
          </div>
        </div>
      </label>
      <div className={b('upload-instructions')}>
        Please upload JPG or PNG image files 1000x1000 pixels or more. Image files should have a file size less than 30mb.
      </div>
      <div
        className={b('submit-button').mix('avant-garde-button-black')}
        onClick={submitPhotoAction}
      >
        Submit
      </div>
      {
        error && <div className={b('error')}>{error}</div>
      }
      {
        uploadedImages.map((file) =>
          <UploadedImage fileName={file.name} key={file.name} />
        )
      }
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    error: state.submissionFlow.error,
    uploadedImages: state.submissionFlow.uploadedImages
  }
}
const mapDispatchToProps = {
  selectPhotoAction: selectPhoto,
  submitPhotoAction: submitPhoto
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UploadPhoto)

UploadPhoto.propTypes = {
  error: PropTypes.string,
  selectPhotoAction: PropTypes.func.isRequired,
  submitPhotoAction: PropTypes.func.isRequired,
  uploadedImages: PropTypes.array
}

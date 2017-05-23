import Camera from '../../../../components/main_layout/public/icons/camera.svg'
import CheckboxInput from '../checkbox_input'
import PropTypes from 'prop-types'
import React from 'react'
import UploadedImage from '../uploaded_image'
import block from 'bem-cn'
import { connect } from 'react-redux'
import { selectPhoto, submitPhoto, updateSkipPhotoSubmission } from '../../client/actions'

function UploadPhoto (props) {
  const {
    error,
    processingImages,
    selectPhotoAction,
    skipPhotoSubmission,
    updateSkipPhotoSubmissionAction,
    submitPhotoAction,
    uploadedImages
  } = props
  const b = block('consignments2-submission-upload-photo')

  const nextEnabled = skipPhotoSubmission || (!skipPhotoSubmission && uploadedImages.length > 0 && processingImages.length === 0)

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
            Click to upload photos
          </div>
        </div>
      </label>
      <div className={b('upload-instructions')}>
        Please upload JPG or PNG image files 1000x1000 pixels or more. Image files should have a file size less than 30mb.
      </div>
      <CheckboxInput
        item={'skip'}
        label={'No photo currently available'}
        onChange={updateSkipPhotoSubmissionAction}
        value={skipPhotoSubmission}
      />
      {
        uploadedImages.map((file) =>
          <UploadedImage file={file} key={file.fileName} />
        )
      }
      <div
        className={b('submit-button').mix('avant-garde-button-black')}
        onClick={submitPhotoAction}
        disabled={!nextEnabled}
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
    error: state.submissionFlow.error,
    processingImages: state.submissionFlow.processingImages,
    skipPhotoSubmission: state.submissionFlow.skipPhotoSubmission,
    uploadedImages: state.submissionFlow.uploadedImages
  }
}
const mapDispatchToProps = {
  selectPhotoAction: selectPhoto,
  submitPhotoAction: submitPhoto,
  updateSkipPhotoSubmissionAction: updateSkipPhotoSubmission
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UploadPhoto)

UploadPhoto.propTypes = {
  error: PropTypes.string,
  processingImages: PropTypes.array.isRequired,
  selectPhotoAction: PropTypes.func.isRequired,
  skipPhotoSubmission: PropTypes.bool.isRequired,
  submitPhotoAction: PropTypes.func.isRequired,
  updateSkipPhotoSubmissionAction: PropTypes.func.isRequired,
  uploadedImages: PropTypes.array
}

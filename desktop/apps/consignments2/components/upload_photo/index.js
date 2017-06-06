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
    hideCheckbox,
    loading,
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
      <div className={b('title')}>
        Upload photos
      </div>
      <div className={b('subtitle')}>
        Take a quick snapshot of the work so we can better asses the condition of the work. We suggest a photo of the front and back of the work.
      </div>
      <div className={b('form')}>
        <label
          htmlFor='file'
          className={b('drop-area')}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault()
            selectPhotoAction(e.dataTransfer.files[0])
          }}
        >
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
        {
          !hideCheckbox && (
            <CheckboxInput
              item={'skip'}
              label={'No photo currently available'}
              onChange={updateSkipPhotoSubmissionAction}
              value={skipPhotoSubmission}
            />
          )
        }
        {
          uploadedImages.map((file, index) =>
            <UploadedImage file={file} key={`${file.fileName}-${index}`} />
          )
        }
        <div
          className={b('submit-button').mix('avant-garde-button-black')}
          onClick={submitPhotoAction}
          disabled={!nextEnabled}
        >
          {
            loading ? <div className='loading-spinner-white' /> : 'Submit'
          }
        </div>
        {
          error && <div className={b('error')}>{error}</div>
        }
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    error: state.submissionFlow.error,
    loading: state.submissionFlow.loading,
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
  hideCheckbox: PropTypes.bool,
  loading: PropTypes.bool.isRequired,
  processingImages: PropTypes.array.isRequired,
  selectPhotoAction: PropTypes.func.isRequired,
  skipPhotoSubmission: PropTypes.bool.isRequired,
  submitPhotoAction: PropTypes.func.isRequired,
  updateSkipPhotoSubmissionAction: PropTypes.func.isRequired,
  uploadedImages: PropTypes.array
}

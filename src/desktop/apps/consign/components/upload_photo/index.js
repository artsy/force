import Camera from "../../../../components/main_layout/public/icons/camera.svg"
import PropTypes from "prop-types"
import React from "react"
import _UploadedImage from "../uploaded_image"
import block from "bem-cn-lite"
import { connect } from "react-redux"
import { selectPhoto, submitPhoto } from "../../client/actions"

// FIXME: Rewire
let UploadedImage = _UploadedImage

function UploadPhoto(props) {
  const {
    error,
    isMobile,
    isLoading,
    processingImages,
    selectPhotoAction,
    submitPhotoAction,
    uploadedImages,
  } = props
  const b = block("consignments-submission-upload-photo")

  const imagesFinished =
    uploadedImages.length > 0 && processingImages.length === 0
  const nextEnabled = imagesFinished
  const uploadCta = isMobile
    ? "Click to upload photos"
    : "Drag or Click to upload photos"

  return (
    <div className={b()}>
      <div className={b("title")}>Upload photos</div>
      <div className={b("subtitle")}>
        Take a quick snapshot of the work so we can better assess the condition
        of the work. We suggest uploading photos of the front and back of the
        work, any signatures, and certificates of authenticity.
      </div>
      <div className={b("form")}>
        <label
          htmlFor="file"
          className={b("drop-area")}
          onDragOver={e => e.preventDefault()}
          onDrop={e => {
            e.preventDefault()
            selectPhotoAction(e.dataTransfer.files[0])
          }}
        >
          <div className={b("drop-area-contents")}>
            <input
              type="file"
              name="file"
              id="file"
              className={b("file-upload")}
              onChange={e => selectPhotoAction(e.target.files[0])}
            />
            <div className={b("camera-icon")}>
              <Camera />
            </div>
            <div className={b("cta")}>{uploadCta}</div>
          </div>
        </label>
        {uploadedImages.map((file, index) => (
          <UploadedImage file={file} key={`${file.fileName}-${index}`} />
        ))}
        <div
          className={b
            .builder()("submit-button")
            .mix("avant-garde-button-black")()}
          onClick={submitPhotoAction}
          disabled={!nextEnabled}
        >
          {isLoading ? <div className="loading-spinner-white" /> : "Submit"}
        </div>
        {error && <div className={b("error")}>{error}</div>}
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    error: state.submissionFlow.error,
    isMobile: state.submissionFlow.isMobile,
    isLoading: state.submissionFlow.isLoading,
    processingImages: state.submissionFlow.processingImages,
    uploadedImages: state.submissionFlow.uploadedImages,
  }
}

const mapDispatchToProps = {
  selectPhotoAction: selectPhoto,
  submitPhotoAction: submitPhoto,
}

export default connect(mapStateToProps, mapDispatchToProps)(UploadPhoto)

UploadPhoto.propTypes = {
  error: PropTypes.string,
  isMobile: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  processingImages: PropTypes.array.isRequired,
  selectPhotoAction: PropTypes.func.isRequired,
  submitPhotoAction: PropTypes.func.isRequired,
  uploadedImages: PropTypes.array,
}

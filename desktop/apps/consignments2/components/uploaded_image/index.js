import PropTypes from 'prop-types'
import React from 'react'
import block from 'bem-cn'
import { connect } from 'react-redux'
import { contains } from 'underscore'

export function UploadedImage (props) {
  const { file, processingImages } = props
  const b = block('consignments2-submission-uploaded-image')
  const processing = contains(processingImages, file.fileName)

  return (
    <div className={b()}>
      <div className={b('image-wrapper')}>
        <img className={b('image')} src={file.src} />
        <div className={b('filename')}>
          { file.fileName }
        </div>
      </div>
      {
        processing && <div className={b('processing')}>Processing...</div>
      }
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    processingImages: state.submissionFlow.processingImages
  }
}

export default connect(
  mapStateToProps
)(UploadedImage)


UploadedImage.propTypes = {
  file: PropTypes.object.isRequired,
  processingImages: PropTypes.array
}

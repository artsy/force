import PropTypes from 'prop-types'
import React from 'react'
import block from 'bem-cn'
import { connect } from 'react-redux'
import { contains } from 'underscore'

export function UploadedImage (props) {
  const { file, processingImages, progressBars } = props
  const b = block('consignments2-submission-uploaded-image')
  const processing = contains(processingImages, file.fileName)
  const processingPercentage = progressBars[file.fileName] ? progressBars[file.fileName] * 100 : 0


  return (
    <div className={b()}>
      <div className={b('image-wrapper', { processing })}>
        <img className={b('image')} src={file.src} />
        {
          processing
            ? (
              <div className={b('progress-wrapper')}>
                <div className={b('progress')} style={{ width: `${processingPercentage}%` }} />
              </div>
            )
            : (
              <div className={b('filename')}>
                { file.fileName }
              </div>
            )
        }
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    processingImages: state.submissionFlow.processingImages,
    progressBars: state.submissionFlow.progressBars
  }
}

export default connect(
  mapStateToProps
)(UploadedImage)


UploadedImage.propTypes = {
  file: PropTypes.object.isRequired,
  processingImages: PropTypes.array,
  progressBars: PropTypes.object
}

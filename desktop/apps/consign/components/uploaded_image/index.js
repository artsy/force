import Alert from '../../../../components/main_layout/public/icons/alert.svg'
import Close from '../../../../components/main_layout/public/icons/close.svg'
import PropTypes from 'prop-types'
import React from 'react'
import block from 'bem-cn-lite'
import { connect } from 'react-redux'
import { contains } from 'underscore'
import { removeImage } from '../../client/actions'

export function UploadedImage (props) {
  const {
    file,
    erroredImages,
    processingImages,
    progressBars,
    removeImageAction
  } = props
  const b = block('consignments-submission-uploaded-image')
  const processing = contains(processingImages, file.fileName)
  const errored = contains(erroredImages, file.fileName)
  const processingPercentage = progressBars[file.fileName] ? progressBars[file.fileName] * 100 : 0

  const errorBlock = (
    <div className={b('error')}>
      <div className={b('error-alert')}>
        <Alert />
      </div>
      <div className={b('error-content')}>
        {file.fileName} failed to upload.<br />
        <b>The image file should be JPG or PNG and should be less than 30mb.</b>
      </div>
      <div className={b('error-close')} onClick={() => removeImageAction(file.fileName)}>
        <Close />
      </div>
    </div>
  )

  return (
    <div className={b()}>
      { errored ? errorBlock : (
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
        )
      }

    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    erroredImages: state.submissionFlow.erroredImages,
    processingImages: state.submissionFlow.processingImages,
    progressBars: state.submissionFlow.progressBars
  }
}

const mapDispatchToProps = {
  removeImageAction: removeImage
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UploadedImage)


UploadedImage.propTypes = {
  file: PropTypes.object.isRequired,
  erroredImages: PropTypes.array,
  processingImages: PropTypes.array,
  progressBars: PropTypes.object,
  removeImageAction: PropTypes.func.isRequired
}

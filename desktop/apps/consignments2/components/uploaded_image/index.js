import PropTypes from 'prop-types'
import React from 'react'
import block from 'bem-cn'

export default function UploadedImage (props) {
  const { fileName } = props
  const b = block('consignments2-submission-uploaded-image')

  return (
    <div className={b()}>
      { fileName }
    </div>
  )
}

UploadedImage.propTypes = {
  fileName: PropTypes.string.isRequired
}

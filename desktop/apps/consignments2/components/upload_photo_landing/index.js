import React from 'react'
import UploadPhoto from '../upload_photo'
import block from 'bem-cn'

export default function UploadPhotoLanding () {
  const b = block('consignments2-submission-upload-photo-landing')

  return (
    <div className={b()}>
      <div className={b('title')}>
        Consign your work to Artsy in just a few steps
      </div>
      <div className={b('step-title')}>
        Upload a Photo
      </div>
      <div className={b('step-form')}>
        <UploadPhoto />
      </div>
    </div>
  )
}

import { useCallback, useEffect, useState } from "react"
import * as React from "react"
import { Box, BoxProps } from "@artsy/palette"
import { useFormikContext } from "formik"
import { useSystemContext } from "v2/System"
import {
  getErrorMessage,
  normalizePhoto,
  Photo,
  uploadPhoto,
} from "../../Utils/fileUtils"
import { useRouter } from "v2/System/Router/useRouter"
import { ErrorModal } from "v2/Components/Modal/ErrorModal"
import { PhotoDropzone } from "./PhotoDropzone"
import { FileRejection } from "react-dropzone"
import { PhotoThumbnail } from "./PhotoThumbnail"
import { useSubmission } from "../../Utils/useSubmission"

export interface UploadPhotosFormModel {
  photos: Photo[]
}

export interface UploadPhotosFormProps extends BoxProps {
  maxTotalSize: number
  onPhotoUploaded?: () => void
}

export const UploadPhotosForm: React.FC<UploadPhotosFormProps> = ({
  maxTotalSize,
  onPhotoUploaded,
  ...rest
}) => {
  const {
    match: {
      params: { id },
    },
  } = useRouter()

  const { relayEnvironment } = useSystemContext()
  const [errors, setErrors] = useState<Array<FileRejection>>([])
  const [showErrorModal, setShowErrorModal] = useState(false)
  const { setFieldValue, values, validateField } = useFormikContext<
    UploadPhotosFormModel
  >()
  const { submission } = useSubmission(id)

  useEffect(() => {
    if (submission && submission.uploadPhotosForm) {
      setFieldValue("photos", submission.uploadPhotosForm.photos)
      validateField("photos")
    } else {
      setFieldValue("photos", [])
    }
  }, [submission])

  const handlePhotoUploadingProgress = (photo: Photo) => progress => {
    photo.progress = progress

    setFieldValue("photos", values.photos)
  }

  const handlePhotoUploaded = (photo: Photo) => key => {
    photo.s3Key = key
    photo.loading = false

    setFieldValue("photos", values.photos, true)
  }

  const handlePhotoUploadError = photo => {
    setShowErrorModal(true)

    setFieldValue(
      "photos",
      values.photos.filter(p => p.id !== photo.id)
    )
  }

  useEffect(() => {
    const imagesToUpload = values.photos.filter(c => !c.s3Key && !c.loading)

    if (imagesToUpload.length) {
      imagesToUpload.forEach(photo => {
        photo.loading = true

        if (relayEnvironment) {
          uploadPhoto(
            relayEnvironment,
            photo,
            handlePhotoUploadingProgress(photo)
          )
            .then(handlePhotoUploaded(photo))
            .catch(err => {
              console.error(err)
              handlePhotoUploadError(photo)
            })
            .finally(onPhotoUploaded)
        }
      })

      setFieldValue("photos", [...values.photos])
    }
  }, [values.photos])

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const photos = acceptedFiles.map(file => normalizePhoto(file))

    setFieldValue("photos", [...values.photos, ...photos])
  }, [])

  const onReject = (rejections: FileRejection[]) => {
    setErrors(rejections)
  }

  return (
    <Box {...rest}>
      <ErrorModal
        show={showErrorModal}
        headerText="An error occurred"
        contactEmail="orders@artsy.net"
        closeText="Close"
        onClose={() => setShowErrorModal(false)}
      />
      <PhotoDropzone
        onDrop={onDrop}
        maxTotalSize={maxTotalSize}
        px={[2, 4]}
        pt={[4, 6]}
        pb={[6]}
        mb={[6]}
        border="1px solid"
        borderColor="black10"
        onReject={onReject}
      />

      {errors.map((error, i) => {
        const normalizedPhoto = normalizePhoto(
          error.file,
          getErrorMessage(error)
        )
        return (
          <PhotoThumbnail
            mt={2}
            key={normalizedPhoto.id}
            photo={normalizedPhoto}
            onDelete={() => {
              setErrors(errors.filter(e => e !== error))
            }}
          />
        )
      })}
    </Box>
  )
}

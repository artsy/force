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

  const uploadImage = async photo => {
    photo.loading = true

    if (relayEnvironment) {
      const uploadedPhotoKey = await uploadPhoto(
        relayEnvironment,
        photo,
        handlePhotoUploadingProgress(photo)
      )

      photo.loading = false

      if (!uploadedPhotoKey) {
        photo.errorMessage = `Photo could not be added: ${photo.name}`
        setFieldValue("photos", values.photos)
        return
      }

      photo.s3Key = uploadedPhotoKey
      setFieldValue("photos", values.photos, true)

      if (onPhotoUploaded) {
        onPhotoUploaded()
      }
    }
  }

  useEffect(() => {
    const imagesToUpload = values.photos.filter(c => !c.s3Key && !c.loading)

    if (imagesToUpload.length) {
      imagesToUpload.forEach(uploadImage)
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

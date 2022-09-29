import { Box, BoxProps } from "@artsy/palette"
import { PhotoDropzone } from "Components/PhotoUpload/Components/PhotoDropzone"
import { PhotoThumbnail } from "Components/PhotoUpload/Components/PhotoThumbnail"
import {
  getErrorMessage,
  normalizePhoto,
  Photo,
  uploadPhoto,
} from "Components/PhotoUpload/Utils/fileUtils"
import { useFormikContext } from "formik"
import * as React from "react"
import { useCallback, useEffect, useState } from "react"
import { FileRejection } from "react-dropzone"
import { useSystemContext } from "System"

export interface UploadPhotosFormModel {
  photos: Photo[]
}

export interface UploadPhotosFormProps extends BoxProps {
  maxTotalSize: number
  onPhotoUploaded: (photo: Photo) => void
  submissionId: string
  // artworkPhotos: Photo[]
}

export const UploadPhotosForm: React.FC<UploadPhotosFormProps> = ({
  maxTotalSize,
  onPhotoUploaded,
  submissionId,
  // artworkPhotos,
  ...rest
}) => {
  const { relayEnvironment } = useSystemContext()
  const [errors, setErrors] = useState<Array<FileRejection>>([])
  const { setFieldValue, values } = useFormikContext<UploadPhotosFormModel>()

  console.log("UploadPhotos", { values })

  const handlePhotoUploadingProgress = (photo: Photo) => progress => {
    photo.progress = progress
    setFieldValue("photos", values.photos)
  }

  // console.log("[LOGD] artworkPhotos = ", artworkPhotos)
  const uploadImage = async photo => {
    photo.loading = true

    if (relayEnvironment) {
      const geminiToken = await uploadPhoto(
        submissionId,
        relayEnvironment,
        photo,
        handlePhotoUploadingProgress(photo)
      )

      photo.loading = false

      if (!geminiToken) {
        photo.errorMessage = `Photo could not be added: ${photo.name}`
        setFieldValue("photos", values.photos)
        return
      }

      photo.geminiToken = geminiToken
      setFieldValue("photos", values.photos, true)
      onPhotoUploaded(photo)
    }
  }

  useEffect(() => {
    const imagesToUpload = values.photos.filter(
      c => !(c.geminiToken || c.url) && !c.loading
    )

    if (imagesToUpload.length) {
      imagesToUpload.forEach(uploadImage)
      setFieldValue("photos", [...values.photos])
    }
  }, [values.photos])

  /*   useEffect(() => {
    console.log("---------- [LOGD] in useEffect = ", artworkPhotos)

    if (artworkPhotos.length) {
      artworkPhotos.forEach(onPhotoUploaded)
      setFieldValue("photos", [...values.photos])
    }
  }, [artworkPhotos])
 */
  const onDrop = useCallback((acceptedFiles: File[]) => {
    console.log(
      "Upload Flow:",
      "onDrop",
      "1",
      "acceptedFiles",
      acceptedFiles[0]
    )

    const photos = acceptedFiles.map(file => normalizePhoto(file))

    console.log("Upload Flow:", "onDrop", "2", "normalizePhoto", photos[0])

    setErrors([])
    setFieldValue("photos", [
      ...values.photos.filter(p => !p.errorMessage),
      ...photos,
    ])
  }, [])

  const onReject = (rejections: FileRejection[]) => {
    setErrors(rejections)
    setFieldValue(
      "photos",
      values.photos.filter(p => !p.errorMessage)
    )
  }

  return (
    <Box {...rest}>
      <PhotoDropzone
        allPhotos={values.photos}
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

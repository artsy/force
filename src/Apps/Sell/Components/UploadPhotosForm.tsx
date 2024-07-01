import { useToasts } from "@artsy/palette"
import { useAddAssetToConsignmentSubmission } from "Apps/Consign/Routes/SubmissionFlow/Mutations"
import { PhotosFormValues } from "Apps/Sell/Routes/PhotosRoute"
import { PhotoDropzone } from "Components/PhotoUpload/Components/PhotoDropzone"
import {
  Photo,
  getErrorMessage,
  normalizePhoto,
  uploadSubmissionPhoto,
} from "Components/PhotoUpload/Utils/fileUtils"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { getENV } from "Utils/getENV"
import createLogger from "Utils/logger"
import { useFormikContext } from "formik"
import { useCallback, useEffect } from "react"
import { FileRejection } from "react-dropzone"

const logger = createLogger("Sell/UploadPhotosForm.tsx")

export const UploadPhotosForm: React.FC = () => {
  const { isLoggedIn, relayEnvironment } = useSystemContext()
  const { submitMutation: addAsset } = useAddAssetToConsignmentSubmission()
  const { setFieldValue, values } = useFormikContext<PhotosFormValues>()
  const { sendToast } = useToasts()

  const handlePhotoUploadingProgress = useCallback(
    (photo: Photo) => progress => {
      photo.progress = progress
      setFieldValue("photos", values.photos)
    },
    [values.photos, setFieldValue]
  )

  const uploadImage = useCallback(
    async photo => {
      photo.loading = true

      if (relayEnvironment) {
        const geminiToken = await uploadSubmissionPhoto(
          values.submissionId,
          relayEnvironment,
          photo,
          handlePhotoUploadingProgress(photo)
        )

        if (!geminiToken) {
          photo.errorMessage = `Photo could not be added: ${photo.name}`
          setFieldValue("photos", values.photos)

          sendToast({
            variant: "error",
            message: "Photo could not be added",
          })

          return
        }

        photo.geminiToken = geminiToken
        setFieldValue("photos", values.photos, true)

        try {
          const response = await addAsset({
            variables: {
              input: {
                assetType: "image",
                geminiToken: photo.geminiToken as string,
                externalSubmissionId: values.submissionId,
                sessionID: !isLoggedIn ? getENV("SESSION_ID") : undefined,
                filename: photo.name,
                size: photo.size?.toString(),
              },
            },
          })

          photo.assetId = response.addAssetToConsignmentSubmission?.asset?.id
        } catch (error) {
          logger.error("Add asset error", error)
        } finally {
          photo.loading = false
          setFieldValue("photos", values.photos, true)
        }
      }
    },
    [
      addAsset,
      handlePhotoUploadingProgress,
      isLoggedIn,
      relayEnvironment,
      setFieldValue,
      values.submissionId,
      values.photos,
      sendToast,
    ]
  )

  useEffect(() => {
    const imagesToUpload = values.photos.filter(
      c => !(c.geminiToken || c.url) && !c.loading && !c.errorMessage
    )

    if (imagesToUpload.length) {
      imagesToUpload.forEach(uploadImage)
      setFieldValue("photos", [...values.photos])
    }
  }, [values.photos, setFieldValue, uploadImage])

  const onDrop = (acceptedFiles: File[]) => {
    const photos = acceptedFiles.map(file => normalizePhoto(file))
    setFieldValue("photos", [
      ...values.photos.filter(p => !p.errorMessage),
      ...photos,
    ])
  }

  const onReject = (rejections: FileRejection[]) => {
    rejections.forEach(rejection => {
      const errorMessage = getErrorMessage(rejection)
      sendToast({
        variant: "error",
        message: errorMessage,
      })
    })
  }

  return (
    <PhotoDropzone
      allPhotos={values.photos}
      maxTotalSize={30}
      onDrop={onDrop}
      onReject={onReject}
      border="1px dashed"
      borderColor="black30"
      padding={4}
    />
  )
}

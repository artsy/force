import CloseStrokeIcon from "@artsy/icons/CloseStrokeIcon"
import {
  Image,
  Box,
  Flex,
  Spinner,
  ProgressBar,
  Clickable,
} from "@artsy/palette"
import { useRemoveAssetFromConsignmentSubmission } from "Apps/Consign/Routes/SubmissionFlow/Mutations"
import { PhotosFormValues } from "Apps/Sell/Routes/PhotosRoute"
import { Photo } from "Components/PhotoUpload/Utils/fileUtils"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { getENV } from "Utils/getENV"
import { useFormikContext } from "formik"
import { useEffect, useState } from "react"

interface ImagePreviewItemProps {
  photo: Photo
}

export const ImagePreviewItem: React.FC<ImagePreviewItemProps> = ({
  photo,
}) => {
  const { isLoggedIn } = useSystemContext()
  const {
    submitMutation: removeAsset,
  } = useRemoveAssetFromConsignmentSubmission()
  const { setFieldValue, values } = useFormikContext<PhotosFormValues>()
  const [photoSrc, setPhotoSrc] = useState<string>(photo.url || "")

  useEffect(() => {
    if (photo.file) {
      const reader = new FileReader()

      reader.readAsDataURL(photo.file as File)

      reader.onloadend = () => {
        setPhotoSrc(reader.result as string)
      }
    } else {
      setPhotoSrc(photo.url || "")
    }
  }, [photo])

  useEffect(() => {
    if (!photoSrc && photo.url) {
      setPhotoSrc(photo.url)
    }
  }, [photo.url, photoSrc])

  const handlePhotoDelete = (photo: Photo) => {
    photo.removed = true
    photo.abortUploading?.()

    if (photo.assetId) {
      removeAsset({
        variables: {
          input: {
            assetID: photo.assetId,
            sessionID: !isLoggedIn ? getENV("SESSION_ID") : undefined,
          },
        },
      }).catch(error => {
        // logger.error("Remove asset error", error)
      })
    }

    const photosToSave = values.photos.filter(p => p.id !== photo.id)
    setFieldValue("photos", photosToSave)
  }

  const isProcessing = photo.geminiToken && !photoSrc

  return (
    <Flex minWidth="140px" minHeight="140px" position="relative">
      <Box opacity={photo.loading ? 0.3 : 1} position="relative">
        {photoSrc && <Image src={photoSrc} width="140px" height="140px" />}

        {isProcessing && (
          <Box display="flex" alignItems="center" justifyContent="center">
            <Spinner size="medium" mt={-0.5} />
          </Box>
        )}

        {!photoSrc && (
          <Box backgroundColor="black5" width="140px" height="140px" />
        )}

        {photo.loading && photo.progress && (
          <Flex
            position="absolute"
            bottom={0}
            left={0}
            zIndex={1000}
            justifyContent="center"
            alignItems="center"
            width="100%"
            marginBottom={-0.5}
          >
            <ProgressBar
              width="100%"
              highlight="brand"
              percentComplete={photo.progress || 0}
            />
          </Flex>
        )}
      </Box>

      <Clickable
        data-testid="delete-photo-thumbnail"
        onClick={() => {
          handlePhotoDelete(photo)
        }}
      >
        <Flex
          position="absolute"
          alignItems="center"
          justifyContent="center"
          zIndex={1000}
          top={0.5}
          right={0.5}
          width="16px"
          height="16px"
        >
          <CloseStrokeIcon
            width="16px"
            height="16px"
            aria-label="Cancel"
            title="Cancel"
            fill="black100" // TODO: reverse color
          />
        </Flex>
      </Clickable>
    </Flex>
  )
}

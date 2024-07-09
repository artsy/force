import CloseFillIcon from "@artsy/icons/CloseFillIcon"
import { Box, Clickable, Flex, Image, ProgressBar, Text } from "@artsy/palette"
import { Z } from "Apps/Components/constants"
import { useRemoveAssetFromConsignmentSubmission } from "Apps/Consign/Routes/SubmissionFlow/Mutations"
import { PhotosFormValues } from "Apps/Sell/Routes/PhotosRoute"
import { Photo } from "Components/PhotoUpload/Utils/fileUtils"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { getENV } from "Utils/getENV"
import createLogger from "Utils/logger"
import { useFormikContext } from "formik"
import { useEffect, useState } from "react"

const logger = createLogger("Sell/ImagePreviewItem.tsx")
const IMAGE_SIZES = [100, 140]

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
  const [isProcessing, setIsProcessing] = useState(
    !!photo.geminiToken && !photoSrc
  )

  useEffect(() => {
    if (photo.externalUrl) {
      setPhotoSrc(photo.externalUrl)
    } else if (photo.file) {
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
        logger.error("Remove asset error", error)
      })
    }

    const photosToSave = values.photos.filter(p => p.id !== photo.id)
    setFieldValue("photos", photosToSave)
  }

  const isLoading = photo.loading && photo.progress

  return (
    <Flex
      minWidth={IMAGE_SIZES}
      minHeight={IMAGE_SIZES}
      position="relative"
      data-testid="image-preview-item"
    >
      <Box
        position="relative"
        backgroundColor="black10"
        width={IMAGE_SIZES}
        height={IMAGE_SIZES}
      >
        {photoSrc && (
          <Box opacity={photo.loading ? 0.3 : 1}>
            <Image
              src={photoSrc}
              width={IMAGE_SIZES}
              height={IMAGE_SIZES}
              style={{
                objectFit: "contain",
              }}
              onError={() => {
                if (!photoSrc.startsWith("data:")) return

                // HEIC images are not supported by most browsers, so we display a "Processing..." message in case loading the image fails (https://caniuse.com/?search=HEIC).
                setIsProcessing(true)
              }}
            />
          </Box>
        )}

        {!photoSrc && (
          <Box
            backgroundColor="black5"
            width={IMAGE_SIZES}
            height={IMAGE_SIZES}
          />
        )}

        {!!isProcessing && !isLoading && (
          <Box position="absolute" bottom={0.2} left={0.5}>
            <Text variant="xs">Processing...</Text>
          </Box>
        )}

        {!!isLoading && (
          <Flex
            position="absolute"
            bottom={0}
            left={0}
            zIndex={Z.popover}
            justifyContent="center"
            alignItems="center"
            width="100%"
            marginBottom={-1}
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
          backgroundColor="white100"
          borderRadius="50%"
        >
          <CloseFillIcon
            width="16px"
            height="16px"
            aria-label="Cancel"
            title="Cancel"
          />
        </Flex>
      </Clickable>
    </Flex>
  )
}

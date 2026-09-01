import {
  Flex,
  ModalDialog,
  ResponsiveBox,
  Text,
  useToasts,
} from "@artsy/palette"
import { FileDropzone } from "Components/FileUpload/FileDropzone"
import { getErrorMessage } from "Components/FileUpload/utils/getErrorMessage"
import { ImageSearchUploadContent } from "Components/Search/ImageSearch/ImageSearchUploadContent"
import { ImageSearchThumbnail } from "Components/Search/ImageSearch/ImageSearchThumbnail"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { useRouter } from "System/Hooks/useRouter"
import { type FC, useEffect, useState } from "react"
import type { FileRejection } from "react-dropzone"
import {
  createImageSearchPreviewURL,
  revokeImageSearchPreviewURL,
  setImageSearchPreview,
} from "./imageSearchPreview"
import { uploadImageToS3 } from "./uploadImageToS3"

const ALLOWED_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/heic",
]

const MAX_TOTAL_SIZE_MB = 30

interface SearchByImageModalProps {
  onClose: () => void
}

export const SearchByImageModal: FC<
  React.PropsWithChildren<SearchByImageModalProps>
> = ({ onClose }) => {
  const { match, router } = useRouter()
  const { relayEnvironment } = useSystemContext()
  const { sendToast } = useToasts()

  const [isUploading, setIsUploading] = useState(false)
  const [previewURL, setPreviewURL] = useState("")

  useEffect(() => {
    const isImageSearchRoute = match?.location.pathname === "/image-search"
    const isRouteResolved = match && "elements" in match

    if (isUploading && isImageSearchRoute && isRouteResolved) {
      onClose()
    }
  }, [isUploading, match, onClose])

  const handleDrop = async (files: File[]) => {
    const file = files[0]

    if (!file || !relayEnvironment) {
      return
    }

    const nextPreviewURL = createImageSearchPreviewURL(file)

    setPreviewURL(nextPreviewURL)
    setIsUploading(true)

    try {
      const asset = await uploadImageToS3(relayEnvironment, file)

      if (!asset) {
        throw new Error("Upload returned no asset")
      }

      const params = new URLSearchParams({
        s3Key: asset.s3Key,
        s3Bucket: asset.s3Bucket,
      })

      setImageSearchPreview({ ...asset, url: nextPreviewURL })

      router.push(`/image-search?${params.toString()}`)
    } catch (error) {
      console.error("SearchByImageModal: failed to upload image", error)
      revokeImageSearchPreviewURL(nextPreviewURL)
      setPreviewURL("")
      setIsUploading(false)
      sendToast({
        message: "Something went wrong. Please try another image.",
        variant: "error",
      })
    }
  }

  const handleReject = (rejections: FileRejection[]) => {
    const rejection = rejections[0]

    if (!rejection) {
      return
    }

    const message =
      getErrorMessage(rejection, "a JPG, PNG, WEBP, or HEIC image") ??
      "That file can’t be used. Please try another image."

    sendToast({ message, variant: "error" })
  }

  return (
    <ModalDialog
      title="Find Art with Artsy Lens"
      onClose={onClose}
      dialogProps={{ width: ["100%", 650], height: ["100%", "auto"] }}
      height={["100%", "auto"]}
      m={[0, 2]}
    >
      <Flex
        flexDirection="column"
        height="100%"
        justifyContent={["center", "flex-start"]}
      >
        {isUploading ? (
          <Flex width="100%" flexDirection="column" alignItems="center" py={2}>
            <ResponsiveBox
              aspectWidth={1}
              aspectHeight={1}
              width="100%"
              maxWidth={400}
            >
              <ImageSearchThumbnail
                src={previewURL}
                isLoading
                position="absolute"
                width="100%"
                height="100%"
                borderRadius={10}
              />
            </ResponsiveBox>

            <Text variant="sm-display" mt={2}>
              Searching for matches…
            </Text>
          </Flex>
        ) : (
          <FileDropzone
            title="Drag an image here"
            subtitle="We’ll use it to search for similar artworks."
            buttonText="upload a file"
            desktopButtonLabel="or"
            desktopButtonText="Upload a Photo"
            desktopButtonVariant="primaryBlack"
            desktopContent={
              <ImageSearchUploadContent
                description={
                  <>
                    Drag a photo here or choose one from your files.
                    <br />
                    We’ll find similar artworks.
                  </>
                }
              />
            }
            mobileButtonLabel="or"
            mobileButtonText="Upload a Photo"
            mobileButtonVariant="primaryBlack"
            mobileContent={
              <ImageSearchUploadContent
                description={
                  <>
                    Choose a photo from your files.
                    <br />
                    We’ll find similar artworks.
                  </>
                }
              />
            }
            mobileSubtitle={null}
            allFiles={[]}
            maxTotalSize={MAX_TOTAL_SIZE_MB}
            allowedMimeTypes={ALLOWED_MIME_TYPES}
            onDrop={handleDrop}
            onReject={handleReject}
            textAlign="center"
          />
        )}
      </Flex>
    </ModalDialog>
  )
}

import { Flex, ModalDialog, Spinner, Text, useToasts } from "@artsy/palette"
import { FileDropzone } from "Components/FileUpload/FileDropzone"
import { getErrorMessage } from "Components/FileUpload/utils/getErrorMessage"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { useRouter } from "System/Hooks/useRouter"
import { type FC, useState } from "react"
import type { FileRejection } from "react-dropzone"
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
  const { router } = useRouter()
  const { relayEnvironment } = useSystemContext()
  const { sendToast } = useToasts()

  const [isUploading, setIsUploading] = useState(false)

  const handleDrop = async (files: File[]) => {
    const file = files[0]

    if (!file || !relayEnvironment) {
      return
    }

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

      onClose()

      router.push(`/image-search?${params.toString()}`)
    } catch (error) {
      console.error("SearchByImageModal: failed to upload image", error)
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
      title="Search by image"
      onClose={onClose}
      dialogProps={{ width: 650 }}
    >
      {isUploading ? (
        <Flex flexDirection="column" alignItems="center" py={4}>
          <Spinner />

          <Text variant="sm-display" color="mono60" mt={2}>
            Uploading image…
          </Text>
        </Flex>
      ) : (
        <FileDropzone
          title="Drag an image here"
          subtitle="We’ll use it to search for similar artworks."
          buttonText="upload a file"
          allFiles={[]}
          maxTotalSize={MAX_TOTAL_SIZE_MB}
          allowedMimeTypes={ALLOWED_MIME_TYPES}
          onDrop={handleDrop}
          onReject={handleReject}
          border="1px dashed"
          borderColor="mono30"
          borderRadius={5}
          p={4}
          textAlign="center"
        />
      )}
    </ModalDialog>
  )
}

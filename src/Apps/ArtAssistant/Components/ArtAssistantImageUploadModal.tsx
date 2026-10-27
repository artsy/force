import { ModalDialog, useToasts } from "@artsy/palette"
import { FileDropzone } from "Components/FileUpload/FileDropzone"
import { getErrorMessage } from "Components/FileUpload/utils/getErrorMessage"
import { ImageSearchUploadContent } from "Components/Search/ImageSearch/ImageSearchUploadContent"
import type { FC } from "react"
import type { FileRejection } from "react-dropzone"

const ALLOWED_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/heic",
]
const MAX_TOTAL_SIZE_MB = 30

interface ArtAssistantImageUploadModalProps {
  onClose: () => void
  onSelect: (file: File) => void
}

export const ArtAssistantImageUploadModal: FC<
  ArtAssistantImageUploadModalProps
> = ({ onClose, onSelect }) => {
  const { sendToast } = useToasts()

  const handleDrop = (files: File[]): void => {
    const file = files[0]
    if (!file) return
    onSelect(file)
    onClose()
  }

  const handleReject = (rejections: FileRejection[]): void => {
    const rejection = rejections[0]
    if (!rejection) return
    const message =
      getErrorMessage(rejection, "a JPG, PNG, WEBP, or HEIC image") ??
      "That file can’t be used. Please try another image."
    sendToast({ message, variant: "error" })
  }

  return (
    <ModalDialog
      title="Search with an image"
      onClose={onClose}
      dialogProps={{ width: ["100%", 650], height: ["100%", "auto"] }}
      height={["100%", "auto"]}
      m={[0, 2]}
    >
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
                Add a note to refine what you’re looking for.
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
                Add a note to refine what you’re looking for.
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
    </ModalDialog>
  )
}

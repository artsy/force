import { concatDropzoneErrors } from "Components/FileUpload/utils/concatDropzoneErrors"
import { validateTotalMaxSize } from "Components/FileUpload/utils/validateTotalMaxSize"
import type { Photo } from "Components/PhotoUpload/Utils/fileUtils"
import { Media } from "Utils/Responsive"
import { Box, type BoxProps, Button, Text } from "@artsy/palette"
import type React from "react"
import { useEffect, useRef, useState } from "react"
import { type FileRejection, useDropzone } from "react-dropzone"

export interface PhotoDropzoneProps extends BoxProps {
  allPhotos: Photo[]
  maxTotalSize: number
  onDrop: (files: File[]) => void
  onReject: (rejections: FileRejection[]) => void
}

/**
 * @deprecated Deprecated - prefer using FileDropzone, which is a more generic version of this component
 * Also probably safe to remove this component entirely when cleaning up old sell flow
 */
export const PhotoDropzone: React.FC<
  React.PropsWithChildren<PhotoDropzoneProps>
> = ({ allPhotos, maxTotalSize, onDrop, onReject, ...rest }) => {
  const [customErrors, setCustomErrors] = useState<Array<FileRejection>>([])
  const buttonRef = useRef<HTMLButtonElement | null>(null)

  const { getRootProps, getInputProps, open, fileRejections } = useDropzone({
    onDropAccepted: files => {
      const [acceptedFiles, errors] = validateTotalMaxSize(
        allPhotos,
        files,
        maxTotalSize,
      )

      if (acceptedFiles.length) {
        onDrop(acceptedFiles)
      }
      setCustomErrors(errors)
      buttonRef.current?.blur()
    },
    onFileDialogCancel: () => {
      buttonRef.current?.blur()
    },
    onDropRejected: () => {
      buttonRef.current?.blur()
    },
    accept: ["image/jpeg", "image/png", "image/heic"],
    noClick: true,
    noKeyboard: true,
    multiple: true,
  })

  useEffect(() => {
    const errors = concatDropzoneErrors(fileRejections, customErrors)

    onReject(errors)
  }, [customErrors, fileRejections])

  return (
    <>
      <Media greaterThan="xs">
        <Box {...rest} data-test-id="image-dropzone" {...getRootProps()}>
          <input data-testid="image-dropzone-input" {...getInputProps()} />

          <Text variant="lg-display">Drag and drop photos here</Text>
          <Text variant={["xs", "sm-display"]} color="mono60" mt={1}>
            Files Supported: JPG, PNG, HEIC <br />
            Total maximum size: {maxTotalSize} MB
          </Text>
          <Button
            ref={buttonRef}
            width={["100%", "auto"]}
            type="button"
            mt={[2, 2]}
            variant="secondaryBlack"
            onClick={open}
          >
            Or Add Photos
          </Button>
        </Box>
      </Media>

      <Media at="xs">
        <input data-testid="image-dropzone-input" {...getInputProps()} />

        <Button
          ref={buttonRef}
          width={["100%", "auto"]}
          type="button"
          variant="secondaryBlack"
          onClick={open}
        >
          Add Photos
        </Button>
        <Text variant={["xs", "sm-display"]} color="mono60" mt={1}>
          Files Supported: JPG, PNG, HEIC <br />
          Total maximum size: {maxTotalSize} MB
        </Text>
      </Media>
    </>
  )
}

import { concatDropzoneErrors } from "Components/FileUpload/utils/concatDropzoneErrors"
import { validateTotalMaxSize } from "Components/FileUpload/utils/validateTotalMaxSize"
import { Media } from "Utils/Responsive"
import { Box, type BoxProps, Button, Text } from "@artsy/palette"
import type React from "react"
import { useEffect, useRef, useState } from "react"
import { type FileRejection, useDropzone } from "react-dropzone"
import type { DropzoneFile } from "./types"

export interface FileDropzoneProps extends BoxProps {
  title: string
  subtitle?: React.ReactNode
  buttonText: string
  allFiles: DropzoneFile[]
  maxTotalSize: number
  allowedMimeTypes: string[]
  onDrop: (files: File[]) => void
  onReject: (rejections: FileRejection[]) => void
}

export const FileDropzone: React.FC<
  React.PropsWithChildren<FileDropzoneProps>
> = ({
  title,
  subtitle,
  buttonText,
  allFiles,
  maxTotalSize,
  allowedMimeTypes,
  onDrop,
  onReject,
  ...rest
}) => {
  const [customErrors, setCustomErrors] = useState<Array<FileRejection>>([])
  const buttonRef = useRef<HTMLButtonElement | null>(null)

  const { getRootProps, getInputProps, open, fileRejections } = useDropzone({
    onDropAccepted: files => {
      const [acceptedFiles, errors] = validateTotalMaxSize(
        allFiles,
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
    accept: allowedMimeTypes,
    noClick: true,
    noKeyboard: true,
    multiple: true,
  })

  useEffect(() => {
    const errors = concatDropzoneErrors(fileRejections, customErrors)

    onReject(errors)
  }, [customErrors, fileRejections, onReject])

  return (
    <>
      <Media greaterThan="xs">
        <Box {...rest} data-test-id="file-dropzone" {...getRootProps()}>
          <input data-testid="file-dropzone-input" {...getInputProps()} />

          <Text variant="lg-display">{title}</Text>
          {subtitle && (
            <Text variant={["xs", "sm-display"]} color="mono60" mt={1}>
              {subtitle}
            </Text>
          )}
          <Button
            ref={buttonRef}
            width={["100%", "auto"]}
            type="button"
            mt={[2, 2]}
            variant="secondaryBlack"
            onClick={open}
          >
            Or {buttonText}
          </Button>
        </Box>
      </Media>

      <Media at="xs">
        <input data-testid="file-dropzone-input" {...getInputProps()} />

        <Button
          ref={buttonRef}
          width={["100%", "auto"]}
          type="button"
          variant="secondaryBlack"
          onClick={open}
        >
          {buttonText}
        </Button>
        {subtitle && (
          <Text variant={["xs", "sm-display"]} color="mono60" mt={1}>
            {subtitle}
          </Text>
        )}
      </Media>
    </>
  )
}

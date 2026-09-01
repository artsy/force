import {
  Box,
  type BoxProps,
  Button,
  type ButtonProps,
  Text,
} from "@artsy/palette"
import { concatDropzoneErrors } from "Components/FileUpload/utils/concatDropzoneErrors"
import { validateTotalMaxSize } from "Components/FileUpload/utils/validateTotalMaxSize"
import { Media } from "Utils/Responsive"
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
  desktopButtonLabel?: React.ReactNode
  desktopButtonText?: string
  desktopButtonVariant?: ButtonProps["variant"]
  desktopContent?: React.ReactNode
  mobileButtonLabel?: React.ReactNode
  mobileButtonText?: string
  mobileButtonVariant?: ButtonProps["variant"]
  mobileContent?: React.ReactNode
  mobileSubtitle?: React.ReactNode
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
  desktopButtonLabel,
  desktopButtonText,
  desktopButtonVariant,
  desktopContent,
  mobileButtonLabel,
  mobileButtonText,
  mobileButtonVariant,
  mobileContent,
  mobileSubtitle,
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

          {desktopContent ?? (
            <>
              <Text variant="lg-display">{title}</Text>
              {subtitle && (
                <Text variant={["xs", "sm-display"]} color="mono60" mt={1}>
                  {subtitle}
                </Text>
              )}
            </>
          )}
          {desktopButtonLabel && (
            <Text variant="xs" color="mono60" textAlign="center" mb={1}>
              {desktopButtonLabel}
            </Text>
          )}
          <Button
            ref={buttonRef}
            width={["100%", "auto"]}
            type="button"
            mt={desktopContent ? 0 : 2}
            variant={desktopButtonVariant ?? "secondaryBlack"}
            onClick={open}
          >
            {desktopButtonText ?? `Or ${buttonText}`}
          </Button>
        </Box>
      </Media>

      <Media at="xs">
        {mobileContent}

        <input data-testid="file-dropzone-input" {...getInputProps()} />

        {mobileButtonLabel && (
          <Text variant="xs" color="mono60" textAlign="center" mb={1}>
            {mobileButtonLabel}
          </Text>
        )}
        <Button
          ref={buttonRef}
          width={["100%", "auto"]}
          type="button"
          variant={mobileButtonVariant ?? "secondaryBlack"}
          onClick={open}
        >
          {mobileButtonText ?? buttonText}
        </Button>
        {(mobileSubtitle !== undefined ? mobileSubtitle : subtitle) && (
          <Text variant={["xs", "sm-display"]} color="mono60" mt={1}>
            {mobileSubtitle !== undefined ? mobileSubtitle : subtitle}
          </Text>
        )}
      </Media>
    </>
  )
}

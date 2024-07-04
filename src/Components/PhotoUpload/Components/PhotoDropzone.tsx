import { Box, BoxProps, Button, Text } from "@artsy/palette"
import {
  CustomErrorCode,
  MBSize,
  Photo,
} from "Components/PhotoUpload/Utils/fileUtils"
import { Media } from "Utils/Responsive"
import { cloneDeep } from "lodash"
import React, { useEffect, useRef, useState } from "react"
import { FileRejection, useDropzone } from "react-dropzone"

const validateTotalMaxSize = (
  currentFiles: Array<Photo>,
  filesToAdd: Array<File>,
  maxTotalSize: number
): [Array<File>, FileRejection[]] => {
  const acceptedFiles: Array<File> = []
  const fileRejections: Array<FileRejection> = []
  const totalSize = maxTotalSize * MBSize
  const currentFilesSize = currentFiles.reduce((acc, photo) => {
    return acc + (photo.size || 0)
  }, 0)

  filesToAdd
    .sort((a, b) => a.size - b.size)
    .forEach(file => {
      const acceptedFilesSize = acceptedFiles.reduce((acc, photo) => {
        return acc + photo.size
      }, 0)

      if (currentFilesSize + acceptedFilesSize + file.size > totalSize) {
        fileRejections.push({
          file,
          errors: [
            {
              code: CustomErrorCode.TotalSizeLimit,
              message: "",
            },
          ],
        })
      } else {
        acceptedFiles.push(file)
      }
    })

  return [acceptedFiles, fileRejections]
}

const concatErrors = (
  errors: FileRejection[],
  customErrors: FileRejection[]
) => {
  const result: FileRejection[] = errors.map(cloneDeep)

  customErrors.forEach(error => {
    const err = result.find(err => err.file === error.file)

    if (err) {
      err.errors.concat(error.errors)
    } else {
      result.push(error)
    }
  })

  return result
}

export interface PhotoDropzoneProps extends BoxProps {
  allPhotos: Photo[]
  maxTotalSize: number
  onDrop: (files: File[]) => void
  onReject: (rejections: FileRejection[]) => void
}

export const PhotoDropzone: React.FC<PhotoDropzoneProps> = ({
  allPhotos,
  maxTotalSize,
  onDrop,
  onReject,
  ...rest
}) => {
  const [customErrors, setCustomErrors] = useState<Array<FileRejection>>([])
  const buttonRef = useRef<HTMLButtonElement | null>(null)

  const { getRootProps, getInputProps, open, fileRejections } = useDropzone({
    onDropAccepted: files => {
      const [acceptedFiles, errors] = validateTotalMaxSize(
        allPhotos,
        files,
        maxTotalSize
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
    const errors = concatErrors(fileRejections, customErrors)

    onReject(errors)
    // FIXME: Remove this disable
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customErrors, fileRejections])

  return (
    <>
      <Media greaterThan="xs">
        <Box {...rest} data-test-id="image-dropzone" {...getRootProps()}>
          <input data-testid="image-dropzone-input" {...getInputProps()} />

          <Text variant="lg-display">Drag and drop photos here</Text>
          <Text variant={["xs", "sm-display"]} color="black60" mt={1}>
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
        <Text variant={["xs", "sm-display"]} color="black60" mt={1}>
          Files Supported: JPG, PNG, HEIC <br />
          Total maximum size: {maxTotalSize} MB
        </Text>
      </Media>
    </>
  )
}

import { CustomErrorCode, type DropzoneFile } from "Components/FileUpload/types"
import type { FileRejection } from "react-dropzone"

const KBSize = 1000
const MBSize = KBSize ** 2

export const validateTotalMaxSize = (
  currentFiles: Array<DropzoneFile>,
  filesToAdd: Array<File>,
  maxTotalSize: number,
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

import { CustomErrorCode } from "Components/FileUpload/types"
import { ErrorCode, FileRejection } from "react-dropzone"

export const getErrorMessage = (
  fileRejection: FileRejection,
  allowedFileFormats: string = ""
) => {
  const errorCodes = fileRejection.errors.map(e => e.code)
  let errorMessage

  if (errorCodes.includes(ErrorCode.FileInvalidType)) {
    console.log("[Debug] fileRejection", fileRejection)
    errorMessage = `File format not supported. Please upload ${allowedFileFormats}.`
  } else if (errorCodes.includes(CustomErrorCode.TotalSizeLimit)) {
    errorMessage =
      "Whoa, you've reached the size limit! Please delete or upload smaller files."
  }

  return errorMessage
}

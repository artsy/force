import { cloneDeep } from "es-toolkit"
import type { FileRejection } from "react-dropzone"

export const concatDropzoneErrors = (
  errors: FileRejection[],
  customErrors: FileRejection[],
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

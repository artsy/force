import { AssetCredentials } from "Components/PhotoUpload/Mutations/getGeminiCredentialsForEnvironment"
import { Photo } from "./fileUtils"

// Fetches the artwork image and returns a file that can then be used to upload the image to S3.
const fetchExternalFile = async (photo: Photo) => {
  const response = await fetch(photo.externalUrl!)
  const blob = await response.blob()

  return new File([blob], photo.name)
}

export const uploadFileToS3 = (
  photo: Photo,
  acl: string,
  asset: AssetCredentials,
  updateProgress: (progress: number) => void
): Promise<string | undefined> =>
  new Promise(async (resolve, reject) => {
    if (!asset) {
      reject(new Error("Empty credentials"))
      return
    }

    if (!photo.file) {
      reject(new Error("File not found"))
      return
    }

    const formData = new FormData()
    const geminiKey = asset.policyDocument.conditions.geminiKey
    const bucket = asset.policyDocument.conditions.bucket
    const uploadURL = `https://${bucket}.s3.amazonaws.com`

    const isExternalPhoto = photo.externalUrl

    let file

    try {
      file = isExternalPhoto ? await fetchExternalFile(photo) : photo.file
    } catch (error) {
      reject(new Error("Artwork image could not be automatically added."))
      return
    }

    const data = {
      acl,
      "Content-Type": photo.file.type,
      key: geminiKey + "/${filename}", // NOTE: This form (which _looks_ like ES6 interpolation) is required by AWS
      AWSAccessKeyId: asset.credentials,
      success_action_status:
        asset.policyDocument.conditions.successActionStatus,
      policy: asset.policyEncoded,
      signature: asset.signature,
      file,
    }

    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        formData.append(key, data[key])
      }
    }

    const key = `${geminiKey}/${photo.file.name}`
    const request = new XMLHttpRequest()

    request.onload = () => {
      if (
        request.status.toString() ===
        asset.policyDocument.conditions.successActionStatus
      ) {
        photo.abortUploading = undefined

        resolve(key)
      } else {
        reject(new Error("S3 upload failed"))
      }
    }
    request.upload.onprogress = ({ loaded, total }) => {
      updateProgress((loaded / total) * 100)
    }

    request.open("POST", uploadURL, true)

    request.onerror = () => {
      reject(new Error("Network error: Something went wrong"))
      return
    }

    request.send(formData)

    photo.bucket = bucket
    photo.abortUploading = () => {
      request.abort()
    }
  })

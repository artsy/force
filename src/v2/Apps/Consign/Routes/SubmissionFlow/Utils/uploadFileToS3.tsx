import { AssetCredentials } from "../Mutations"
import { Photo } from "./fileUtils"

export const uploadFileToS3 = (
  photo: Photo,
  acl: string,
  asset: AssetCredentials,
  updateProgress: (progress: number) => void
): Promise<string | undefined> =>
  new Promise((resolve, reject) => {
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

    const data = {
      acl: acl,
      "Content-Type": photo.file.type,
      key: geminiKey + "/${filename}", // NOTE: This form (which _looks_ like ES6 interpolation) is required by AWS
      AWSAccessKeyId: asset.credentials,
      success_action_status:
        asset.policyDocument.conditions.successActionStatus,
      policy: asset.policyEncoded,
      signature: asset.signature,
      file: photo.file,
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

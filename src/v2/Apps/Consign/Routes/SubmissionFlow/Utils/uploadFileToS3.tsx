import { AssetCredentials } from "../Mutations/Gemini/getGeminiCredentialsForEnvironment"
import { Photo } from "./FileUtils"

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

    const request = new XMLHttpRequest()

    request.onload = () => {
      if (
        request.status.toString() ===
        asset.policyDocument.conditions.successActionStatus
      ) {
        photo.abortUploading = undefined
        // e.g. https://artsy-media-uploads.s3.amazonaws.com/A3tfuXp0t5OuUKv07XaBOw%2F%24%7Bfilename%7D
        const url = request.responseXML?.getElementsByTagName("Location")[0]
          .childNodes[0].nodeValue

        resolve(url?.split("/").pop()?.replace("%2F", "/"))
      } else {
        reject(new Error("S3 upload failed"))
      }
    }
    request.upload.onprogress = ({ loaded, total }) => {
      updateProgress((loaded / total) * 100)
    }

    request.open("POST", uploadURL, true)
    request.send(formData)

    photo.abortUploading = () => {
      request.abort()
    }
  })

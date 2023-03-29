type UploadFileToS3 = {
  file: File
  key: string
  uploadURL?: string
  successStatuses?: number[]
}

export const uploadFileToS3 = ({
  file,
  key,
  uploadURL = "/api/upload-attachment",
  successStatuses = [200],
}: UploadFileToS3): Promise<any> =>
  // eslint-disable-next-line no-async-promise-executor
  new Promise(async (resolve, reject) => {
    const fileType = file.type.includes("image") ? file.type : `file/pdf`

    try {
      const urlUploadResponse = await fetch(uploadURL, {
        method: "POST",
        body: JSON.stringify({
          key,
          contentType: fileType,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
      const json = await urlUploadResponse.json()

      const uploadResponse = await fetch(json.url, {
        method: "PUT",
        body: file,
        headers: {
          "Content-Type": fileType,
        },
      })

      if (successStatuses.includes(uploadResponse.status)) {
        const url = new URL(json.url)
        resolve(`${url.origin}${url.pathname}`)
      }
      reject(`upload failed with status code ${uploadResponse.status}`)
    } catch (error) {
      reject(error)
    }
  })

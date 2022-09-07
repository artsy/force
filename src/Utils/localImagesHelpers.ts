import { DateTime } from "luxon"

const GEMINI_IMAGE_PROCESS_TIME_IN_MINUTES = 2
export interface LocalImage {
  path: string
  width: number
  height: number
}

interface Expirable {
  expirationDate: string
}

type StoredImage = LocalImage & Expirable

const addMinutes = (date: Date, minutes: number) => {
  return new Date(date.getTime() + minutes * 60000)
}

export const storeLocalImages = (images: LocalImage[], rootKey: string) => {
  const expirattionDate = addMinutes(
    new Date(),
    GEMINI_IMAGE_PROCESS_TIME_IN_MINUTES
  )
  const imagesToStore: StoredImage[] = []
  for (const image of images) {
    const imageToStore: StoredImage = {
      expirationDate: expirattionDate.toString(),
      path: image.path,
      height: image.height,
      width: image.width,
    }
    imagesToStore.push(imageToStore)
  }
  const serializedImages = JSON.stringify(imagesToStore)
  return window.localStorage.setItem(rootKey, serializedImages)
}

export const deleteLocalImages = (key: string) => {
  return window.localStorage.removeItem(key)
}

// Retrieve all local images that have not expired from local storage
export const retrieveLocalImages = async (
  key: string,
  currentTime: number = Date.now()
): Promise<LocalImage[] | null> => {
  return new Promise(async resolve => {
    const imagesJSON = window.localStorage.getItem(key)

    if (!imagesJSON) {
      resolve(null)
      return
    }

    const images = JSON.parse(imagesJSON)

    if (!images) {
      resolve(null)
      return
    }

    if (!Array.isArray(images)) {
      resolve(null)
      return
    }

    const resolvedImages: LocalImage[] = []
    for (const image of images) {
      if (
        "expirationDate" in image &&
        "path" in image &&
        "height" in image &&
        "width" in image
      ) {
        const expirationDate = DateTime.fromISO(image.expirationDate).toMillis()
        const currentDate = currentTime ? currentTime : Date.now()
        if (currentDate > expirationDate) {
          break
        }
        const width = parseInt(image.width, 10)
        const height = parseInt(image.height, 10)

        resolvedImages.push({
          path: image.path,
          width,
          height,
        })
      } else {
        break
      }
    }

    if (resolvedImages.length === 0) {
      resolve(null)
    }

    resolve(resolvedImages)
  })
}

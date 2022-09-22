import { IMAGES_LOCAL_STORE_LAST_UPDATED_AT } from "Apps/Settings/Routes/MyCollection/constants"
import localforage from "localforage"

const GEMINI_IMAGE_PROCESS_TIME_IN_MINUTES = 1
export interface LocalImage {
  data: string
  width: number
  height: number
}

interface Expirable {
  expirationDate: string
}

export type StoredImage = LocalImage & Expirable

export type StoredArtworkWithImages = {
  artworkID: string
  images: StoredImage[]
}

const addMinutes = (date: Date, minutes: number) => {
  return new Date(date.getTime() + minutes * 60000)
}

export const storeArtworkLocalImages = async (
  artworkID: string,
  images: LocalImage[],
  key: string
) => {
  const expirationDate = addMinutes(
    new Date(),
    GEMINI_IMAGE_PROCESS_TIME_IN_MINUTES
  )

  const imagesToStore: StoredImage[] = []
  for (const image of images) {
    const imageToStore: StoredImage = {
      expirationDate: expirationDate.toString(),
      data: image.data,
      height: image.height,
      width: image.width,
    }
    imagesToStore.push(imageToStore)
  }

  const localArtworksImages = await getAllLocalImagesByArtwork(key)

  // Get existing artworks with images except the one we are storing
  const updatedLocalArtworksImages = localArtworksImages.filter(
    artworkImagesObj => artworkImagesObj.artworkID !== artworkID
  )

  // Add the new artwork with images to the list
  updatedLocalArtworksImages.push({
    artworkID,
    images: imagesToStore,
  })

  // Store the updated list
  const artworkImages = JSON.stringify(updatedLocalArtworksImages || [])

  return localforage.setItem(key, artworkImages)
}

//
export const setLocalImagesStoreLastUpdatedAt = (lastUpdatedAtKey: string) => {
  return localforage.setItem(lastUpdatedAtKey, new Date().toString())
}

// Cleam store after gemini processing time is over
export const cleanImagesLocalStore = (key: string) => {
  return localforage
    .getItem(IMAGES_LOCAL_STORE_LAST_UPDATED_AT)
    .then((date: string) => {
      const lastUpdatedDate = new Date(date)
      const currentDate = new Date()
      const diffInMinutes =
        (currentDate.getTime() - lastUpdatedDate.getTime()) / 60000

      if (diffInMinutes > GEMINI_IMAGE_PROCESS_TIME_IN_MINUTES) {
        return localforage.removeItem(key)
      }
    })
    .catch(() => {
      // If there is no last updated date, we can assume that the store is clean
      console.log("No last updated date, store must be clean")
    })
}

// Retrieve all artworks local images that have not expired from local storage
export const getAllLocalImagesByArtwork = (
  key: string
): Promise<StoredArtworkWithImages[]> => {
  return localforage
    .getItem(key)
    .then((imagesByArtworkJSONString: string) => {
      if (imagesByArtworkJSONString) {
        const imagesByArtwork = JSON.parse(imagesByArtworkJSONString) as
          | StoredArtworkWithImages[]
          | null
        if (Array.isArray(imagesByArtwork)) {
          return imagesByArtwork.filter(artworkImagesObj => {
            const images = artworkImagesObj.images.filter(image => {
              // @ts-ignore
              const expirationDate = new Date(image.expirationDate)
              // Only return images that have not expired
              return expirationDate > new Date()
            })
            // Return only artworks that have at least one image that has not expired
            return images.length > 0
          })
        }
      }
      return []
    })
    .catch(error => {
      console.error("failed to get all local images", error)
      return []
    })
}

// Return height and width of local image file
export const getHeightAndWidthFromDataUrl = file => {
  const imageDataURL = URL.createObjectURL(file)
  return new Promise(resolve => {
    const img = new Image()
    img.onload = () => {
      resolve({
        height: img.height,
        width: img.width,
      })
    }
    img.src = imageDataURL
  })
}

// Retrieve artwork local images from local storage
export const getArtworkLocalImages = async (
  artworkID: string,
  key: string
): Promise<StoredImage[]> => {
  const localArtworksImages = await getAllLocalImagesByArtwork(key)
  const artworkImages = localArtworksImages?.find(
    artworkImagesObj => artworkImagesObj.artworkID === artworkID
  )

  return artworkImages?.images || []
}

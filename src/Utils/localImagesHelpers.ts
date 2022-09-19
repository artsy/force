const GEMINI_IMAGE_PROCESS_TIME_IN_MINUTES = 5
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

export const storeArtworkLocalImages = (
  artworkID: string,
  images: LocalImage[],
  rootKey: string
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

  const localArtworksImages = getLocalImagesByArtwork({ key: rootKey })

  // Get existing artworks with images except the one we are storing
  const updatedLocalArtworksImages = localArtworksImages.filter(
    artworkImagesObj => artworkImagesObj.artworkID !== artworkID
  )

  // Add the new artwork with images to the list
  updatedLocalArtworksImages.push({
    artworkID,
    images: imagesToStore.concat(
      retrieveArtworkLocalImages(artworkID, rootKey)
    ),
  })

  // Store the updated list
  const artworkImages = JSON.stringify(updatedLocalArtworksImages || [])

  return window.localStorage.setItem(rootKey, artworkImages)
}

export const deleteLocalImages = (key: string) => {
  return window.localStorage.removeItem(key)
}

// Retrieve all artworks local images that have not expired from local storage
export const getLocalImagesByArtwork = ({
  key,
  excludeExpired = true,
}: {
  key: string
  excludeExpired?: boolean
}): StoredArtworkWithImages[] => {
  const imagesByArtworkJSONString = window.localStorage.getItem(key)

  const imagesByArtwork = JSON.parse(imagesByArtworkJSONString || "") as
    | StoredArtworkWithImages[]
    | null

  if (Array.isArray(imagesByArtwork)) {
    if (excludeExpired) {
      return imagesByArtwork.filter(artworkImagesObj => {
        const images = artworkImagesObj.images.filter(image => {
          const expirationDate = new Date(image.expirationDate)
          // Only return images that have not expired
          return expirationDate > new Date()
        })
        // Return only artworks that have at least one image that has not expired
        return images.length > 0
      })
    }
    return imagesByArtwork
  }
  return []
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
export const retrieveArtworkLocalImages = (
  artworkID: string,
  rootKey: string
): StoredImage[] => {
  const localArtworksImages = getLocalImagesByArtwork({ key: rootKey })
  const artworkImages = localArtworksImages?.find(
    artworkImagesObj => artworkImagesObj.artworkID === artworkID
  )

  return artworkImages?.images || []
}

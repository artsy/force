import { LOCAL_PROFILE_IMAGE_KEY } from "Apps/Settings/Routes/EditProfile/Components/SettingsEditProfileImage/utils/constants"
import localforage from "localforage"
import { useCallback, useEffect, useState } from "react"

// Expiritation time is 5 minutes
// TODO: Decrease number
const EXPIRATION_TIME = 500 * 60 * 1000
const IMAGE_KEY_PREFIX = "IMAGES_LOCAL_STORE_KEY"

export interface LocalImage {
  data: string
  width: number
  height: number
  expires?: string
  photoID?: string
  aspectRatio?: number
}

export type StoredArtworkWithImages = {
  artworkID: string
  images: LocalImage[]
}

export const storeLocalImage = async (key: string, image: LocalImage) => {
  const expires = new Date().getTime() + EXPIRATION_TIME

  const storeKey = `${IMAGE_KEY_PREFIX}_${key}`
  const storeValue = prepareImage(image, expires.toString())

  return localforage.setItem(storeKey, storeValue)
}

export const getLocalImage = async (
  key: string
): Promise<LocalImage | null> => {
  const storeKey = `${IMAGE_KEY_PREFIX}_${key}`
  const imageJSONString = await localforage.getItem(storeKey)

  if (!imageJSONString) return null

  return JSON.parse(imageJSONString as string)
}

// Clean store after gemini processing time is over
export const cleanImagesLocalStore = async () => {
  const keys = await localforage.keys()

  const imageKeys: string[] = keys.filter(key => {
    key.startsWith(IMAGE_KEY_PREFIX)
  })

  imageKeys.forEach(async key => {
    const item: LocalImage | null = await localforage.getItem(key)

    if (!item?.expires || +item?.expires < new Date().getTime()) {
      return
    }

    localforage.removeItem(key)
  })
}

// Retrieve all artworks local images that have not expired from local storage
export const getAllLocalImagesByArtwork = (): Promise<
  StoredArtworkWithImages[]
> => {
  return localforage
    .getItem(IMAGE_KEY_PREFIX)
    .then((imagesByArtworkJSONString: string) => {
      if (imagesByArtworkJSONString) {
        const imagesByArtwork = JSON.parse(imagesByArtworkJSONString) as
          | StoredArtworkWithImages[]
          | null
        if (Array.isArray(imagesByArtwork)) {
          return imagesByArtwork.filter(artworkImagesObj => {
            const images = artworkImagesObj.images.filter(image => {
              // @ts-ignore
              const expires = new Date(image.expires)
              // Only return images that have not expired
              return expires > new Date()
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
  artworkID: string
): Promise<LocalImage[]> => {
  const localArtworksImages = await getAllLocalImagesByArtwork()
  const artworkImages = localArtworksImages?.find(
    artworkImagesObj => artworkImagesObj.artworkID === artworkID
  )

  return artworkImages?.images || []
}

export const getProfileLocalImage = async (): Promise<
  LocalImage | undefined
> => {
  return localforage
    .getItem(LOCAL_PROFILE_IMAGE_KEY)
    .then((userImageJSONString: string) => {
      if (userImageJSONString) {
        const parsedImage = JSON.parse(userImageJSONString)
        const expires = new Date(parsedImage.expires)
        if (expires > new Date()) {
          return parsedImage
        } else {
          // remove expired profile image
          localforage.removeItem(LOCAL_PROFILE_IMAGE_KEY)
        }
      }
    })
    .catch(error => {
      console.error("failed to get profile local image", error)
    })
}

const prepareImage = (image: LocalImage, expires: string) => {
  const imageToStore: LocalImage = {
    expires,
    data: image.data,
    height: image.height,
    width: image.width,
    aspectRatio: image.width / (image.height || 1),
  }

  return JSON.stringify(imageToStore)
}

export const isImageVersionAvailable = (
  image: { readonly versions: any } | null,
  version: string
) => !!image?.versions?.includes(version)

export const useLocalImage = (image: any) => {
  const [localImage, setLocalImage] = useState<LocalImage | null>(null)

  const fetchLocalImage = useCallback(() => getLocalImage(image.internalID!), [
    image.internalID,
  ])

  const isImageAvailable = isImageVersionAvailable(image, "large")

  const changeLocalImage = async () => {
    if (isImageAvailable || !image.internalID) {
      setLocalImage(null)

      return
    }

    try {
      const image = await fetchLocalImage()

      setLocalImage(image)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    changeLocalImage()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [image.internalID])

  return localImage
}

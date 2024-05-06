import localforage from "localforage"
import { useEffect, useState } from "react"

// Expiration time is 5 minutes
const EXPIRATION_TIME = 5 * 60 * 1000
const IMAGE_KEY_PREFIX = "IMAGES"
const DEFAULT_IMAGE_VERSION = "large"

export interface LocalImage {
  data: string
  width: number
  height: number
  expires?: string
  photoID?: string
  aspectRatio?: number
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

// Clean all images that have been expired
export const cleanLocalImages = async () => {
  const keys = await localforage.keys()

  const imageKeys = keys.filter(key => key.startsWith(IMAGE_KEY_PREFIX))

  imageKeys.forEach(async key => {
    const item = JSON.parse((await localforage.getItem(key)) || "{}")

    if (!item?.expires || +item?.expires > new Date().getTime()) {
      return
    }

    localforage.removeItem(key)
  })
}

/**
 * Returns the local image if it is stored and the requested image version is not available
 */
export const useLocalImage = (
  image:
    | { internalID: string | null | undefined; versions: any }
    | null
    | undefined,
  requestedImageVersion?: string
) => {
  return useLocalImageStorage(
    image?.internalID,
    image?.versions,
    requestedImageVersion
  )
}

/**
 * Returns the local image for a given key if it is stored and if the requested image version is not available
 */
export const useLocalImageStorage = (
  key: string | null | undefined,
  imageVersions?: any,
  requestedImageVersion?: string
) => {
  const [localImage, setLocalImage] = useState<LocalImage | null>(null)

  const isImageAvailable =
    imageVersions &&
    isImageVersionAvailable(
      imageVersions,
      requestedImageVersion || DEFAULT_IMAGE_VERSION
    )

  const changeLocalImage = async () => {
    if (isImageAvailable || !key) {
      setLocalImage(null)
      return
    }

    try {
      setLocalImage(await getLocalImage(key))
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    changeLocalImage()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])

  return localImage
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

export const isImageVersionAvailable = (versions: any[], version: string) =>
  !!versions?.includes(version)

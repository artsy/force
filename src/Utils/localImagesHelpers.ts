import localforage from "localforage"
import { useEffect, useState } from "react"

// Expiritation time is 5 minutes
// TODO: Decrease number
const EXPIRATION_TIME = 500 * 60 * 1000
const IMAGE_KEY_PREFIX = "IMAGES"
export const PROFILE_IMAGE_KEY = "PROFILE_IMAGE"

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

// Clean store after gemini processing time is over
export const cleanLocalImages = async () => {
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

export const useLocalImage = (
  image: { internalID: string | null; versions: any } | null
) => {
  return useLocalImageStorage(image?.internalID, image?.versions)
}

export const useLocalImageStorage = (
  internalID: string | null | undefined,
  versions?: any
) => {
  const [localImage, setLocalImage] = useState<LocalImage | null>(null)

  const isImageAvailable =
    versions && isImageVersionAvailable(versions, "large")

  const changeLocalImage = async () => {
    if (isImageAvailable || !internalID) {
      setLocalImage(null)

      return
    }

    try {
      // TODO: Check if we can memoize this
      setLocalImage(await getLocalImage(internalID!))
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    changeLocalImage()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [internalID])

  return localImage
}

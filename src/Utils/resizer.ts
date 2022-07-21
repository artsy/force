import qs from "qs"
import { getENV } from "./getENV"

const GEMINI_CLOUDFRONT_URL =
  getENV("GEMINI_CLOUDFRONT_URL") ?? "https://d7hftxdivxxvm.cloudfront.net"

const warn = (message: string) => {
  if (process.env.NODE_ENV === "development") {
    console.warn(message)
  }
}

export const crop = (
  src: string,
  options: {
    width: number
    height: number
    quality?: number
    convert_to?: string
  }
) => {
  const { width, height, quality, convert_to } = options

  if (!src) return null

  if (!width && !height) {
    warn("requires width and height")
    return src
  } else if (width === 0) {
    warn("width must be non-zero")
    return src
  } else if (height === 0) {
    warn("height must be non-zero")
    return src
  }

  const config = {
    resize_to: "fill",
    src,
    width,
    height,
    quality: quality || 80,
    convert_to,
  }

  return [GEMINI_CLOUDFRONT_URL, qs.stringify(config)].join("?")
}

export const resize = (
  src: string,
  options: {
    width?: number
    height?: number
    quality?: number
    convert_to?: string
  }
) => {
  const { width, height, quality, convert_to } = options

  if (!src) return null

  let resizeTo

  if (width && !height) {
    resizeTo = "width"
  } else if (height && !width) {
    resizeTo = "height"
  } else {
    resizeTo = "fit"
  }

  const config = {
    resize_to: resizeTo,
    src,
    width,
    height,
    quality: quality || 80,
    convert_to,
  }

  return [GEMINI_CLOUDFRONT_URL, qs.stringify(config)].join("?")
}

import qs from "qs"
import { data } from "sharify"

// https://res.cloudinary.com/artsy-demo/image/fetch/
// c_fit,h_150,w_150/f_auto/
// https://d32dm0rphc51dk.cloudfront.net/F0LQI52hCGA2WWVV7fTMpA/large.jpg

const warn = message => {
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
  const { width, height } = options

  // dont call gemini with empty src
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

  const transformations = `c_crop,h_${height},w_${width}/f_auto/q_auto`

  return [
    "https://res.cloudinary.com/artsy-demo/image/fetch",
    transformations,
    src,
  ].join("/")
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
  const { width, height } = options

  // dont call gemini with empty src
  if (!src) return null

  const transformations = `c_fit,h_${height},w_${width}/f_auto/q_auto`

  return [
    "https://res.cloudinary.com/artsy-demo/image/fetch",
    transformations,
    src,
  ].join("/")
}

import { configureImageServices } from "@artsy/img"
import { getENV } from "./getENV"

export const GEMINI_CLOUDFRONT_URL =
  getENV("GEMINI_CLOUDFRONT_URL") ?? "https://d7hftxdivxxvm.cloudfront.net"

const services = configureImageServices({
  gemini: {
    endpoint: GEMINI_CLOUDFRONT_URL,
  },
})

export const crop = (
  src: string,
  options: {
    width: number
    height: number
    quality?: number
  }
) => {
  return services.gemini.exec("crop", src, {
    width: options.width,
    height: options.height,
    quality: options.quality,
  })
}

export const resize = (
  src: string,
  options: {
    width?: number
    height?: number
    quality?: number
  }
) => {
  return services.gemini.exec("resize", src, {
    width: options.width,
    height: options.height,
    quality: options.quality,
  })
}

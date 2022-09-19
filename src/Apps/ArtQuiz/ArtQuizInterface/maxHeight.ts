import { scale } from "proportional-scale"
import { cropped, resized } from "Utils/resized"

export const maxHeight = (
  artworks: Array<{
    width: number
    height: number
  }>,
  defaultMaxDimension: number = 800
) => {
  const hasGeometry = !!artworks[0]?.width
  return Math.max(
    ...artworks.map(artwork => {
      const scaled = scale({
        width: artwork.width!,
        height: artwork.height!,
        maxWidth: defaultMaxDimension,
        maxHeight: defaultMaxDimension,
      })

      return hasGeometry ? scaled.height : defaultMaxDimension
    })
  )
}

export const processImageUrl = ({ aspectRatio = 1, width = 445, url }) => {
  const height = Math.floor(width / aspectRatio)
  const transform = aspectRatio === 1 ? cropped : resized
  const { src, srcSet } = url
    ? transform(url, { width, height })
    : { src: "", srcSet: "" }

  return { src, srcSet }
}

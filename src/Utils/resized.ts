import { getENV } from "./getENV"
import { crop, resize } from "./resizer"

export const MOBILE_QUALITY: [number, number] = [80, 50]
export const DESKTOP_QUALITY: [number, number] = [80, 80]
export const optimizedQuality = () =>
  getENV("IS_MOBILE") ? MOBILE_QUALITY : DESKTOP_QUALITY

type Sized = { src: string; srcSet: string }
type Resize = Parameters<typeof resize>

function normalizeQuality(
  quality: number | [number, number] = optimizedQuality()
) {
  let quality1x
  let quality2x
  if (typeof quality === "number") {
    quality1x = quality2x = quality
  } else {
    quality1x = quality[0]
    quality2x = quality[1]
  }
  return [quality1x, quality2x]
}

/**
 * Same arguments as `resize`, but returns a `srcSet` with 2x support
 * in addition to the 1x `src`.
 */
export const resized = (
  src: Resize[0],
  {
    height,
    quality,
    width,
    ...rest
  }: {
    height?: number
    quality?: number | [number, number]
    width?: number
  }
): Sized => {
  const [quality1x, quality2x] = normalizeQuality(quality)

  const _1x = resize(src, { height, quality: quality1x, width, ...rest })
  const _2x = resize(src, {
    ...(width ? { width: width * 2 } : {}),
    ...(height ? { height: height * 2 } : {}),
    quality: quality2x,
    ...rest,
  })

  return {
    src: _1x,
    srcSet: `${_1x} 1x, ${_2x} 2x`,
  }
}

type Crop = Parameters<typeof crop>

/**
 * Same arguments as `crop`, but returns a `srcSet` with 2x support
 * in addition to the 1x `src`.
 */
export const cropped = (
  src: Crop[0],
  {
    height,
    quality,
    width,
    ...rest
  }: {
    height: number
    quality?: number | [number, number]
    width: number
  }
): Sized => {
  const [quality1x, quality2x] = normalizeQuality(quality)

  const _1x = crop(src, { width, height, quality: quality1x, ...rest })
  const _2x = crop(src, {
    width: width * 2,
    height: height * 2,
    quality: quality2x,
    ...rest,
  })

  return {
    src: _1x,
    srcSet: `${_1x} 1x, ${_2x} 2x`,
  }
}

export const maxWidthByArea = ({
  width,
  height,
  area,
}: {
  width: number
  height: number
  area: number
}) => {
  // return Math.round(width * Math.sqrt(area / (width * height)))
  return maxDimensionsByArea({ width, height, area }).width
}

export const maxDimensionsByArea = ({
  width,
  height,
  area,
}: {
  width: number
  height: number
  area: number
}) => {
  const aspectRatio = width / height
  const newHeight = Math.sqrt(area / aspectRatio)
  const newWidth = aspectRatio * newHeight

  return {
    width: Math.round(newWidth),
    height: Math.round(newHeight),
  }
}

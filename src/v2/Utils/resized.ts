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
    convert_to?: string
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
    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
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
    convert_to?: string
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
    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
    src: _1x,
    srcSet: `${_1x} 1x, ${_2x} 2x`,
  }
}

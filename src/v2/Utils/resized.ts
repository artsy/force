import { crop, resize } from "./resizer"

type Sized = { src: string; srcSet: string }
type Resize = Parameters<typeof resize>

/**
 * Same arguments as `resize`, but returns a `srcSet` with 2x support
 * in addition to the 1x `src`.
 */
export const resized = (
  src: Resize[0],
  { width, height, ...rest }: Resize[1]
): Sized => {
  const _1x = resize(src, { width, height, ...rest })
  const _2x = resize(src, {
    ...(width ? { width: width * 2 } : {}),
    ...(height ? { height: height * 2 } : {}),
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
  { width, height, ...rest }: Crop[1]
): Sized => {
  const _1x = crop(src, { width, height, ...rest })
  const _2x = crop(src, { width: width * 2, height: height * 2, ...rest })

  return {
    src: _1x,
    srcSet: `${_1x} 1x, ${_2x} 2x`,
  }
}

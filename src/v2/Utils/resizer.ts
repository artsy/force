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
  const { width, height, quality } = options

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

  const transformations = `c_fill,h_${height},w_${width}/f_auto/q_${
    quality ?? "auto"
  }`

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
  const { width, height, quality } = options

  // dont call gemini with empty src
  if (!src) return null

  const transformations = [
    [
      "c_fit",
      ...(height ? [`h_${height}`] : []),
      ...(width ? [`w_${width}`] : []),
    ].join(","),
    "f_auto",
    `q_${quality ?? "auto"}`,
  ].join("/")

  return [
    "https://res.cloudinary.com/artsy-demo/image/fetch",
    transformations,
    src,
  ].join("/")
}

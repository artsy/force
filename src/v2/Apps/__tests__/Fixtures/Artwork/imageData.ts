export function imageData(width: number, height: number, imageIndex?: number) {
  return {
    uri: `https://picsum.photos/${width}/${height}/?${
      imageIndex === undefined ? "random" : `image=${imageIndex}`
    }`,
    aspectRatio: width / height,
  }
}

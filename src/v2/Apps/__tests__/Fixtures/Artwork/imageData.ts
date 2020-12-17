export function imageData(width: number, height: number, imageIndex?: number) {
  return {
    aspectRatio: width / height,
    uri: `https://picsum.photos/${width}/${height}/?${
      imageIndex === undefined ? "random" : `image=${imageIndex}`
    }`,
  }
}

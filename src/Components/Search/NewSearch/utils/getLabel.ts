interface GetLabelOptions {
  displayType?: string
  typename: string
}

export const getLabel = ({ displayType, typename }: GetLabelOptions) => {
  if (displayType) {
    return displayType
  }

  if (typename === "Artist") {
    return "Artist"
  }

  return null
}

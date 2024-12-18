export const supportedSorts = ["FEATURED_DESC", "NAME_ASC"]
export const defaultSort = supportedSorts[0]

export const isValidSort = (sort = "") => {
  return !sort || supportedSorts.includes(sort)
}

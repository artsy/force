export const supportedSorts = ["FEATURED_DESC", "NAME_ASC"]
export const defaultSort = supportedSorts[0]

export const checkSort = (sort: string = "") => {
  return !sort || supportedSorts.includes(sort)
}

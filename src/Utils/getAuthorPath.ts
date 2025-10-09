export interface AuthorPathData {
  slug?: string | null
  name: string
  internalID: string
}

export const getAuthorPath = (author: AuthorPathData): string => {
  const slug = author.slug || author.internalID
  return `/articles/author/${slug}`
}

export const getLegacyAuthorPath = (internalID: string): string => {
  return `/articles/author/${internalID}`
}

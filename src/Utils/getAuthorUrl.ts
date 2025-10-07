export interface AuthorUrlData {
  slug?: string | null
  name: string
  internalID: string
}

export const getAuthorUrl = (author: AuthorUrlData): string => {
  const slug = author.slug || author.internalID
  return `/articles/author/${slug}`
}

export const getLegacyAuthorUrl = (internalID: string): string => {
  return `/articles/author/${internalID}`
}

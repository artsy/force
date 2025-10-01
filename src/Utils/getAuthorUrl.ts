import { slugify } from "underscore.string"

export interface AuthorUrlData {
  slug?: string | null
  name: string
  internalID: string
}

export const getAuthorSlug = (name: string): string => {
  return slugify(name.toLowerCase())
}

export const getAuthorUrl = (author: AuthorUrlData): string => {
  const slug = author.slug || getAuthorSlug(author.name)
  return `/articles/author/${slug}`
}

export const getLegacyAuthorUrl = (internalID: string): string => {
  return `/articles/author/${internalID}`
}

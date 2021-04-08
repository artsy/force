import { getENV } from "v2/Utils/getENV"

export const toHumanSentence = (list): string => {
  return list.join(", ").replace(/,\s([^,]+)$/, ", and $1")
}

export const getAuthors = (
  channelID: string,
  author: { name: string },
  contributingAuthors: readonly { readonly name: string }[]
): { authorName: string; editorialName: string | null } => {
  const authorNameObj = {
    authorName: null,
    editorialName: "artsy editorial",
  }

  const isIDsMatched = getENV("ARTSY_EDITORIAL_CHANNEL") === channelID

  if (!isIDsMatched) {
    authorNameObj.editorialName = null
  }

  if (contributingAuthors.length) {
    const authorName = contributingAuthors.map(author => author.name)

    authorNameObj.authorName = toHumanSentence(authorName)
  }

  if (!contributingAuthors.length && author) {
    authorNameObj.authorName = author.name
  }

  return authorNameObj
}

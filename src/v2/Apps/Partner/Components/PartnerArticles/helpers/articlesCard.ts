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
    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
    authorNameObj.editorialName = null
  }

  if (contributingAuthors.length) {
    const authorName = contributingAuthors.map(author => author.name)

    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
    authorNameObj.authorName = toHumanSentence(authorName)
  }

  if (!contributingAuthors.length && author) {
    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
    authorNameObj.authorName = author.name
  }

  // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
  return authorNameObj
}

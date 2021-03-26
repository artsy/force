import _ from "underscore"
import _s from "underscore.string"
import { getENV } from "v2/Utils/getENV"

export const getAuthors = (channelID, author, contributingAuthors) => {
  const authorNameObj = {
    authorName: null,
    editorialName: "artsy editorial",
  }

  const isIDsMatched = getENV("ARTSY_EDITORIAL_CHANNEL") === channelID

  if (!isIDsMatched) {
    authorNameObj.editorialName = null
  }

  if (contributingAuthors.length) {
    authorNameObj.authorName = _s.toSentence(
      _.pluck(contributingAuthors, "name")
    )
  }

  if (!contributingAuthors.length) {
    authorNameObj.authorName = author.name
  }

  return authorNameObj
}

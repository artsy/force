import type { ArticleTimestamp_article$key } from "__generated__/ArticleTimestamp_article.graphql"
import { DateTime } from "luxon"
import type { FC } from "react"
import { graphql, useFragment } from "react-relay"

const UPDATED_AT_THRESHOLD_SECONDS = 24 * 60 * 60 // 24 hours

interface ArticleTimestampProps {
  article: ArticleTimestamp_article$key
}

export const ArticleTimestamp: FC<ArticleTimestampProps> = ({ article }) => {
  const data = useFragment(FRAGMENT, article)

  const publishedAtText = data.publishedAt
    ? DateTime.fromISO(data.publishedAt).toFormat("MMM d, yyyy h:mma")
    : null

  const updatedAtText = data.updatedAt
    ? DateTime.fromISO(data.updatedAt).toFormat("MMM d, yyyy h:mma")
    : null

  const shouldShowUpdatedAt =
    !!data.publishedAt &&
    !!data.updatedAt &&
    DateTime.fromISO(data.updatedAt)
      .diff(DateTime.fromISO(data.publishedAt))
      .as("seconds") > UPDATED_AT_THRESHOLD_SECONDS

  if (!publishedAtText) {
    return null
  }

  return (
    <>
      {publishedAtText}
      {shouldShowUpdatedAt && `. Updated ${updatedAtText}.`}
    </>
  )
}

const FRAGMENT = graphql`
  fragment ArticleTimestamp_article on Article {
    publishedAt
    updatedAt
  }
`

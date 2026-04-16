import { Stack, Text } from "@artsy/palette"
import { useArticleScrollHistory } from "Apps/Article/Components/ArticleScrollHistoryProvider"
import type { ArticleTableOfContents_article$key } from "__generated__/ArticleTableOfContents_article.graphql"
import type { FC } from "react"
import { useCallback } from "react"
import { graphql, useFragment } from "react-relay"
import { createJumpHash } from "./Utils/extractHeadings"

interface ArticleTableOfContentsProps {
  article: ArticleTableOfContents_article$key
}

export const ArticleTableOfContents: FC<ArticleTableOfContentsProps> = ({
  article: articleRef,
}) => {
  const article = useFragment(FRAGMENT, articleRef)
  const { pushJump } = useArticleScrollHistory()

  const handleClick = useCallback(
    (event: React.MouseEvent, headingSlug: string) => {
      event.preventDefault()
      pushJump({
        articleHref: article.href ?? "",
        articleSlug: article.slug ?? "",
        headingSlug,
      })
    },
    [article.href, article.slug, pushJump],
  )

  if (article.outline.length < 5) return null

  return (
    <Stack gap={1} bg="mono5" p={2}>
      <Text variant="xs" fontWeight="bold">
        In this article
      </Text>

      <Stack as="nav" gap={1}>
        {article.outline.map(entry => {
          return (
            <Text
              key={entry.slug}
              variant="sm-display"
              as="a"
              href={createJumpHash({
                articleSlug: article.slug ?? "",
                slug: entry.slug,
              })}
              style={{
                textDecoration: "none",
              }}
              onClick={event => handleClick(event, entry.slug)}
            >
              {entry.heading}
            </Text>
          )
        })}
      </Stack>
    </Stack>
  )
}

const FRAGMENT = graphql`
  fragment ArticleTableOfContents_article on Article {
    href
    slug
    outline {
      heading
      slug
    }
  }
`

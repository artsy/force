import { Stack, Text } from "@artsy/palette"
import { useTocJump } from "Apps/Article/Hooks/useTocJump"
import type { ArticleTableOfContents_article$key } from "__generated__/ArticleTableOfContents_article.graphql"
import type { FC } from "react"
import { useCallback } from "react"
import { graphql, useFragment } from "react-relay"

interface ArticleTableOfContentsProps {
  article: ArticleTableOfContents_article$key
}

export const ArticleTableOfContents: FC<ArticleTableOfContentsProps> = ({
  article: articleRef,
}) => {
  const article = useFragment(FRAGMENT, articleRef)
  const { jump, getHref } = useTocJump(article.slug ?? "")

  const handleClick = useCallback(
    (event: React.MouseEvent, headingSlug: string) => {
      event.preventDefault()
      jump(headingSlug)
    },
    [jump],
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
              href={getHref(entry.slug)}
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
    slug
    outline {
      heading
      slug
    }
  }
`

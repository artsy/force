import { Box, Stack, Text } from "@artsy/palette"
import { useTocJump } from "Apps/Article/Hooks/useTocJump"
import { StructuredData } from "Components/Seo/StructuredData"
import { getENV } from "Utils/getENV"
import type { ArticleTableOfContents_article$key } from "__generated__/ArticleTableOfContents_article.graphql"
import type { FC } from "react"
import { useCallback } from "react"
import { graphql, useFragment } from "react-relay"

interface ArticleTableOfContentsProps {
  article: ArticleTableOfContents_article$key
}

const MIN_OUTLINE_ENTRIES = 3

export const ArticleTableOfContents: FC<ArticleTableOfContentsProps> = ({
  article: articleRef,
}) => {
  const article = useFragment(FRAGMENT, articleRef)
  const articleSlug = article.slug ?? ""
  const { jump, getHref } = useTocJump(articleSlug)

  const handleClick = useCallback(
    (event: React.MouseEvent, headingSlug: string) => {
      event.preventDefault()
      jump(headingSlug)
    },
    [jump],
  )

  if (article.outline.length < MIN_OUTLINE_ENTRIES) return null

  const articleUrl = `${getENV("APP_URL")}${article.href}`

  return (
    <Stack as="nav" aria-label="Table of contents" gap={1} bg="mono5" p={2}>
      <Text variant="xs" fontWeight="bold">
        Featured in this Article
      </Text>

      <Stack as="ol" gap={1} m={0} pl={0} style={{ listStyle: "none" }}>
        {article.outline.map(entry => {
          return (
            <Box as="li" key={entry.slug}>
              <Text
                variant="sm-display"
                as="a"
                href={getHref(entry.slug)}
                onClick={event => handleClick(event, entry.slug)}
              >
                {entry.heading}
              </Text>
            </Box>
          )
        })}
      </Stack>

      <StructuredData
        schemaData={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Table of contents",
          itemListElement: article.outline.map((entry, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: entry.heading,
            url: `${articleUrl}${getHref(entry.slug)}`,
          })),
        }}
      />
    </Stack>
  )
}

const FRAGMENT = graphql`
  fragment ArticleTableOfContents_article on Article {
    slug
    href
    outline {
      heading
      slug
    }
  }
`

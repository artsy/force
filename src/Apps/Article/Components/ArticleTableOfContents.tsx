import { Stack, Text } from "@artsy/palette"
import { useJump } from "Utils/Hooks/useJump"
import type { FC } from "react"

interface ArticleTableOfContentsProps {
  outline: ReadonlyArray<{
    readonly heading: string
    readonly slug: string
  }>
}

export const ArticleTableOfContents: FC<ArticleTableOfContentsProps> = ({
  outline,
}) => {
  const { jumpTo } = useJump({ offset: 20 })

  if (outline.length < 5) return null

  return (
    <Stack gap={1} maxWidth="fit-content" bg="mono5" p={2}>
      <Text variant="xs" fontWeight="bold">
        In this article
      </Text>

      <Stack as="nav" gap={1}>
        {outline.map(entry => {
          return (
            <Text
              key={entry.slug}
              variant="sm-display"
              as="a"
              href={`#JUMP--${entry.slug}`}
              style={{
                textDecoration: "none",
              }}
              onClick={event => {
                event.preventDefault()
                jumpTo(entry.slug)
              }}
            >
              {entry.heading}
            </Text>
          )
        })}
      </Stack>
    </Stack>
  )
}

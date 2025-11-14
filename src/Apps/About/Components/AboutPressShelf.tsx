import { Box, Shelf, SkeletonText, Text } from "@artsy/palette"
import type { AboutPressShelfQuery } from "__generated__/AboutPressShelfQuery.graphql"
import { graphql, useLazyLoadQuery } from "react-relay"
import styled from "styled-components"

export const AboutPressShelf = () => {
  const data = useLazyLoadQuery<AboutPressShelfQuery>(
    graphql`
      query AboutPressShelfQuery {
        page(id: "in-the-media") {
          content(format: MARKDOWN)
        }
      }
    `,
    {},
    { fetchPolicy: "store-or-network" },
  )

  const articles = data.page?.content
    ? parsePressArticles({ markdown: data.page.content, limit: 10 })
    : []

  if (articles.length === 0) {
    return null
  }

  return (
    <Shelf>
      {articles.map(article => (
        <AboutPressShelfArticle key={article.url} article={article} />
      ))}
    </Shelf>
  )
}

export const AboutPressShelfPlaceholder = () => {
  return (
    <Shelf>
      {Array.from({ length: 10 }).map((_, index) => (
        <AboutPressShelfArticlePlaceholder key={index} />
      ))}
    </Shelf>
  )
}

interface AboutPressShelfArticleProps {
  article: PressArticle
}

const AboutPressShelfArticle = ({ article }: AboutPressShelfArticleProps) => {
  return (
    <AboutPressShelfArticleCard
      as="a"
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Text variant="sm-display">{article.date}</Text>

      <Text variant="lg-display">{article.title}</Text>

      <Text variant="sm" fontWeight="bold">
        {article.source}
      </Text>

      <Text variant="sm" color="mono60" lineClamp={6}>
        {article.blurb}
      </Text>
    </AboutPressShelfArticleCard>
  )
}

const AboutPressShelfArticlePlaceholder = () => {
  return (
    <AboutPressShelfArticleCard>
      <SkeletonText variant="sm-display">May 0000</SkeletonText>

      <SkeletonText variant="lg-display">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </SkeletonText>

      <SkeletonText variant="sm">Example Source</SkeletonText>

      <SkeletonText variant="sm" lineClamp={6}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores,
        facilis doloremque? Excepturi labore vero, magni facilis, illum quaerat
        eveniet explicabo, odit dicta et accusamus accusantium veritatis
        repellat magnam eaque consectetur.
      </SkeletonText>
    </AboutPressShelfArticleCard>
  )
}

const AboutPressShelfArticleCard = styled(Box).attrs({
  gap: 2,
  p: 2,
  mt: 1,
  width: 360,
  bg: "mono0",
  borderRadius: 10,
})`
  display: flex;
  flex-direction: column;
  text-decoration: none;
  box-shadow: ${({ theme }) => theme.effects.dropShadow};
`

interface PressArticle {
  title: string
  source: string
  blurb: string
  date: string
  url: string
}

/**
 * Split the markdown into date-based sections, then split each section into
 * article blocks, mapping everything into structured objects. Finally flatten
 * and slice to the desired limit.
 */
export const parsePressArticles = ({
  markdown,
  limit,
}: {
  markdown: string
  limit: number
}): PressArticle[] => {
  const sections = markdown
    // Ensure each date header starts new section
    .split(/^##\s+/m)
    .slice(1) // first chunk before first date header is discarded

  const parsed = sections.flatMap(section => {
    const [dateLine, ...rest] = section.split("\n")
    const date = dateLine.trim()

    // Split by article header within this date section
    return rest
      .join("\n")
      .split(/^###\s+/m)
      .slice(1) // discard content before first article header
      .map(block => {
        const lines = block.split("\n")

        // Header (title + url)
        const header = lines[0].trim()
        const linkMatch = header.match(/^\[([^\]]+)\]\(([^)]+)\)/)
        const title = linkMatch ? linkMatch[1] : header
        const url = linkMatch ? linkMatch[2] : ""

        // Source
        let idx = 1
        let source = ""
        if (lines[idx]?.startsWith("####")) {
          source = lines[idx]
            .replace(/^####\s*_?/, "")
            .replace(/_?$/, "")
            .trim()
          idx += 1
        }

        // Blurb (everything else until next article/date)
        const blurb = lines.slice(idx).join("\n").trim()

        // Remove any inline markdown links from the blurb for cleaner output
        const cleanBlurb = blurb.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")

        return {
          date,
          title,
          source,
          blurb: cleanBlurb,
          url,
        }
      })
  })

  return parsed.slice(0, limit)
}

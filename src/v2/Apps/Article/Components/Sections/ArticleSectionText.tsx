import { FC, useMemo } from "react"
import { ArticleHTML } from "../ArticleHTML"
import { ArticleSectionText_section } from "v2/__generated__/ArticleSectionText_section.graphql"
import { createFragmentContainer, graphql } from "react-relay"
import styled from "styled-components"

export const OPTIMAL_READING_WIDTH = "65ch"

interface ArticleSectionTextProps {
  section: ArticleSectionText_section
  isLast: boolean
}

const ArticleSectionText: FC<ArticleSectionTextProps> = ({
  section,
  isLast,
}) => {
  const HTML = useMemo(() => {
    switch (true) {
      case isLast:
        return ArticleHTMLLastChild
      default:
        return ArticleHTML
    }
  }, [isLast])

  if (!section.body) return null

  return (
    <HTML maxWidth={OPTIMAL_READING_WIDTH} mx="auto">
      {section.body}
    </HTML>
  )
}

export const ArticleSectionTextFragmentContainer = createFragmentContainer(
  ArticleSectionText,
  {
    section: graphql`
      fragment ArticleSectionText_section on ArticleSectionText {
        body
      }
    `,
  }
)

/**
 * Inserts a tombstone after the last sentence of the last paragraph.
 */
const ArticleHTMLLastChild = styled(ArticleHTML)`
  p:last-child {
    display: inline-block;

    &:after {
      content: " ∎";
    }
  }
`

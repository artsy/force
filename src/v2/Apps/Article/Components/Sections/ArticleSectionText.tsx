import { FC } from "react"
import { ArticleHTML } from "../ArticleHTML"
import { ArticleSectionText_section$data } from "v2/__generated__/ArticleSectionText_section.graphql"
import { createFragmentContainer, graphql } from "react-relay"
import styled from "styled-components"

interface ArticleSectionTextProps {
  section: ArticleSectionText_section$data
  isFirst: boolean
  isLast: boolean
}

const ArticleSectionText: FC<ArticleSectionTextProps> = ({
  section,
  isFirst,
  isLast,
}) => {
  if (!section.body) return null

  const HTML = (() => {
    switch (true) {
      case isFirst:
        return ArticleHTMLFirstLetter
      case isLast:
        return ArticleHTMLLastChild
      default:
        return ArticleHTML
    }
  })()

  return <HTML>{section.body}</HTML>
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
 * Drop caps the first letter of the first paragraph.
 */
const ArticleHTMLFirstLetter = styled(ArticleHTML)`
  p:first-child::first-letter {
    font-size: 3em;
    float: left;
    margin-right: 0.125em;
    margin-top: 0.25em;
    text-transform: uppercase;
  }
`

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

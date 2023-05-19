import { FullBleed } from "@artsy/palette"
import { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ArticleAd } from "./ArticleAd/ArticleAd"
import { ArticleSectionAd_article$data } from "__generated__/ArticleSectionAd_article.graphql"

const IMAGE_SECTIONS = [
  "ArticleSectionImageCollection",
  "ArticleSectionImageSet",
]

interface ArticleSectionAdProps {
  article: ArticleSectionAd_article$data
  i: number
}

/**
 * Controls ad placement for the article.
 * Features have ads placed after the first and third image-sections.
 * Standard layouts have a single ad placed after the second image-section.
 */
const ArticleSectionAd: FC<ArticleSectionAdProps> = ({ article, i }) => {
  const [first, second, third] = article.sections
    .map((section, index) => {
      return IMAGE_SECTIONS.includes(section.__typename) ? index : false
    })
    .filter(index => index !== false)
    .slice(0, 3)

  switch (article.layout) {
    case "FEATURE": {
      if (i === first) {
        return (
          <FullBleed bg="black5" p={1}>
            <ArticleAd unit="Desktop_Leaderboard1" size="970x250" />
          </FullBleed>
        )
      }

      if (i === third) {
        return (
          <FullBleed bg="black5" p={1}>
            <ArticleAd unit="Desktop_Leaderboard2" size="970x250" />
          </FullBleed>
        )
      }

      return null
    }

    case "STANDARD": {
      if (i === second) {
        return <ArticleAd unit="Desktop_LeaderboardRepeat" size="970x250" />
      }

      return null
    }

    default:
      return null
  }
}

export const ArticleSectionAdFragmentContainer = createFragmentContainer(
  ArticleSectionAd,
  {
    article: graphql`
      fragment ArticleSectionAd_article on Article {
        layout
        sections {
          __typename
        }
      }
    `,
  }
)

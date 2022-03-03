import { FullBleed } from "@artsy/palette"
import { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ArticleAd } from "./ArticleAd"
import { ArticleSectionAd_article } from "v2/__generated__/ArticleSectionAd_article.graphql"

interface ArticleSectionAdProps {
  article: ArticleSectionAd_article
  i: number
}

const ArticleSectionAd: FC<ArticleSectionAdProps> = ({ article, i }) => {
  switch (article.layout) {
    case "FEATURE": {
      if (i === 1) {
        return (
          <FullBleed bg="black5" p={1}>
            <ArticleAd unit="Desktop_Leaderboard1" size="970x250" />
          </FullBleed>
        )
      }

      if (i === 6) {
        return (
          <FullBleed bg="black5" p={1}>
            <ArticleAd unit="Desktop_Leaderboard2" size="970x250" />
          </FullBleed>
        )
      }

      return null
    }

    case "STANDARD": {
      if (i === 6) {
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
      }
    `,
  }
)

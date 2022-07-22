import { ArticleAdProvider, ArticleAd, ArticleAdProps } from "./ArticleAd"
import { AD_SIZES } from "./types"
import { States } from "storybook-states"
import { track } from "react-tracking"

export default {
  title: "Components/ArticleAd",
}

export const Default = track()(() => {
  return (
    <ArticleAdProvider>
      <States<Partial<ArticleAdProps>>
        states={AD_SIZES.map(size => ({ size }))}
      >
        <ArticleAd unit="Desktop_Leaderboard1" size="970x250" />
      </States>
    </ArticleAdProvider>
  )
})

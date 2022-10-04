import { graphql } from "react-relay"
import { States } from "storybook-states"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { ArticleHeroFragmentContainer } from "./ArticleHero"
import { ArticleHeroStoryQuery } from "__generated__/ArticleHeroStoryQuery.graphql"

export default {
  title: "Components/Article/ArticleHero",
}

export const ArticleHero = () => {
  return (
    <States<{ id: string }>
      states={[
        { id: "artsy-editors-breakout-talents" },
        {
          id:
            "artsy-editorial-artsy-vanguard-2020-hock-aye-vi-edgar-heap-birds",
        },

        { id: "editorial-in-the-studio-with-jr" },
        { id: "artsy-editorial-artsy-vanguard-2021" },
        {
          id:
            "artsy-editorial-new-generation-black-women-nonbinary-gallerists-redefining-gallery-model",
        },
        { id: "artsy-editorial-artsy-collectors-2022" },
        { id: "artsy-editorial-inside-collection-roxane-gay-debbie-millman" },
        { id: "artsy-editorial-trends-watch-2021-colored-pencil-revival" },
        { id: "artsy-editorial-19-collectors-art-bought-2020" },
        { id: "artsy-editorial-black-collectors-shaping-future-art" },
        {
          id:
            "artsy-editorial-behind-the-venice-biennale-2015-a-short-history-of-the-world-s-most-important-art-exhibition",
        },
        {
          id:
            "artsy-editorial-dale-chihuly-pioneering-glass-artist-building-major-legacy",
        },
        {
          id:
            "artsy-editorial-midst-covid-19-chinese-galleries-adapt-persevere",
        },
        { id: "artsy-editorial-20-artists-shaping-future-ceramics" },
      ]}
    >
      {({ id }) => {
        return (
          <SystemQueryRenderer<ArticleHeroStoryQuery>
            variables={{ id }}
            query={graphql`
              query ArticleHeroStoryQuery($id: String!) {
                article(id: $id) {
                  ...ArticleHero_article
                }
              }
            `}
            render={({ error, props }) => {
              if (error) {
                console.error(error)
                return null
              }

              if (!props?.article) {
                return null
              }

              return (
                <ArticleHeroFragmentContainer
                  article={props.article}
                  fixed={false}
                />
              )
            }}
          />
        )
      }}
    </States>
  )
}

ArticleHero.story = {
  name: "ArticleHero",
}

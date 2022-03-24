import { graphql } from "relay-runtime"
import { States } from "storybook-states"
import { SystemQueryRenderer } from "v2/System/Relay/SystemQueryRenderer"
import {
  CellArticleFragmentContainer,
  CellArticleProps,
  CellArticlePlaceholder,
} from "./CellArticle"
import { CellArticleStoryQuery } from "v2/__generated__/CellArticleStoryQuery.graphql"

export default {
  title: "Components/Cell",
}

export const CellArticle = () => {
  return (
    <States<{ id: string } & Partial<Omit<CellArticleProps, "article">>>
      states={[
        { id: "artsy-editorial-10-artists-must-see-museum-2022" },
        { id: "artsy-editorial-10-artists-must-see-museum-2022", mode: "GRID" },
        {
          id:
            "artsy-editorial-legacy-marina-abramovics-the-artist-present-lives-new-generations-artists",
        },
        { id: "artsy-editorial-9-standout-lots-artsy-week", mode: "GRID" },
      ]}
    >
      {({ id, ...rest }) => {
        return (
          <SystemQueryRenderer<CellArticleStoryQuery>
            variables={{ id }}
            placeholder={<CellArticlePlaceholder />}
            query={graphql`
              query CellArticleStoryQuery($id: String!) {
                article(id: $id) {
                  ...CellArticle_article
                }
              }
            `}
            render={({ error, props }) => {
              if (error) {
                console.error(error)
                return null
              }

              if (!props?.article) {
                return <CellArticlePlaceholder />
              }

              return (
                <CellArticleFragmentContainer
                  article={props.article}
                  {...rest}
                />
              )
            }}
          />
        )
      }}
    </States>
  )
}

CellArticle.story = {
  name: "CellArticle",
}

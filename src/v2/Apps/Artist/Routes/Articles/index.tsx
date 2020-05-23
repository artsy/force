import { Sans, Spacer } from "@artsy/palette"
import { Articles_artist } from "v2/__generated__/Articles_artist.graphql"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ArtistArticlesRefetchContainer as Articles } from "./ArtistArticles"

export interface ArticlesRouteProps {
  artist: Articles_artist
}

export const ArticlesRoute: React.SFC<ArticlesRouteProps> = props => {
  return (
    <>
      <Sans size="6" color="black100">
        All Articles
      </Sans>
      <Spacer mb={3} />
      <Articles artist={props.artist} />
    </>
  )
}

export const ArticlesRouteFragmentContainer = createFragmentContainer(
  ArticlesRoute,
  {
    artist: graphql`
      fragment Articles_artist on Artist {
        ...ArtistArticles_artist
      }
    `,
  }
)

// Top-level route needs to be exported for bundle splitting in the router
export default ArticlesRouteFragmentContainer

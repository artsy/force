import { Sans, Spacer } from "@artsy/palette"
import { CV_viewer } from "v2/__generated__/CV_viewer.graphql"
import React, { Component } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import styled from "styled-components"
import { CVPaginationContainer as CVItem } from "./CVItem"

export interface CVRouteProps {
  viewer: CV_viewer
}

const Container = styled.div`
  .cvItems:last-child {
    .cvSeparator {
      display: none;
    }
  }
`

export class CVRoute extends Component<CVRouteProps> {
  render() {
    const { viewer } = this.props
    return (
      <Container>
        <Sans size="6" color="black100">
          Past Shows and Fair Booths
        </Sans>
        <Spacer mb={3} />
        <CVItem category="Solo shows" artist={viewer.artist_soloShows} />
        <CVItem category="Group shows" artist={viewer.artist_groupShows} />
        <CVItem category="Fair booths" artist={viewer.artist_fairBooths} />
      </Container>
    )
  }
}

export const CVRouteFragmentContainer = createFragmentContainer(CVRoute, {
  viewer: graphql`
    fragment CV_viewer on Viewer
      @argumentDefinitions(
        soloShowsAtAFair: { type: "Boolean", defaultValue: false }
        soloShowsSoloShow: { type: "Boolean", defaultValue: true }
        groupShowsAtAFair: { type: "Boolean", defaultValue: false }
        fairBoothsAtAFair: { type: "Boolean", defaultValue: true }
      ) {
      artist_soloShows: artist(id: $artistID) {
        ...CVItem_artist
          @arguments(atAFair: $soloShowsAtAFair, soloShow: $soloShowsSoloShow)
      }
      artist_groupShows: artist(id: $artistID) {
        ...CVItem_artist @arguments(atAFair: $groupShowsAtAFair)
      }
      artist_fairBooths: artist(id: $artistID) {
        ...CVItem_artist @arguments(atAFair: $fairBoothsAtAFair)
      }
    }
  `,
})

// Top-level route needs to be exported for bundle splitting in the router
export default CVRouteFragmentContainer

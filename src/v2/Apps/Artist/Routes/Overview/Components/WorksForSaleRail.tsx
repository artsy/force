import { ContextModule } from "@artsy/cohesion"
import { WorksForSaleRail_artist } from "v2/__generated__/WorksForSaleRail_artist.graphql"
import { WorksForSaleRailRendererQuery } from "v2/__generated__/WorksForSaleRailRendererQuery.graphql"
import { SystemContext } from "v2/Artsy"
import { track } from "v2/Artsy/Analytics"
import * as Schema from "v2/Artsy/Analytics/Schema"
import { renderWithLoadProgress } from "v2/Artsy/Relay/renderWithLoadProgress"
import { SystemQueryRenderer } from "v2/Artsy/Relay/SystemQueryRenderer"
import FillwidthItem from "v2/Components/Artwork/FillwidthItem"
import { Carousel } from "v2/Components/Carousel"
import React, { useContext } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { get } from "v2/Utils/get"

interface WorksForSaleRailProps {
  artist: WorksForSaleRail_artist
}
const HEIGHT = 150

const WorksForSaleRail: React.FC<
  WorksForSaleRailProps & {
    onArtworkClicked: () => void
  }
> = ({ artist, onArtworkClicked }) => {
  const { user, mediator } = useContext(SystemContext)

  const artistData = get(artist, a => a.artworksConnection.edges, [])

  return (
    <Carousel data-test={ContextModule.worksForSaleRail} arrowHeight={HEIGHT}>
      {artistData.map(artwork => {
        return (
          <FillwidthItem
            key={artwork.node.id}
            artwork={artwork.node}
            contextModule={ContextModule.worksForSaleRail}
            imageHeight={HEIGHT}
            user={user}
            mediator={mediator}
            onClick={onArtworkClicked}
            lazyLoad
          />
        )
      })}
    </Carousel>
  )
}

@track({
  context_module: Schema.ContextModule.WorksForSale,
})
class WorksForSaleRailWithTracking extends React.Component<
  WorksForSaleRailProps
> {
  @track({
    type: Schema.Type.Thumbnail,
    action_type: Schema.ActionType.Click,
  })
  trackArtworkClicked() {
    // noop
  }

  render() {
    return (
      <WorksForSaleRail
        {...this.props}
        onArtworkClicked={this.trackArtworkClicked.bind(this)}
      />
    )
  }
}

export const WorksForSaleRailFragmentContainer = createFragmentContainer(
  WorksForSaleRailWithTracking,
  {
    artist: graphql`
      fragment WorksForSaleRail_artist on Artist {
        artworksConnection(first: 20, sort: AVAILABILITY_ASC) {
          edges {
            node {
              id
              ...FillwidthItem_artwork
            }
          }
        }
        ...FollowArtistButton_artist
      }
    `,
  }
)

export const WorksForSaleRailQueryRenderer: React.FC<{
  artistID: string
}> = ({ artistID }) => {
  const { relayEnvironment } = useContext(SystemContext)
  return (
    <SystemQueryRenderer<WorksForSaleRailRendererQuery>
      environment={relayEnvironment}
      query={graphql`
        query WorksForSaleRailRendererQuery($artistID: String!) {
          artist(id: $artistID) {
            ...WorksForSaleRail_artist
          }
        }
      `}
      variables={{ artistID }}
      render={renderWithLoadProgress(WorksForSaleRailFragmentContainer)}
    />
  )
}

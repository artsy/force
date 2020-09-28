import { ContextModule } from "@artsy/cohesion"
import { Separator, Text } from "@artsy/palette"
import { RecentlyViewed_me } from "v2/__generated__/RecentlyViewed_me.graphql"
import { RecentlyViewedQuery } from "v2/__generated__/RecentlyViewedQuery.graphql"
import { SystemContext, SystemContextConsumer } from "v2/Artsy"
import { track } from "v2/Artsy/Analytics"
import * as Schema from "v2/Artsy/Analytics/Schema"
import { renderWithLoadProgress } from "v2/Artsy/Relay/renderWithLoadProgress"
import { SystemQueryRenderer as QueryRenderer } from "v2/Artsy/Relay/SystemQueryRenderer"
import { FillwidthItem } from "v2/Components/Artwork/FillwidthItem"
import { Carousel } from "v2/Components/Carousel"
import React, { useContext } from "react"
import { createFragmentContainer, graphql } from "react-relay"

export interface RecentlyViewedProps {
  me: RecentlyViewed_me
}

const HEIGHT = 180

@track({
  context_module: Schema.ContextModule.RecentlyViewedArtworks,
})
export class RecentlyViewed extends React.Component<RecentlyViewedProps> {
  @track({
    type: Schema.Type.Thumbnail,
    action_type: Schema.ActionType.Click,
  })
  trackClick() {
    //
  }

  render() {
    const { me } = this.props

    return (
      <SystemContextConsumer>
        {({ user, mediator }) => {
          return (
            me && (
              <>
                <Separator my={6} />

                <Text variant="subtitle" mb={3}>
                  Recently viewed
                </Text>

                <Carousel arrowHeight={HEIGHT}>
                  {me.recentlyViewedArtworksConnection.edges.map(artwork => {
                    return (
                      <FillwidthItem
                        key={artwork.node.id}
                        lazyLoad={true}
                        // @ts-ignore // TODO: Correct typing
                        artwork={artwork.node}
                        imageHeight={HEIGHT}
                        user={user}
                        mediator={mediator}
                        onClick={this.trackClick.bind(this)}
                        contextModule={ContextModule.recentlyViewedRail}
                      />
                    )
                  })}
                </Carousel>
              </>
            )
          )
        }}
      </SystemContextConsumer>
    )
  }
}

export const RecentlyViewedFragmentContainer = createFragmentContainer(
  RecentlyViewed,
  {
    me: graphql`
      fragment RecentlyViewed_me on Me {
        recentlyViewedArtworksConnection(first: 20) {
          edges {
            node {
              id
              ...FillwidthItem_artwork @relay(mask: false)
            }
          }
        }
      }
    `,
  }
)

export const RecentlyViewedQueryRenderer = () => {
  const { user, relayEnvironment } = useContext(SystemContext)
  if (!user) {
    return null
  }
  return (
    <QueryRenderer<RecentlyViewedQuery>
      environment={relayEnvironment}
      variables={{}}
      query={graphql`
        query RecentlyViewedQuery {
          me {
            ...RecentlyViewed_me
          }
        }
      `}
      render={renderWithLoadProgress(RecentlyViewedFragmentContainer)}
    />
  )
}

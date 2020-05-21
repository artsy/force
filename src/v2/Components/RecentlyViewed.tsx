import { ContextModule } from "@artsy/cohesion"
import { Box, Separator, Serif, Spacer } from "@artsy/palette"
import { RecentlyViewed_me } from "v2/__generated__/RecentlyViewed_me.graphql"
import { RecentlyViewedQuery } from "v2/__generated__/RecentlyViewedQuery.graphql"
import { SystemContext, SystemContextConsumer } from "v2/Artsy"
import { track } from "v2/Artsy/Analytics"
import * as Schema from "v2/Artsy/Analytics/Schema"
import { renderWithLoadProgress } from "v2/Artsy/Relay/renderWithLoadProgress"
import { SystemQueryRenderer as QueryRenderer } from "v2/Artsy/Relay/SystemQueryRenderer"
import { FillwidthItem } from "v2/Components/Artwork/FillwidthItem"
import { ArrowButton, Carousel } from "v2/Components/Carousel"
import React, { useContext } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import styled from "styled-components"
import { get } from "v2/Utils/get"

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
              <React.Fragment>
                <Separator my={6} />

                <Serif size="6">Recently viewed</Serif>

                <Spacer mb={3} />

                <Carousel
                  data={me.recentlyViewedArtworksConnection.edges}
                  render={artwork => {
                    const aspect_ratio = get(
                      artwork,
                      w => w.node.image.aspect_ratio,
                      1
                    )

                    return (
                      <FillwidthItem
                        lazyLoad={true}
                        // @ts-ignore // TODO: Correct typing
                        artwork={artwork.node}
                        targetHeight={HEIGHT}
                        imageHeight={HEIGHT}
                        width={HEIGHT * aspect_ratio}
                        margin={10}
                        user={user}
                        mediator={mediator}
                        onClick={this.trackClick.bind(this)}
                        contextModule={ContextModule.recentlyViewedRail}
                      />
                    )
                  }}
                  renderLeftArrow={({ Arrow }) => {
                    return (
                      <ArrowContainer>
                        <Arrow />
                      </ArrowContainer>
                    )
                  }}
                  renderRightArrow={({ Arrow }) => {
                    return (
                      <ArrowContainer>
                        {me.recentlyViewedArtworksConnection.edges.length >
                          4 && <Arrow />}
                      </ArrowContainer>
                    )
                  }}
                />
              </React.Fragment>
            )
          )
        }}
      </SystemContextConsumer>
    )
  }
}

const ArrowContainer = styled(Box)`
  align-self: flex-start;

  ${ArrowButton} {
    height: 60%;
  }
`

export const RecentlyViewedFragmentContainer = createFragmentContainer(
  RecentlyViewed,
  {
    me: graphql`
      fragment RecentlyViewed_me on Me {
        recentlyViewedArtworksConnection(first: 20) {
          edges {
            node {
              id
              image {
                aspect_ratio: aspectRatio
              }
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

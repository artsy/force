import { ContextModule } from "@artsy/cohesion"
import { Separator, Text } from "@artsy/palette"
import { RecentlyViewedV2_me } from "v2/__generated__/RecentlyViewedV2_me.graphql"
import { RecentlyViewedV2Query } from "v2/__generated__/RecentlyViewedV2Query.graphql"
import { SystemContext, SystemContextConsumer } from "v2/System"
import { track } from "v2/System/Analytics"
import * as Schema from "v2/System/Analytics/Schema"
import { SystemQueryRenderer as QueryRenderer } from "v2/System/Relay/SystemQueryRenderer"
import { FillwidthItem } from "v2/Components/Artwork/FillwidthItem"
import { Carousel } from "v2/Components/Carousel"
import React, { useContext } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { RecentlyViewedV2Placeholder } from "./RecentlyViewedV2Placeholder"

export interface RecentlyViewedV2Props {
  me: RecentlyViewedV2_me
}

export const HEIGHT = 180

@track({
  context_module: Schema.ContextModule.RecentlyViewedArtworks,
})
export class RecentlyViewedV2 extends React.Component<RecentlyViewedV2Props> {
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
                  {/* @ts-expect-error STRICT_NULL_CHECK */}
                  {me.recentlyViewedArtworksConnection.edges.map(artwork => {
                    return (
                      <FillwidthItem
                        // @ts-expect-error STRICT_NULL_CHECK
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

export const RecentlyViewedV2FragmentContainer = createFragmentContainer(
  RecentlyViewedV2,
  {
    me: graphql`
      fragment RecentlyViewedV2_me on Me {
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

export const RecentlyViewedV2QueryRenderer = () => {
  const { user, relayEnvironment } = useContext(SystemContext)

  if (!user) return null

  return (
    <QueryRenderer<RecentlyViewedV2Query>
      environment={relayEnvironment}
      query={graphql`
        query RecentlyViewedV2Query {
          me {
            ...RecentlyViewedV2_me
          }
        }
      `}
      render={({ error, props }) => {
        if (error) {
          console.error(error)
          return null
        }

        if (!props || !props.me) {
          return <RecentlyViewedV2Placeholder />
        }

        return <RecentlyViewedV2FragmentContainer me={props.me} />
      }}
    />
  )
}

import { Box, Spinner, Theme } from "@artsy/palette"
import { ArtistArtworksFilters } from "v2/__generated__/WorksForYouQuery.graphql"
import { WorksForYouQuery } from "v2/__generated__/WorksForYouQuery.graphql"
import { MarketingHeader } from "v2/Apps/WorksForYou/MarketingHeader"
import { SystemContextConsumer, SystemContextProps } from "v2/System"
import { track } from "v2/System/Analytics"
import { SystemQueryRenderer } from "v2/System/Relay/SystemQueryRenderer"
import { Component } from "react"
import { graphql } from "react-relay"
import styled from "styled-components"
import Events from "v2/Utils/Events"
import { WorksForYouArtistFeedPaginationContainer as WorksForYouArtistFeed } from "./WorksForYouArtistFeed"
import { WorksForYouFeedPaginationContainer as WorksForYouFeed } from "./WorksForYouFeed"

export interface Props extends SystemContextProps {
  artistID?: string
  forSale?: boolean
}

// @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
@track(null, {
  dispatch: data => Events.postEvent(data),
})
export class WorksForYou extends Component<Props> {
  static defaultProps = {
    forSale: true,
    artistID: "",
  }

  render() {
    const { artistID, forSale } = this.props
    const includeSelectedArtist = !!artistID
    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
    const filter: ArtistArtworksFilters[] = forSale ? ["IS_FOR_SALE"] : null

    return (
      <Theme>
        <SystemContextConsumer>
          {({ relayEnvironment, user }) => {
            return (
              <>
                <MarketingHeader />

                <SystemQueryRenderer<WorksForYouQuery>
                  environment={relayEnvironment}
                  query={graphql`
                    query WorksForYouQuery(
                      $includeSelectedArtist: Boolean!
                      $artistID: String!
                      $forSale: Boolean
                      $filter: [ArtistArtworksFilters]
                    ) {
                      viewer {
                        ...WorksForYouFeed_viewer
                          @skip(if: $includeSelectedArtist)
                          @arguments(forSale: $forSale)
                        ...WorksForYouArtistFeed_viewer
                          @include(if: $includeSelectedArtist)
                          @arguments(artistID: $artistID, filter: $filter)
                      }
                    }
                  `}
                  variables={{
                    artistID,
                    includeSelectedArtist,
                    forSale,
                    filter,
                  }}
                  render={({ props }) => {
                    if (props) {
                      return (
                        <Box pt={3} pb={3}>
                          {includeSelectedArtist ? (
                            <WorksForYouArtistFeed
                              // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
                              artistID={this.props.artistID}
                              viewer={props.viewer!}
                              forSale={forSale}
                              user={user}
                            />
                          ) : (
                            <WorksForYouFeed
                              user={user}
                              viewer={props.viewer!}
                            />
                          )}
                        </Box>
                      )
                    } else {
                      return (
                        <SpinnerContainer>
                          <Spinner />
                        </SpinnerContainer>
                      )
                    }
                  }}
                />
              </>
            )
          }}
        </SystemContextConsumer>
      </Theme>
    )
  }
}

const SpinnerContainer = styled.div`
  width: 100%;
  height: 100px;
  position: relative;
`

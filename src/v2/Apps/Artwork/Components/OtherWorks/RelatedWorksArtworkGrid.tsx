import { Box, Spinner, Tab, Tabs } from "@artsy/palette"
import { RelatedWorksArtworkGrid_artwork } from "v2/__generated__/RelatedWorksArtworkGrid_artwork.graphql"
import { RelatedWorksArtworkGridQuery } from "v2/__generated__/RelatedWorksArtworkGridQuery.graphql"
import { hideGrid } from "v2/Apps/Artwork/Components/OtherWorks"
import { Header } from "v2/Apps/Artwork/Components/OtherWorks/Header"
import { Mediator, SystemContext, withSystemContext } from "v2/Artsy"
import { track } from "v2/Artsy/Analytics"
import * as Schema from "v2/Artsy/Analytics/Schema"
import { renderWithLoadProgress } from "v2/Artsy/Relay/renderWithLoadProgress"
import ArtworkGrid from "v2/Components/ArtworkGrid"
import { take } from "lodash"
import React, { useContext } from "react"
import styled from "styled-components"
import createLogger from "v2/Utils/logger"

import { ContextModule } from "@artsy/cohesion"
import { SystemQueryRenderer as QueryRenderer } from "v2/Artsy/Relay/SystemQueryRenderer"
import { createRefetchContainer, graphql, RelayRefetchProp } from "react-relay"
import { get } from "v2/Utils/get"

const logger = createLogger("RelatedWorksArtworkGrid.tsx")

const MAX_TAB_ITEMS = 3

interface RelatedWorksArtworkGridProps {
  relay: RelayRefetchProp
  artwork: RelatedWorksArtworkGrid_artwork
  mediator?: Mediator
}

interface RelatedWorksArtworkGridState {
  isLoading: boolean
}

@track({
  context_module: Schema.ContextModule.RelatedWorks,
})
class RelatedWorksArtworkGrid extends React.Component<
RelatedWorksArtworkGridProps,
RelatedWorksArtworkGridState
> {
  state = {
    isLoading: false,
  }

  handleTabClick = (tab: { data: { layerId: string } }) => {
    this.setState({ isLoading: true })

    this.props.relay.refetch(
      {
        layerId: tab.data.layerId,
        artworkSlug: this.props.artwork.slug,
      },
      null,
      error => {
        this.setState({
          isLoading: false,
        })
        if (error) {
          logger.error(error)
        }
      }
    )
  }

  @track({
    type: Schema.Type.ArtworkBrick,
    action_type: Schema.ActionType.Click,
  })
  trackBrickClick() {
    // noop
  }

  render() {
    const {
      artwork: { layers, layer },
      mediator,
    } = this.props

    // The layer might have failed to fetch, so we use the `get` helper
    // instead of ordinary destructuring.
    const artworksConnection = get(layer, l => l.artworksConnection)

    if (hideGrid(artworksConnection)) {
      return null
    }

    // For sale artworks are already rendered on the page so we filter them from related works
    const names = take(
      layers.filter(l => l.name !== "For Sale"),
      MAX_TAB_ITEMS
    )

    if (!names.length) {
      return <></>
    }

    return (
      <Box data-test={ContextModule.relatedWorksRail}>
        <Header title="Related works" />
        <Tabs justifyContent="center" onChange={this.handleTabClick}>
          {names.map(({ name, internalID }, key) => {
            return (
              <Tab name={name} key={key} data={{ layerId: internalID }}>
                <ArtworksContainer>
                  {this.state.isLoading ? (
                    <Spinner />
                  ) : (
                      <ArtworkGrid
                        contextModule={ContextModule.relatedWorksRail}
                        artworks={artworksConnection}
                        columnCount={[2, 3, 4]}
                        preloadImageCount={0}
                        mediator={mediator}
                        onBrickClick={this.trackBrickClick.bind(this)}
                      />
                    )}
                </ArtworksContainer>
              </Tab>
            )
          })}
        </Tabs>
      </Box>
    )
  }
}

export const RelatedWorksArtworkGridRefetchContainer = createRefetchContainer<
  RelatedWorksArtworkGridProps
>(
  withSystemContext(RelatedWorksArtworkGrid),
  {
    artwork: graphql`
      fragment RelatedWorksArtworkGrid_artwork on Artwork
        @argumentDefinitions(layerId: { type: "String" }) {
        layers {
          name
          internalID
        }
        slug
        layer(id: $layerId) {
          name
          artworksConnection(first: 8) {
            ...ArtworkGrid_artworks
            # Used to check for content
            edges {
              node {
                slug
              }
            }
          }
        }
      }
    `,
  },
  graphql`
    query RelatedWorksArtworkGridRefetchQuery(
      $artworkSlug: String!
      $layerId: String!
    ) {
      artwork(id: $artworkSlug) {
        ...RelatedWorksArtworkGrid_artwork @arguments(layerId: $layerId)
      }
    }
  `
)

// FIXME: Move to storybooks

export const RelatedWorksArtworkGridQueryRenderer: React.SFC<{
  artworkSlug: string
}> = ({ artworkSlug }) => {
  const { relayEnvironment } = useContext(SystemContext)

  return (
    <QueryRenderer<RelatedWorksArtworkGridQuery>
      environment={relayEnvironment}
      variables={{
        artworkSlug,
      }}
      query={graphql`
        query RelatedWorksArtworkGridQuery($artworkSlug: String!) {
          artwork(id: $artworkSlug) {
            ...RelatedWorksArtworkGrid_artwork
          }
        }
      `}
      render={renderWithLoadProgress(RelatedWorksArtworkGridRefetchContainer)}
    />
  )
}

// Set min-height so that spinner doesn't collapse area on tab switch
const ArtworksContainer = styled.div`
  position: relative;
  min-height: 500px;
`

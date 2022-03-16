import { Box, Spacer, Spinner, Tab, Tabs } from "@artsy/palette"
import { RelatedWorksArtworkGrid_artwork } from "v2/__generated__/RelatedWorksArtworkGrid_artwork.graphql"
import { hideGrid } from "v2/Apps/Artwork/Components/OtherWorks"
import { Header } from "v2/Apps/Artwork/Components/OtherWorks/Header"
import { withSystemContext } from "v2/System"
import { track } from "v2/System/Analytics"
import * as Schema from "v2/System/Analytics/Schema"
import ArtworkGrid from "v2/Components/ArtworkGrid"
import { take } from "lodash"
import { Component } from "react"
import styled from "styled-components"
import createLogger from "v2/Utils/logger"
import { ContextModule } from "@artsy/cohesion"
import { RelayRefetchProp, createRefetchContainer, graphql } from "react-relay"
import { get } from "v2/Utils/get"
import { Mediator } from "lib/mediator"

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
class RelatedWorksArtworkGrid extends Component<
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
    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
    const artworksConnection = get(layer, l => l.artworksConnection)

    if (hideGrid(artworksConnection)) {
      return null
    }

    // For sale artworks are already rendered on the page so we filter them from related works
    const names = take(
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      layers.filter(l => l.name !== "For Sale"),
      MAX_TAB_ITEMS
    )

    if (!names.length) {
      return <></>
    }

    return (
      <Box data-test={ContextModule.relatedWorksRail}>
        <Header title="Related works" />

        <Spacer mt={4} />

        {/* @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION */}
        <Tabs onChange={this.handleTabClick}>
          {/* @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION */}
          {names.map(({ name, internalID }, key) => {
            return (
              <Tab name={name} key={key} data={{ layerId: internalID }}>
                <ArtworksContainer>
                  {this.state.isLoading ? (
                    <Spinner /> // Should be a placeholder
                  ) : (
                    <ArtworkGrid
                      contextModule={ContextModule.relatedWorksRail}
                      artworks={artworksConnection}
                      columnCount={[2, 3, 4, 4]}
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

// Set min-height so that spinner doesn't collapse area on tab switch
const ArtworksContainer = styled.div`
  position: relative;
  min-height: 500px;
`

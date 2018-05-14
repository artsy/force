import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Artwork as ReactionArtwork } from '@artsy/reaction/dist/Components/Artwork'
import { ArtworkGrid as ReactionArtworkGrid } from '@artsy/reaction/dist/Components/ArtworkGrid'
import { ContextProvider } from '@artsy/reaction/dist/Components/Artsy'
import { Help } from '@artsy/reaction/dist/Assets/Icons/Help'
import { Tooltip } from '@artsy/reaction/dist/Components/Tooltip'
import { data as sd } from 'sharify'

export const TooltipQuestion = props => {
  return (
    <Tooltip {...props}>
      <Help />
    </Tooltip>
  )
}

export class ArtworkGrid extends Component {
  static propTypes = {
    artworks: PropTypes.array.isRequired,
  }

  constructor(props) {
    super(props)

    this.state = {
      artworks: props.artworks || [],
    }

    // NOTE: Reaction's ArtworkGrid has its own conception of infinite scroll
    // which is enabled when `onLoadMore` is passed in. Since we're detecting
    // scroll thresholds from backbone and thus externally, this callback can
    // be used instead. See desktop/components/artwork_masonry/view.coffee for
    // an example implementation
    if (props.onAppendArtworks) {
      props.onAppendArtworks(this.appendArtworks)
    }
  }

  appendArtworks = artworks => {
    this.setState({
      artworks,
    })
  }

  render() {
    const artworks = mapToRelayConnection(this.state.artworks)

    return (
      <ContextProvider currentUser={sd.CURRENT_USER}>
        <ReactionArtworkGrid
          {...this.props}
          artworks={artworks}
          useRelay={false}
        />
      </ContextProvider>
    )
  }
}

export const Fillwidth = props => {
  if (typeof window !== 'undefined') {
    const {
      Fillwidth: ReactionFillWidth,
    } = require('@artsy/reaction/dist/Components/Artwork/Fillwidth')

    const artworks = mapToRelayConnection(props.artworks) // eslint-disable-line

    return (
      <ContextProvider currentUser={sd.CURRENT_USER}>
        <ReactionFillWidth {...props} artworks={artworks} useRelay={false} />
      </ContextProvider>
    )
  } else {
    return ''
  }
}

export const Artwork = props => {
  return (
    <ContextProvider currentUser={sd.CURRENT_USER}>
      <ReactionArtwork {...props} useRelay={false} />
    </ContextProvider>
  )
}

// Helpers

// Ensure that old artwork collections conform to new Relay connection api
const mapToRelayConnection = artworks => {
  return {
    edges: artworks.map(artwork => {
      return {
        node: artwork,
      }
    }),
  }
}

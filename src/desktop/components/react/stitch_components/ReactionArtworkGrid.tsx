import React, { Component } from "react"
import PropTypes from "prop-types"
import { mapToRelayConnection } from "./utils/mapToRelayConnection"
import { ArtworkGrid } from "reaction/Components/ArtworkGrid"

interface Props {
  artworks: any
  useRelay: boolean
}

interface State {
  artworks: object[]
}

export class ReactionArtworkGrid extends Component<Props, State> {
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

    return <ArtworkGrid {...this.props} artworks={artworks} useRelay={false} />
  }
}

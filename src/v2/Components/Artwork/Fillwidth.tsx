import { AuthContextModule } from "@artsy/cohesion"
import { Fillwidth_artworks } from "v2/__generated__/Fillwidth_artworks.graphql"
import { Mediator } from "v2/Artsy"
import { find } from "lodash"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import sizeMe from "react-sizeme"
import styled from "styled-components"
import fillwidthDimensions, {
  FillWidthItemDimensions,
} from "../../Utils/fillwidth"
import FillwidthItem from "./FillwidthItem"

interface Props extends React.HTMLAttributes<FillwidthContainer> {
  targetHeight?: number
  gutter?: number
  size?: any
  artworks: Fillwidth_artworks
  contextModule: AuthContextModule
  mediator?: Mediator
}

class FillwidthContainer extends React.Component<Props, null> {
  renderArtwork(
    artwork: Fillwidth_artworks["edges"][number]["node"],
    dimensions: FillWidthItemDimensions[],
    i: number
  ) {
    const { gutter, contextModule, mediator } = this.props
    const artworkSize = find(dimensions, ["id", artwork.id])

    return (
      <FillwidthItem
        artwork={artwork}
        contextModule={contextModule}
        key={"artwork--" + artwork.id}
        targetHeight={artworkSize.height}
        imageHeight={artworkSize.height}
        width={artworkSize.width}
        margin={i === dimensions.length - 1 ? 0 : gutter}
        mediator={mediator}
      />
    )
  }

  render() {
    const artworks = this.props.artworks.edges
    const dimensions = fillwidthDimensions(
      this.props.artworks.edges,
      this.props.size.width,
      this.props.gutter,
      this.props.targetHeight
    )
    return (
      <div className={this.props.className}>
        {artworks.map((artwork, i) =>
          this.renderArtwork(artwork.node, dimensions, i)
        )}
      </div>
    )
  }
}

const StyledFillwidth = styled(FillwidthContainer)`
  margin-bottom: 50px;
`

StyledFillwidth.defaultProps = {
  targetHeight: 180,
  gutter: 10,
}

const sizeMeOptions = {
  monitorHeight: false,
  refreshRate: 64,
  refreshMode: "debounce",
}

export const Fillwidth = sizeMe(sizeMeOptions)(
  StyledFillwidth
) as React.StatelessComponent<Props>

export default createFragmentContainer(Fillwidth, {
  artworks: graphql`
    fragment Fillwidth_artworks on ArtworkConnection {
      edges {
        node {
          id
          image {
            aspect_ratio: aspectRatio
          }
          ...FillwidthItem_artwork
        }
      }
    }
  `,
})

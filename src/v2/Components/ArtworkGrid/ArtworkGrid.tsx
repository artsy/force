import { AuthContextModule, ContextModule } from "@artsy/cohesion"
import { Flex } from "@artsy/palette"
import { ArtworkGrid_artworks$data } from "v2/__generated__/ArtworkGrid_artworks.graphql"
import { ArtworkGridEmptyState } from "v2/Components/ArtworkGrid/ArtworkGridEmptyState"
import { isEqual } from "lodash"
import memoizeOnce from "memoize-one"
import { ReactNode } from "react"
import * as React from "react"
import ReactDOM from "react-dom"
// @ts-ignore
import { ComponentRef, createFragmentContainer, graphql } from "react-relay"
import styled from "styled-components"
import { Media, valuesWithBreakpointProps } from "v2/Utils/Responsive"
import GridItem from "../Artwork/GridItem"

type SectionedArtworks = Array<
  // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
  Array<ArtworkGrid_artworks$data["edges"][0]["node"]>
>

// @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
type Artwork = ArtworkGrid_artworks$data["edges"][0]["node"]

export interface ArtworkGridProps
  extends React.HTMLProps<ArtworkGridContainer> {
  artworks: ArtworkGrid_artworks$data
  contextModule?: AuthContextModule
  columnCount?: number | number[]
  preloadImageCount?: number
  itemMargin?: number
  onBrickClick?: (artwork: Artwork, artworkIndex: number) => void
  onClearFilters?: () => any
  onLoadMore?: () => any
  sectionMargin?: number
  user?: User
  emptyStateComponent?: ReactNode | boolean
}

export interface ArtworkGridContainerState {
  loading: boolean
  interval: any
}

export class ArtworkGridContainer extends React.Component<
  ArtworkGridProps,
  ArtworkGridContainerState
> {
  static defaultProps = {
    columnCount: [3],
    sectionMargin: 20,
    itemMargin: 20,
    preloadImageCount: 0,
  }

  state = {
    interval: null,
    loading: false,
  }

  private get _columnCount(): number[] {
    const columnCount = this.props.columnCount
    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
    return typeof columnCount === "number" ? [columnCount] : columnCount
  }

  componentDidMount() {
    if (this.props.onLoadMore) {
      const interval = setInterval(() => {
        this.maybeLoadMore()
      }, 150)
      this.setState({ interval })
    }
  }

  componentWillUnmount() {
    if (this.state.interval) {
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      clearInterval(this.state.interval)
    }
  }

  columnBreakpointProps = memoizeOnce(
    (columnCount: number[]) => valuesWithBreakpointProps(columnCount),
    isEqual
  )

  // TODO: This will still re-calculate column layout from scratch when new
  //       artworks are added (paginated). Ideally it would just continue
  //       calculations from where it finished last time.
  sectionedArtworksForAllBreakpoints: (
    artworks: ArtworkGrid_artworks$data,
    columnCount: number[]
  ) => SectionedArtworks[] = memoizeOnce(
    (artworks, columnCount) =>
      columnCount.map(n => createSectionedArtworks(artworks, n)),
    areSectionedArtworksEqual
  )

  maybeLoadMore() {
    const threshold = window.innerHeight + window.scrollY
    const el = ReactDOM.findDOMNode(this) as Element
    if (threshold >= el.clientHeight + el.scrollTop) {
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      this.props.onLoadMore()
    }
  }

  renderSectionsForSingleBreakpoint(
    columnCount: number,
    sectionedArtworks: SectionedArtworks
  ) {
    const { contextModule, preloadImageCount } = this.props
    const spacerStyle = {
      height: this.props.itemMargin,
    }
    const sections = []

    for (let column = 0; column < columnCount; column++) {
      const artworkComponents = []
      for (let row = 0; row < sectionedArtworks[column].length; row++) {
        /**
         * The position of the image in the grid represented
         * by counting left to right, top to bottom.
         *
         * Here's a stackoverflow explaining the math: https://stackoverflow.com/questions/1730961/convert-a-2d-array-index-into-a-1d-index
         */
        const artworkIndex = row * columnCount + column
        const artwork = sectionedArtworks[column][row]

        artworkComponents.push(
          // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
          <GridItem
            contextModule={contextModule}
            artwork={artwork}
            key={artwork.id}
            // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
            lazyLoad={artworkIndex >= preloadImageCount}
            onClick={() => {
              if (this.props.onBrickClick) {
                this.props.onBrickClick(artwork, artworkIndex)
              }
            }}
          />
        )
        // Setting a marginBottom on the artwork component didn’t work, so using a spacer view instead.
        if (row < sectionedArtworks[column].length - 1) {
          artworkComponents.push(
            // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
            <div style={spacerStyle} key={"spacer-" + row + "-" + artwork.id} />
          )
        }
      }

      const sectionSpecificStyle = {
        flex: 1,
        minWidth: 0,
        marginRight: column === columnCount - 1 ? 0 : this.props.sectionMargin,
      }

      sections.push(
        // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
        <div style={sectionSpecificStyle} key={column}>
          {artworkComponents}
        </div>
      )
    }
    return sections
  }

  renderSectionsForAllBreakpoints() {
    const columnCount = this._columnCount

    // Only 1 column ever, so no need to wrap.
    if (this._columnCount.length === 1) {
      return this.renderSectionsForSingleBreakpoint(
        columnCount[0],
        this.sectionedArtworksForAllBreakpoints(
          this.props.artworks,
          columnCount
        )[0]
      )
    }

    const columnBreakpointProps = this.columnBreakpointProps(columnCount)
    const sectionedArtworksForAllBreakpoints = this.sectionedArtworksForAllBreakpoints(
      this.props.artworks,
      columnBreakpointProps.map(([n]) => n)
    )

    return columnBreakpointProps.map(([count, props], i) => (
      // We always create all Media instances, so using i as key is fine.
      <Media {...props} key={i}>
        {(className, renderChildren) => (
          <InnerContainer className={className}>
            {renderChildren &&
              this.renderSectionsForSingleBreakpoint(
                count,
                sectionedArtworksForAllBreakpoints[i]
              )}
          </InnerContainer>
        )}
      </Media>
    ))
  }

  render() {
    const {
      artworks,
      className,
      onClearFilters,
      emptyStateComponent,
    } = this.props

    const hasArtworks = artworks && artworks.edges && artworks.edges.length > 0
    const artworkGrids = this.renderSectionsForAllBreakpoints()
    const emptyState = emptyStateComponent || (
      <ArtworkGridEmptyState onClearFilters={onClearFilters} />
    )

    return (
      <div className={className} data-test={ContextModule.artworkGrid}>
        {hasArtworks ? artworkGrids : emptyState}
      </div>
    )
  }
}

export const ArtworkGrid = styled(ArtworkGridContainer)`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`

const InnerContainer = styled(Flex)`
  width: 100%;
`

export default createFragmentContainer(ArtworkGrid, {
  artworks: graphql`
    fragment ArtworkGrid_artworks on ArtworkConnectionInterface {
      edges {
        node {
          id
          slug
          href
          internalID
          image {
            aspect_ratio: aspectRatio
          }
          ...GridItem_artwork
        }
      }
    }
  `,
})

/**
 * Performs a shallow equal of artworks.
 */
function areSectionedArtworksEqual(current: any, previous: any) {
  if (Array.isArray(current)) {
    return isEqual(current, previous)
  } else {
    const currentEdges = (current as ArtworkGrid_artworks$data).edges
    const previousEdges = (previous as ArtworkGrid_artworks$data).edges
    return (
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      currentEdges.length === previousEdges.length &&
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      currentEdges.every((e, i) => e.node.id === previousEdges[i].node.id)
    )
  }
}

export function createSectionedArtworks(
  artworksConnection: ArtworkGrid_artworks$data,
  columnCount: number
): SectionedArtworks {
  const sectionedArtworks: SectionedArtworks = []
  const sectionRatioSums = []
  const artworks = artworksConnection ? artworksConnection.edges : []

  for (let i = 0; i < columnCount; i++) {
    sectionedArtworks.push([])
    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
    sectionRatioSums.push(0)
  }

  // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
  artworks.forEach(artworkEdge => {
    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
    const artwork = artworkEdge.node

    // There are artworks without images and other ‘issues’. Like Force we’re just going to reject those for now.
    // See: https://github.com/artsy/eigen/issues/1667
    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
    if (artwork.image) {
      // Find section with lowest *inverted* aspect ratio sum, which is the shortest column.
      let lowestRatioSum = Number.MAX_VALUE
      let sectionIndex = null
      for (let j = 0; j < sectionRatioSums.length; j++) {
        const ratioSum = sectionRatioSums[j]
        if (ratioSum < lowestRatioSum) {
          // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
          sectionIndex = j
          lowestRatioSum = ratioSum
        }
      }

      if (sectionIndex != null) {
        const section = sectionedArtworks[sectionIndex]
        section.push(artwork)

        // Keep track of total section aspect ratio
        // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
        const aspectRatio = artwork.image.aspect_ratio || 1 // Ensure we never divide by null/0
        // Invert the aspect ratio so that a lower value means a shorter section.
        // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
        sectionRatioSums[sectionIndex] += 1 / aspectRatio
      }
    }
  })

  return sectionedArtworks
}

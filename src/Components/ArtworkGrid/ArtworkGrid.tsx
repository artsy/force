import type { AuthContextModule } from "@artsy/cohesion"
import { Column, Flex, GridColumns, Spacer } from "@artsy/palette"
import {
  FlatGridItemFragmentContainer,
  FlatGridItemPlaceholder,
} from "Components/Artwork/FlatGridItem"
import GridItem, {
  ArtworkGridItemPlaceholder,
  DEFAULT_GRID_ITEM_ASPECT_RATIO,
} from "Components/Artwork/GridItem"
import { ArtworkGridEmptyState } from "Components/ArtworkGrid/ArtworkGridEmptyState"
import { Masonry, type MasonryProps } from "Components/Masonry"
import { Media, valuesWithBreakpointProps } from "Utils/Responsive"
import { extractNodes } from "Utils/extractNodes"
import type { ExtractNodeType } from "Utils/typeSupport"
import type { ArtworkGrid_artworks$data } from "__generated__/ArtworkGrid_artworks.graphql"
import type { MyCollectionArtworkGrid_artworks$data } from "__generated__/MyCollectionArtworkGrid_artworks.graphql"
import isEmpty from "lodash/isEmpty"
import isEqual from "lodash/isEqual"
import memoizeOnce from "memoize-one"
import * as React from "react"
import { type ReactNode, useMemo } from "react"
import ReactDOM from "react-dom"
import { createFragmentContainer, graphql } from "react-relay"
import styled from "styled-components"
import { withArtworkGridContext } from "./ArtworkGridContext"

type Artworks =
  | ArtworkGrid_artworks$data
  | MyCollectionArtworkGrid_artworks$data
type Artwork = ExtractNodeType<Artworks>
type SectionedArtworks = Array<Array<Artwork>>

export type ArtworkGridLayout = "GRID" | "MASONRY"

interface ArtworkGridProps {
  artworks: Artworks
  contextModule?: AuthContextModule
  columnCount?: number | number[]
  hideSaleInfo?: boolean
  preloadImageCount?: number
  itemMargin?: number
  layout?: ArtworkGridLayout
  onBrickClick?: (artwork: Artwork, artworkIndex: number) => void
  onClearFilters?: () => any
  onLoadMore?: () => any
  sectionMargin?: number
  showArtworksWithoutImages?: boolean
  showHighDemandIcon?: boolean
  showHoverDetails?: boolean
  showSaveButton?: boolean
  showSubmissionStatus?: boolean
  user?: User
  emptyStateComponent?: ReactNode | boolean
  to?: (artwork: Artwork) => string | null
  savedListId?: string
  renderSaveButton?: (artworkId: string) => React.ReactNode
  popoverContent?: ReactNode | null
  onPopoverDismiss?: () => void
  className?: string
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
    layout: "MASONRY",
  }

  state = {
    interval: null,
    loading: false,
  }

  private get _columnCount(): number[] {
    const columnCount = this.props.columnCount

    if (typeof columnCount === "number") {
      return [columnCount]
    }
    return Array.isArray(columnCount) ? columnCount : []
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
      clearInterval(this.state.interval)
    }
  }

  columnBreakpointProps = memoizeOnce(
    (columnCount: number[]) => valuesWithBreakpointProps(columnCount),
    isEqual,
  )

  // TODO: This will still re-calculate column layout from scratch when new
  //       artworks are added (paginated). Ideally it would just continue
  //       calculations from where it finished last time.
  sectionedArtworksForAllBreakpoints: (
    artworks: Artworks,
    columnCount: number[],
  ) => SectionedArtworks[] = memoizeOnce(
    (artworks, columnCount) =>
      columnCount.map(n =>
        createSectionedArtworks(
          artworks,
          n,
          this.props.showArtworksWithoutImages,
        ),
      ),
    areSectionedArtworksEqual,
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
    sectionedArtworks: SectionedArtworks,
  ) {
    const {
      contextModule,
      hideSaleInfo,
      preloadImageCount,
      showHighDemandIcon,
      showHoverDetails,
      showSaveButton,
      showSubmissionStatus,
      to,
    } = this.props
    const spacerStyle = {
      height: this.props.itemMargin,
    }
    const sections = []

    // applicable only for My Collection grid: we want to show the popover only for the first P1 artwork
    const firstP1Artwork = extractNodes(this.props.artworks).find(
      artwork => (artwork as any)?.artist?.targetSupply?.priority === "TRUE",
    )

    for (let column = 0; column < columnCount; column++) {
      const artworkComponents: React.ReactNode[] = []
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
          <GridItem
            contextModule={contextModule}
            artwork={artwork}
            hideSaleInfo={hideSaleInfo}
            key={artwork.id}
            lazyLoad={
              !!(
                typeof preloadImageCount === "number" &&
                artworkIndex >= preloadImageCount
              )
            }
            onClick={() => {
              if (this.props.onBrickClick) {
                this.props.onBrickClick(artwork, artworkIndex)
              }
            }}
            showHighDemandIcon={showHighDemandIcon}
            showHoverDetails={
              showHoverDetails === undefined ? true : showSaveButton
            }
            showSaveButton={
              showSaveButton === undefined ? true : showSaveButton
            }
            to={to?.(artwork)}
            savedListId={this.props.savedListId}
            renderSaveButton={this.props.renderSaveButton}
            popoverContent={
              firstP1Artwork?.id === artwork.id
                ? this.props.popoverContent
                : null
            }
            onPopoverDismiss={this.props.onPopoverDismiss}
            showSubmissionStatus={showSubmissionStatus}
          />,
        )
        // Setting a marginBottom on the artwork component didn’t work, so using a spacer view instead.
        if (row < sectionedArtworks[column].length - 1) {
          const safeRow = row ?? "default-row"
          const safeArtworkId = artwork.id ?? "default-id"

          artworkComponents.push(
            <div
              style={spacerStyle}
              key={`spacer-${safeRow}-${safeArtworkId}`}
            />,
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
        </div>,
      )
    }
    return sections
  }

  renderArtworkGrid() {
    const { artworks } = this.props
    const nodes = extractNodes(artworks)

    return (
      <GridColumns width="100%">
        {nodes.map((artwork, index) => {
          return (
            <Column span={[6, 3]} key={artwork.internalID} minWidth={0}>
              <FlatGridItemFragmentContainer
                onClick={() => {
                  if (this.props.onBrickClick) {
                    this.props.onBrickClick(artwork, index)
                  }
                }}
                artwork={artwork}
              />
            </Column>
          )
        })}
      </GridColumns>
    )
  }

  renderMasonrySectionsForAllBreakpoints() {
    const columnCount = this._columnCount

    // Only 1 column ever, so no need to wrap.
    if (this._columnCount.length === 1) {
      return this.renderSectionsForSingleBreakpoint(
        columnCount[0],
        this.sectionedArtworksForAllBreakpoints(
          this.props.artworks,
          columnCount,
        )[0],
      )
    }

    const columnBreakpointProps = this.columnBreakpointProps(columnCount)
    const sectionedArtworksForAllBreakpoints =
      this.sectionedArtworksForAllBreakpoints(
        this.props.artworks,
        columnBreakpointProps.map(([n]) => n),
      )

    return columnBreakpointProps.map(([count, props], i) => (
      // We always create all Media instances, so using i as key is fine.
      <Media {...props} key={i}>
        {(className: string, renderChildren: boolean) => {
          return (
            <InnerContainer className={className}>
              {renderChildren &&
                this.renderSectionsForSingleBreakpoint(
                  count,
                  sectionedArtworksForAllBreakpoints[i],
                )}
            </InnerContainer>
          )
        }}
      </Media>
    ))
  }

  render() {
    const { artworks, className, onClearFilters, emptyStateComponent } =
      this.props

    const hasArtworks = !isEmpty(artworks?.edges)
    let artworkGrids

    if (this.props.layout === "GRID") {
      artworkGrids = this.renderArtworkGrid()
    } else {
      artworkGrids = this.renderMasonrySectionsForAllBreakpoints()
    }

    const emptyState = emptyStateComponent || (
      <ArtworkGridEmptyState onClearFilters={onClearFilters} />
    )

    return (
      <div className={className} data-test="artworkGrid">
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

export default createFragmentContainer(withArtworkGridContext(ArtworkGrid), {
  artworks: graphql`
    fragment ArtworkGrid_artworks on ArtworkConnectionInterface
    @argumentDefinitions(
      includeAllImages: { type: "Boolean", defaultValue: false }
    ) {
      edges {
        node {
          id
          slug
          href
          internalID
          image(includeAll: $includeAllImages) {
            aspectRatio
          }
          ...GridItem_artwork
          ...FlatGridItem_artwork
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
    const currentEdges = (current as Artworks).edges
    const previousEdges = (previous as Artworks).edges
    return (
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      currentEdges.length === previousEdges.length && // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      currentEdges.every((e, i) => e.node.id === previousEdges[i].node.id)
    )
  }
}

export function createSectionedArtworks(
  artworksConnection: Artworks,
  columnCount: number,
  showArtworksWithoutImages = false,
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
    const artwork = artworkEdge?.node

    if (!artwork) return

    // There are artworks without images and other ‘issues’. Like Force we’re just going to reject those for now.
    // See: https://github.com/artsy/eigen/issues/1667
    if (showArtworksWithoutImages || artwork.image) {
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
        const aspectRatio =
          artwork.image?.aspectRatio || DEFAULT_GRID_ITEM_ASPECT_RATIO // Ensure we never divide by null/0
        // Invert the aspect ratio so that a lower value means a shorter section.
        // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
        sectionRatioSums[sectionIndex] += 1 / aspectRatio
      }
    }
  })

  return sectionedArtworks
}

const PLACEHOLDER_DIMENSIONS = [
  [300, 400],
  [300, 375],
  [300, 200],
  [300, 450],
  [300, 300],
  [300, 400],
  [300, 380],
  [300, 300],
]

interface ArtworkGridPlaceholderProps extends MasonryProps {
  amount?: number
  layout?: ArtworkGridLayout
}

export const ArtworkGridPlaceholder: React.FC<
  React.PropsWithChildren<ArtworkGridPlaceholderProps>
> = ({ amount = 20, layout = "MASONRY", ...rest }) => {
  const nodes = useMemo(() => {
    return [...new Array(amount)].map((_, i) => {
      const [width, height] =
        PLACEHOLDER_DIMENSIONS[i % PLACEHOLDER_DIMENSIONS.length]

      return { width, height }
    })
  }, [amount])

  if (layout === "GRID") {
    return (
      <GridColumns width="100%">
        {nodes.map(({ width, height }, index) => {
          return (
            <Column span={[6, 3]} key={index} minWidth={0}>
              <FlatGridItemPlaceholder width={width} height={height} />
            </Column>
          )
        })}
      </GridColumns>
    )
  }

  return (
    <Masonry {...rest}>
      {nodes.map(({ width, height }, i) => {
        return (
          <div key={i}>
            <ArtworkGridItemPlaceholder width={width} height={height} />

            <Spacer y={4} />
          </div>
        )
      })}
    </Masonry>
  )
}

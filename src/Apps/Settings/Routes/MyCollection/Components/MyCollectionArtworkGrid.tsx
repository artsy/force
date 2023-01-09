import { AuthContextModule } from "@artsy/cohesion"
import { Flex } from "@artsy/palette"
import { ArtworkGridItemFragmentContainer } from "Components/Artwork/GridItem"
import {
  areSectionedArtworksEqual,
  createSectionedArtworks,
} from "Components/ArtworkGrid"
import { ArtworkGridEmptyState } from "Components/ArtworkGrid/ArtworkGridEmptyState"
import { isEmpty, isEqual } from "lodash"
import memoizeOnce from "memoize-one"
import * as React from "react"
import ReactDOM from "react-dom"
import { createFragmentContainer, graphql } from "react-relay"
import styled from "styled-components"
import { StoredImage } from "Utils/localImagesHelpers"
import { Media, valuesWithBreakpointProps } from "Utils/Responsive"
import { MyCollectionArtworkGrid_artworks$data } from "__generated__/MyCollectionArtworkGrid_artworks.graphql"

// @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
type Artwork = MyCollectionArtworkGrid_artworks$data["edges"][0]["node"]

type SectionedArtworks = Array<Array<Artwork>>

export interface MyCollectionArtworkGridProps
  extends React.HTMLProps<HTMLDivElement> {
  artworks: MyCollectionArtworkGrid_artworks$data
  contextModule?: AuthContextModule
  columnCount: number | number[]
  getLocalImageSrcByArtworkID: (artworkID: string) => StoredImage | null
  isCollectorProfileEnabled?: boolean | null
  preloadImageCount?: number
  itemMargin?: number
  onLoadMore?: () => any
  sectionMargin?: number
}

export interface ArtworkGridContainerState {
  loading: boolean
  interval: any
}

export class MyCollectionArtworkGridContainer extends React.Component<
  MyCollectionArtworkGridProps,
  ArtworkGridContainerState
> {
  static defaultProps = {
    columnCount: [3],
    sectionMargin: 20,
    isAuctionArtwork: false,
    itemMargin: 20,
    preloadImageCount: 0,
  }

  state = {
    interval: null,
    loading: false,
  }

  private get _columnCount(): number[] {
    const columnCount = this.props.columnCount
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
      // @ts-ignore
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
    artworks: MyCollectionArtworkGrid_artworks$data,
    columnCount: number[]
  ) => SectionedArtworks[] = memoizeOnce(
    (artworks, columnCount) =>
      columnCount.map(n => createSectionedArtworks(artworks, n, true)),
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
    const { getLocalImageSrcByArtworkID, preloadImageCount } = this.props
    const spacerStyle = {
      height: this.props.itemMargin,
    }
    const sections: JSX.Element[] = []

    for (let column = 0; column < columnCount; column++) {
      const artworkComponents: JSX.Element[] = []
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
          <ArtworkGridItemFragmentContainer
            key={artwork.id}
            artwork={artwork}
            localHeroImage={getLocalImageSrcByArtworkID(artwork.internalID)}
            hideSaleInfo
            lazyLoad={artworkIndex >= preloadImageCount!}
            showHighDemandIcon
            showHoverDetails={false}
            showSaveButton={false}
            to={
              this.props.isCollectorProfileEnabled
                ? `/collector-profile/my-collection/artwork/${artwork.internalID}`
                : `/my-collection/artwork/${artwork.internalID}`
            }
          />
        )
        // Setting a marginBottom on the artwork component didn’t work, so using a spacer view instead.
        if (row < sectionedArtworks[column].length - 1) {
          artworkComponents.push(
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
        <div style={sectionSpecificStyle} key={column}>
          {artworkComponents}
        </div>
      )
    }
    return sections
  }

  renderMasonrySectionsForAllBreakpoints() {
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
    const { artworks, className } = this.props

    const hasArtworks = !isEmpty(artworks?.edges)
    let artworkGrids

    artworkGrids = this.renderMasonrySectionsForAllBreakpoints()

    const emptyState = <ArtworkGridEmptyState />

    return (
      <div className={className} data-test="artworkGrid">
        {hasArtworks ? artworkGrids : emptyState}
      </div>
    )
  }
}

export const MyCollectionArtworkGrid = styled(MyCollectionArtworkGridContainer)`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`

const InnerContainer = styled(Flex)`
  width: 100%;
`

export default createFragmentContainer(MyCollectionArtworkGrid, {
  artworks: graphql`
    fragment MyCollectionArtworkGrid_artworks on MyCollectionConnection {
      edges {
        node {
          id
          slug
          href
          internalID
          image {
            aspectRatio
          }
          ...GridItem_artwork
        }
      }
    }
  `,
})

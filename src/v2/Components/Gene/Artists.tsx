import { Artists_gene } from "v2/__generated__/Artists_gene.graphql"
import { avantgarde } from "v2/Assets/Fonts"
import React from "react"
import {
  RelayPaginationProp,
  createPaginationContainer,
  graphql,
} from "react-relay"
import styled from "styled-components"
import Dropdown from "../ArtworkFilter/Dropdown"
import ForSaleCheckbox from "../ArtworkFilter/ForSaleCheckbox"
import { ButtonState } from "../Buttons/Default"
import Button from "../Buttons/Ghost"
import Spinner from "../Spinner"
import ArtistRow from "./ArtistRow"
import { Mediator } from "lib/mediator"
import { Clickable } from "@artsy/palette"

const PageSize = 10

interface Props {
  relay: RelayPaginationProp
  gene: Artists_gene
  onDropdownSelected: (slice: string, value: string) => void
  onForSaleToggleSelected: () => void
  mediator: Mediator
}

interface State {
  loading: boolean
}

const ArtistRowsContainer = styled.div`
  margin: 40px 0 20px;
`

const LoadMoreContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const LoadMoreButton = styled(Clickable)`
  font-family: ${avantgarde("s13")};
  cursor: pointer;
  text-transform: uppercase;
  border-bottom: 2px solid transparent;

  &:hover {
    border-bottom: 2px solid black;
  }
`

const SpinnerContainer = styled.div`
  width: 100%;
  height: 100px;
  position: relative;
`

const ArtistFilterButtons = styled.div`
  margin-right: 10px;

  button {
    height: 52px;
    padding: 16px;
  }
`

const FilterBar = styled.div`
  vertical-align: middle;
  text-align: center;

  > div {
    display: inline-block;
  }
`

export class Artists extends React.Component<Props, State> {
  state = {
    loading: false,
  }

  loadMoreArtists() {
    const hasMore = this.props.gene.artists.pageInfo.hasNextPage
    if (!this.state.loading && hasMore) {
      this.setState({ loading: true }, () => {
        this.props.relay.loadMore(PageSize, error => {
          this.setState({ loading: false })
        })
      })
    }
  }

  renderForSaleToggle() {
    return (
      <ForSaleCheckbox
        checked={false}
        onChange={this.props.onForSaleToggleSelected}
      />
    )
  }

  renderArtistFilter() {
    return (
      <ArtistFilterButtons>
        <span>By Artists:</span>
        <Button
          onClick={() => {
            return null
          }}
          state={ButtonState.Success}
        >
          All Artists
        </Button>
        <span>By Work:</span>
      </ArtistFilterButtons>
    )
  }

  renderArtistDropdown() {
    return this.props.gene.filter_aggregations.aggregations.map(aggregation => {
      return (
        <Dropdown
          aggregation={aggregation}
          key={aggregation.slice}
          selected={
            aggregation.slice && this.state[aggregation.slice.toLowerCase()]
          }
          onSelected={this.props.onDropdownSelected}
        />
      )
    })
  }

  render() {
    const artists = this.props.gene.artists

    const artistRows = artists.edges.map(edge => {
      return (
        <ArtistRow
          artist={edge.node}
          key={edge.node.id}
          mediator={this.props.mediator}
        />
      )
    })

    const loadMoreButton = (
      <LoadMoreContainer>
        <LoadMoreButton onClick={() => this.loadMoreArtists()}>
          Load More
        </LoadMoreButton>
      </LoadMoreContainer>
    )

    return (
      <div>
        <FilterBar>
          {this.renderArtistFilter()}
          {this.renderForSaleToggle()}
          {this.renderArtistDropdown()}
        </FilterBar>
        <ArtistRowsContainer>
          {artistRows}
          <SpinnerContainer>
            {this.state.loading ? <Spinner /> : ""}
          </SpinnerContainer>
          {artists &&
            artists.pageInfo.hasNextPage &&
            !this.state.loading &&
            loadMoreButton}
        </ArtistRowsContainer>
      </div>
    )
  }
}

export default createPaginationContainer(
  Artists,
  {
    gene: graphql`
      fragment Artists_gene on Gene
        @argumentDefinitions(
          aggregations: {
            type: "[ArtworkAggregation]"
            defaultValue: [MEDIUM, TOTAL, PRICE_RANGE, DIMENSION_RANGE]
          }
          count: { type: "Int", defaultValue: 10 }
          cursor: { type: "String", defaultValue: "" }
        ) {
        id
        artists: artistsConnection(first: $count, after: $cursor)
          @connection(key: "Artists_artists") {
          pageInfo {
            hasNextPage
          }
          edges {
            node {
              id
              ...ArtistRow_artist
            }
          }
        }
        filter_aggregations: filterArtworksConnection(
          aggregations: $aggregations
          size: 0
          includeMediumFilterInAggregation: true
        ) {
          ...TotalCount_filter_artworks
          aggregations {
            slice
            ...Dropdown_aggregation
          }
        }
      }
    `,
  },
  {
    direction: "forward",
    getConnectionFromProps(props) {
      return props.gene.artists
    },
    getFragmentVariables(prevVars, totalCount) {
      return {
        ...prevVars,
        count: totalCount,
      }
    },
    getVariables(props, { count, cursor }, fragmentVariables) {
      return {
        // in most cases, for variables other than connection filters like
        // `first`, `after`, etc. you may want to use the previous values.
        ...fragmentVariables,
        count,
        cursor,
        geneNodeID: props.gene.id,
      }
    },
    query: graphql`
      query ArtistsQuery(
        $geneNodeID: ID!
        $count: Int!
        $cursor: String
        $aggregations: [ArtworkAggregation]
      ) {
        node(id: $geneNodeID) {
          ...Artists_gene
            @arguments(
              count: $count
              cursor: $cursor
              aggregations: $aggregations
            )
        }
      }
    `,
  }
)

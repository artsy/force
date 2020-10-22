import React from "react"
import {
  RelayPaginationProp,
  createPaginationContainer,
  graphql,
} from "react-relay"
import styled from "styled-components"

import { ButtonState } from "../Buttons/Default"
import Button from "../Buttons/Ghost"

import Dropdown from "../ArtworkFilter/Dropdown"
import ForSaleCheckbox from "../ArtworkFilter/ForSaleCheckbox"

import Headline from "../ArtworkFilter/Headline"
import TotalCount from "../ArtworkFilter/TotalCount"

import BorderedPulldown from "../BorderedPulldown"

import { GeneArtworks_gene } from "v2/__generated__/GeneArtworks_gene.graphql"
import ArtworkGrid from "v2/Components/ArtworkGrid"
import { Filters } from "."
import Spinner from "../Spinner"
import { Mediator } from "lib/mediator"

interface Props extends Filters {
  gene: GeneArtworks_gene
  onDropdownSelected: (slice: string, value: string) => void
  onSortSelected: (sort: string) => void
  onForSaleToggleSelected: () => void
  onArtistModeToggleSelected: () => void
  sort?: string
  relay: RelayPaginationProp
  mediator: Mediator
}

interface State {
  loading: boolean
  page: number
}

const SpinnerContainer = styled.div`
  width: 100%;
  height: 100px;
  position: relative;
`

const PageSize = 10

const FilterBar = styled.div`
  vertical-align: middle;
  text-align: center;

  > div {
    display: inline-block;
  }
`

const SubFilterBar = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 40px 0 20px;
  align-items: center;
`

const ArtistFilterButtons = styled.div`
  margin-right: 10px;

  button {
    height: 52px;
    padding: 16px;
  }
`

export class GeneArtworks extends React.Component<Props, State> {
  private finishedPaginatingWithError = false

  state = {
    loading: false,
    page: 1,
  }

  loadMoreArtworks() {
    const hasMore = this.props.gene.filtered_artworks.pageInfo.hasNextPage
    const origLength = this.props.gene.filtered_artworks.edges.length
    if (hasMore && !this.state.loading && !this.finishedPaginatingWithError) {
      this.setState({ loading: true }, () => {
        this.props.relay.loadMore(PageSize, error => {
          if (error) {
            console.error(error)
          }
          // Check to see if we're at the max allowable page.
          const { page } = this.state
          if (page > 100) {
            console.error(`Finished paging: ${this.props.gene.slug}`)
            this.finishedPaginatingWithError = true
          }
          // Check to see if no new edges were received.
          const newLength = this.props.gene.filtered_artworks.edges.length
          const newHasMore = this.props.gene.filtered_artworks.pageInfo
            .hasNextPage
          if (newLength - origLength === 0 && newHasMore) {
            console.error(
              `No more records returned for gene: ${this.props.gene.slug}`
            )
            this.finishedPaginatingWithError = true
          }
          this.setState({ loading: false, page: page + 1 })
        })
      })
    }
  }

  renderDropdown() {
    const getSelected = slice => {
      if (slice === "price_range") return "priceRange"
      if (slice === "dimension_range") return "dimensionRange"
      return slice
    }
    return this.props.gene.filtered_artworks.aggregations.map(aggregation => {
      return (
        <Dropdown
          aggregation={aggregation}
          key={aggregation.slice}
          selected={
            aggregation.slice &&
            this.props[getSelected(aggregation.slice.toLowerCase())]
          }
          onSelected={this.props.onDropdownSelected}
        />
      )
    })
  }

  renderArtistsModeToggle() {
    return (
      <ArtistFilterButtons>
        <span>By Artists:</span>
        <Button
          onClick={this.props.onArtistModeToggleSelected}
          state={ButtonState.Default}
        >
          All Artists
        </Button>
        <span>By Work:</span>
      </ArtistFilterButtons>
    )
  }

  renderForSaleToggle() {
    return (
      <ForSaleCheckbox
        checked={this.props.forSale}
        onChange={this.props.onForSaleToggleSelected}
      />
    )
  }

  renderArtworks() {
    const pulldownOptions = [
      { val: "-partner_updated_at", name: "Recently Updated" },
      { val: "-year", name: "Artwork Year (desc.)" },
      { val: "year", name: "Artwork Year (asc.)" },
    ]
    const selectedSort = pulldownOptions.find(
      sort => sort.val === this.props.sort
    )
    return (
      <div>
        <SubFilterBar>
          <div>
            <Headline
              medium={this.props.medium}
              priceRange={this.props.priceRange}
              dimensionRange={this.props.dimensionRange}
              forSale={this.props.forSale}
              facet={this.props.gene.filtered_artworks.facet}
              aggregations={this.props.gene.filtered_artworks.aggregations}
            />
            <TotalCount filter_artworks={this.props.gene.filtered_artworks} />
          </div>
          <BorderedPulldown
            defaultValue="Recently Updated"
            selectedName={selectedSort && selectedSort.name}
            options={pulldownOptions}
            onChange={this.props.onSortSelected}
          />
        </SubFilterBar>
        <div>
          <ArtworkGrid
            artworks={this.props.gene.filtered_artworks as any}
            columnCount={4}
            itemMargin={40}
            onLoadMore={() => this.loadMoreArtworks()}
            mediator={this.props.mediator}
          />
          <SpinnerContainer>
            {this.state.loading ? <Spinner /> : ""}
          </SpinnerContainer>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div>
        <FilterBar>
          {this.renderArtistsModeToggle()}
          {this.renderForSaleToggle()}
          {this.renderDropdown()}
        </FilterBar>
        {this.renderArtworks()}
      </div>
    )
  }
}

export default createPaginationContainer(
  GeneArtworks,
  {
    gene: graphql`
      fragment GeneArtworks_gene on Gene
        @argumentDefinitions(
          forSale: { type: "Boolean" }
          medium: { type: "String", defaultValue: "*" }
          aggregations: {
            type: "[ArtworkAggregation]"
            defaultValue: [MEDIUM, TOTAL, PRICE_RANGE, DIMENSION_RANGE]
          }
          priceRange: { type: "String", defaultValue: "*" }
          dimensionRange: { type: "String", defaultValue: "*" }
          count: { type: "Int", defaultValue: 10 }
          cursor: { type: "String", defaultValue: "" }
          sort: { type: "String", defaultValue: "-partner_updated_at" }
        ) {
        slug
        filtered_artworks: filterArtworksConnection(
          aggregations: $aggregations
          forSale: $forSale
          medium: $medium
          priceRange: $priceRange
          dimensionRange: $dimensionRange
          includeMediumFilterInAggregation: true
          first: $count
          after: $cursor
          sort: $sort
        ) @connection(key: "GeneArtworks_filtered_artworks") {
          ...TotalCount_filter_artworks
          aggregations {
            slice
            counts {
              name
              value
            }
            ...Dropdown_aggregation
          }
          id
          pageInfo {
            hasNextPage
            endCursor
          }
          ...ArtworkGrid_artworks

          edges {
            node {
              id
            }
          }
          facet {
            ...Headline_facet
          }
        }
      }
    `,
  },
  {
    direction: "forward",
    getConnectionFromProps(props) {
      return props.gene.filtered_artworks
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
        geneID: props.gene.slug,
      }
    },
    query: graphql`
      query GeneArtworksPaginationQuery(
        $geneID: String!
        $count: Int!
        $cursor: String
        $sort: String
        $priceRange: String
        $dimensionRange: String
        $medium: String
        $forSale: Boolean
      ) {
        gene(id: $geneID) {
          ...GeneArtworks_gene
            @arguments(
              count: $count
              cursor: $cursor
              sort: $sort
              priceRange: $priceRange
              dimensionRange: $dimensionRange
              medium: $medium
              forSale: $forSale
            )
        }
      }
    `,
  }
)

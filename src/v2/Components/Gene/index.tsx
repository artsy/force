import React from "react"
import { graphql } from "react-relay"

import { GeneContentsArtistsQuery } from "v2/__generated__/GeneContentsArtistsQuery.graphql"
import { GeneContentsArtworksQuery } from "v2/__generated__/GeneContentsArtworksQuery.graphql"
import { SystemContextProps, withSystemContext } from "v2/Artsy"
import { SystemQueryRenderer as QueryRenderer } from "v2/Artsy/Relay/SystemQueryRenderer"
import Artists from "./Artists"
import GeneArtworks from "./GeneArtworks"

export interface Filters {
  forSale: boolean
  dimensionRange: string
  priceRange: string
  medium?: string
}

export type Sort = "year" | "-year" | "-partner_updated_at"

export type Mode = "artists" | "artworks"

export interface StateChangePayload {
  filters: Filters
  sort: Sort
  mode: Mode
}

export interface Props extends SystemContextProps {
  mode: Mode
  filters?: Partial<Filters>
  geneID: string
  sort?: Sort
  onStateChange: (payload: StateChangePayload) => void
}

export interface State extends Filters {
  mode: Mode
  sort?: Sort
}

class GeneContents extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    const { forSale, priceRange, dimensionRange, medium } = this.props.filters
    this.state = {
      forSale: forSale || null,
      medium: medium || "*",
      priceRange: priceRange || "*",
      dimensionRange: dimensionRange || "*",
      mode: props.mode,
      sort: props.sort || "-partner_updated_at",
    }
  }

  handleStateChange = () => {
    const {
      forSale,
      medium,
      priceRange,
      dimensionRange,
      sort,
      mode,
    } = this.state
    const filters = {
      forSale,
      medium,
      priceRange,
      dimensionRange,
    }
    this.props.onStateChange({ filters, sort, mode })
  }

  // Because `for_sale` is a proper filter of its own, but
  // we include its aggregation as part of `price_range`, we
  // have to handle it specially.
  onDropdownSelect(slice: string, value: string | boolean) {
    let filter = slice.toLowerCase() as string
    if (filter === "price_range" && value === "*-*") {
      filter = "forSale"
      value = true
    }

    if (filter === "price_range") {
      filter = "priceRange"
    }
    if (filter === "dimension_range") {
      filter = "dimensionRange"
    }
    this.setState(
      ({
        [filter]: value,
        mode: "artworks",
      } as any) as Filters,
      this.handleStateChange
    )
  }

  onForSaleToggleSelect() {
    const forSale = this.state.forSale ? null : true
    this.setState(
      {
        forSale,
        mode: "artworks",
      },
      this.handleStateChange
    )
  }

  onSortSelect(sortEl) {
    this.setState(
      {
        sort: sortEl.val,
        mode: "artworks",
      },
      this.handleStateChange
    )
  }

  onArtistModeSelect() {
    this.setState(
      {
        mode: "artists",
      },
      this.handleStateChange
    )
  }

  renderArtists() {
    const { geneID, relayEnvironment, mediator } = this.props
    return (
      <QueryRenderer<GeneContentsArtistsQuery>
        environment={relayEnvironment}
        query={graphql`
          query GeneContentsArtistsQuery($geneID: String!) {
            gene(id: $geneID) {
              ...Artists_gene
            }
          }
        `}
        variables={{ geneID }}
        render={({ props }) => {
          if (props) {
            return (
              <Artists
                onForSaleToggleSelected={this.onForSaleToggleSelect.bind(this)}
                gene={props.gene}
                onDropdownSelected={this.onDropdownSelect.bind(this)}
                mediator={mediator}
              />
            )
          } else {
            return null
          }
        }}
      />
    )
  }

  renderArtworks() {
    const { geneID, relayEnvironment, mediator } = this.props
    const { forSale, medium, priceRange, dimensionRange, sort } = this.state
    return (
      <QueryRenderer<GeneContentsArtworksQuery>
        environment={relayEnvironment}
        query={graphql`
          query GeneContentsArtworksQuery(
            $geneID: String!
            $medium: String
            $priceRange: String
            $forSale: Boolean
            $dimensionRange: String
            $sort: String
          ) {
            gene(id: $geneID) {
              ...GeneArtworks_gene
                @arguments(
                  forSale: $forSale
                  medium: $medium
                  priceRange: $priceRange
                  dimensionRange: $dimensionRange
                  sort: $sort
                )
            }
          }
        `}
        variables={{
          geneID,
          medium,
          priceRange,
          sort,
          forSale,
          dimensionRange,
        }}
        render={({ props }) => {
          if (props) {
            return (
              <GeneArtworks
                onArtistModeToggleSelected={this.onArtistModeSelect.bind(this)}
                onForSaleToggleSelected={this.onForSaleToggleSelect.bind(this)}
                onSortSelected={this.onSortSelect.bind(this)}
                sort={sort}
                forSale={forSale}
                medium={medium}
                priceRange={priceRange}
                dimensionRange={dimensionRange}
                gene={props.gene}
                onDropdownSelected={this.onDropdownSelect.bind(this)}
                mediator={mediator}
              />
            )
          } else {
            return null
          }
        }}
      />
    )
  }

  render() {
    const { mode } = this.state
    if (mode === "artists") {
      return this.renderArtists()
    }
    return this.renderArtworks()
  }
}

export const Contents = withSystemContext(GeneContents)

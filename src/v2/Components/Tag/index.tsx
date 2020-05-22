import React from "react"
import { graphql } from "react-relay"

import { TagContentsArtworksQuery } from "v2/__generated__/TagContentsArtworksQuery.graphql"
import { SystemContextProps, withSystemContext } from "v2/Artsy"
import { SystemQueryRenderer as QueryRenderer } from "v2/Artsy/Relay/SystemQueryRenderer"
import TagArtworks from "./TagArtworks"

export interface Filters {
  forSale: boolean
  dimensionRange: string
  priceRange: string
  medium: string
}

export type Sort = "year" | "-year" | "-partner_updated_at"

export interface StateChangePayload {
  filters: Filters
  sort: Sort
}

export interface Props extends SystemContextProps {
  filters?: Partial<Filters>
  tagID: string
  sort?: Sort
  onStateChange: (payload: StateChangePayload) => void
}

export interface State extends Filters {
  sort?: Sort
}

class TagContents extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    const { forSale, priceRange, dimensionRange, medium } = this.props.filters
    this.state = {
      forSale: forSale || null,
      medium: medium || "*",
      priceRange: priceRange || "*",
      dimensionRange: dimensionRange || "*",
      sort: this.props.sort || "-partner_updated_at",
    }
  }

  handleStateChange = () => {
    const { forSale, medium, priceRange, dimensionRange, sort } = this.state
    const filters = {
      forSale,
      medium,
      priceRange,
      dimensionRange,
    }
    this.props.onStateChange({ filters, sort })
  }

  // Because `for_sale` is a proper filter of its own, but
  // we include its aggregation as part of `price_range`, we
  // have to handle it specially.
  onDropdownSelect(slice: string, value: string | boolean) {
    let filter = slice.toLowerCase()
    if (filter === "price_range" && value === "*-*") {
      filter = "for_sale"
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
      } as any) as Filters,
      this.handleStateChange
    )
  }

  onForSaleToggleSelect() {
    const forSale = this.state.forSale ? null : true
    this.setState(
      {
        forSale,
      },
      this.handleStateChange
    )
  }

  onSortSelect(sortEl) {
    this.setState(
      {
        sort: sortEl.val,
      },
      this.handleStateChange
    )
  }

  render() {
    const { tagID, relayEnvironment, mediator } = this.props
    const { forSale, medium, priceRange, dimensionRange, sort } = this.state
    return (
      <QueryRenderer<TagContentsArtworksQuery>
        environment={relayEnvironment}
        query={graphql`
          query TagContentsArtworksQuery(
            $tagID: String!
            $medium: String
            $priceRange: String
            $sort: String
            $forSale: Boolean
            $dimensionRange: String
          ) {
            tag(id: $tagID) {
              ...TagArtworks_tag
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
        variables={{ tagID, ...this.state }}
        render={({ props }) => {
          if (props) {
            return (
              <TagArtworks
                onForSaleToggleSelected={this.onForSaleToggleSelect.bind(this)}
                onSortSelected={this.onSortSelect.bind(this)}
                sort={sort}
                forSale={forSale}
                medium={medium}
                priceRange={priceRange}
                dimensionRange={dimensionRange}
                tag={props.tag}
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
}

export const Contents = withSystemContext(TagContents)

import { garamond } from "v2/Assets/Fonts"
import { compact, find } from "lodash"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import styled from "styled-components"

interface Props extends React.HTMLProps<Headline> {
  aggregations?: any
  medium: string
  priceRange: string
  dimensionRange: string
  forSale: boolean
  facet?: any
}

export class Headline extends React.Component<Props, null> {
  getCountName(aggregation, value) {
    const selectedAggregation = find(
      this.props.aggregations,
      agg => agg.slice === aggregation.toUpperCase()
    )
    const selectedCount = find(
      selectedAggregation.counts,
      count => count.value === value
    )
    return selectedCount ? selectedCount.name : null
  }

  size() {
    const { dimensionRange } = this.props

    if (dimensionRange && dimensionRange !== "*") {
      return this.getCountName("dimension_range", dimensionRange)
    }
    return false
  }

  medium() {
    const { medium, facet } = this.props
    if (medium && medium !== "*") {
      return this.getCountName("medium", medium)
    }

    if (facet && facet.name) {
      return facet.name
    }

    return "Works"
  }

  priceRange() {
    const { priceRange } = this.props

    if (priceRange && priceRange !== "*") {
      return this.getCountName("price_range", priceRange)
    }
    return false
  }

  forSale() {
    if (this.props.forSale) {
      return "For Sale"
    }
    return false
  }

  renderHeadline() {
    const headline = compact([
      this.size(),
      this.medium(),
      this.priceRange(),
      this.forSale(),
    ]).join(" ")
    if (headline === "works") {
      return "Artworks"
    }
    return headline.charAt(0).toUpperCase() + headline.substr(1)
  }

  render() {
    return <h1 className={this.props.className}>{this.renderHeadline()}</h1>
  }
}

const StyledHeadline = styled(Headline)`
  ${garamond("s11")};
  font-weight: normal;
  margin: 0;
  font-size: 2em;
`

export default createFragmentContainer(StyledHeadline, {
  facet: graphql`
    fragment Headline_facet on ArtworkFilterFacet {
      ... on Tag {
        name
      }
      ... on Gene {
        name
      }
    }
  `,
})

import { TotalCount_filter_artworks } from "v2/__generated__/TotalCount_filter_artworks.graphql"
import numeral from "numeral"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import styled from "styled-components"
import { garamond } from "../../Assets/Fonts"

interface TotalCountProps extends React.HTMLProps<TotalCount> {
  filter_artworks: TotalCount_filter_artworks
}

export class TotalCount extends React.Component<TotalCountProps, null> {
  render() {
    const total = this.props.filter_artworks.counts.total
    const s = total !== 1 ? "s" : ""
    return (
      <div className={this.props.className}>
        {numeral(total).format("0,0")} Work
        {s}
      </div>
    )
  }
}

const StyledTotalCount = styled(TotalCount)`
  font-style: italic;
  ${garamond("s11")};
`

export default createFragmentContainer(StyledTotalCount, {
  filter_artworks: graphql`
    fragment TotalCount_filter_artworks on FilterArtworksConnection {
      counts {
        total
      }
    }
  `,
})

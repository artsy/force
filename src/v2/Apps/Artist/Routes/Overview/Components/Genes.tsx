import { Tags } from "@artsy/palette"
import { Genes_artist } from "v2/__generated__/Genes_artist.graphql"
import React, { Component } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { data as sd } from "sharify"
import styled from "styled-components"

const GeneFamily = styled.div``

interface Props {
  artist: Genes_artist
}

export class Genes extends Component<Props> {
  render() {
    const { related } = this.props.artist
    const { genes } = related
    if (genes.edges.length === 0) {
      return null
    }
    const tags = genes.edges.map(edge => {
      return { name: edge.node.name, href: sd.APP_URL + edge.node.href }
    })
    return (
      <GeneFamily>
        <Tags tags={tags} displayNum={8} />
      </GeneFamily>
    )
  }
}

export const GenesFragmentContainer = createFragmentContainer(Genes, {
  artist: graphql`
    fragment Genes_artist on Artist {
      related {
        genes {
          edges {
            node {
              href
              name
            }
          }
        }
      }
    }
  `,
})

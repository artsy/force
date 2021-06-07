import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { extractNodes } from "v2/Utils/extractNodes"
import { data as sd } from "sharify"
import { Artist2Genes_artist } from "v2/__generated__/Artist2Genes_artist.graphql"
import { Flex, Pill } from "@artsy/palette"

interface Artist2GenesProps {
  artist: Artist2Genes_artist
}

const Artist2Genes: React.FC<Artist2GenesProps> = ({ artist }) => {
  const nodes = extractNodes(artist?.related?.genes)

  if (nodes.length === 0) {
    return null
  }

  const pills = nodes.map(edge => ({
    href: sd.APP_URL + edge.href!,
    name: edge.name!,
  }))

  return (
    <Flex flexWrap="wrap">
      {pills.map((pill, index) => {
        return (
          <Pill src={pill.href} key={index} mr={1} mb={1}>
            {pill.name}
          </Pill>
        )
      })}
    </Flex>
  )
}

export const Artist2GenesFragmentContainer = createFragmentContainer(
  Artist2Genes,
  {
    artist: graphql`
      fragment Artist2Genes_artist on Artist {
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
  }
)

import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { extractNodes } from "v2/Utils/extractNodes"
import { data as sd } from "sharify"
import { Artist2Genes_artist } from "v2/__generated__/Artist2Genes_artist.graphql"
import { Tags } from "@artsy/palette"

interface Artist2GenesProps {
  artist: Artist2Genes_artist
}

const Artist2Genes: React.FC<Artist2GenesProps> = ({ artist }) => {
  const nodes = extractNodes(artist?.related?.genes)

  if (nodes.length === 0) {
    return null
  }

  const tags = nodes.map(edge => ({
    href: sd.APP_URL + edge.href!,
    name: edge.name!,
  }))

  return (
    <>
      <Tags tags={tags} displayNum={8} />
    </>
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

import React from "react"
import { Box, Text } from "@artsy/palette"
import { QueryRenderer, createFragmentContainer, graphql } from "react-relay"
import { useSystemContext } from "v2/Artsy"
import { SoldRecentlyQuery } from "v2/__generated__/SoldRecentlyQuery.graphql"
import { SoldRecently_targetSupply } from "v2/__generated__/SoldRecently_targetSupply.graphql"
import { extractNodes } from "v2/Utils/ExtractNodes"

interface SoldRecentlyProps {
  targetSupply: SoldRecently_targetSupply
}

export const SoldRecently: React.FC<SoldRecentlyProps> = ({ targetSupply }) => {
  const artworks = targetSupply.microfunnel.map(microfunnel => {
    return extractNodes(microfunnel.artworksConnection)
  })

  return (
    <Box>
      <Text variant="title">Sold recently on Artsy</Text>
      <Text variant="subtitle">{artworks.length}</Text>
    </Box>
  )
}

const SoldRecentlyFragmentContainer = createFragmentContainer(SoldRecently, {
  targetSupply: graphql`
    fragment SoldRecently_targetSupply on TargetSupply {
      microfunnel {
        artworksConnection(first: 1) {
          edges {
            node {
              slug
              internalID
              href
              artistNames
              image {
                imageURL
              }
              realizedPrice
            }
          }
        }
      }
    }
  `,
})

export const SoldRecentlyQueryRenderer: React.FC = () => {
  const { relayEnvironment } = useSystemContext()
  return (
    <QueryRenderer<SoldRecentlyQuery>
      environment={relayEnvironment}
      variables={{}}
      query={graphql`
        query SoldRecentlyQuery {
          targetSupply {
            ...SoldRecently_targetSupply
          }
        }
      `}
      render={({ props, error }) => {
        //FIXME: Error handling
        if (error) {
          return null
        }
        //FIXME: Add skeleton loading state
        if (!props) {
          return null
        }
        return (
          <SoldRecentlyFragmentContainer targetSupply={props.targetSupply} />
        )
      }}
    />
  )
}

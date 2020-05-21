import { Box } from "@artsy/palette"
import { GeneRelatedLinks_gene } from "v2/__generated__/GeneRelatedLinks_gene.graphql"
import { GeneRelatedLinksQuery } from "v2/__generated__/GeneRelatedLinksQuery.graphql"
import { useSystemContext } from "v2/Artsy"
import { renderWithLoadProgress } from "v2/Artsy/Relay/renderWithLoadProgress"
import { SystemQueryRenderer as QueryRenderer } from "v2/Artsy/Relay/SystemQueryRenderer"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"

/**
 * Used on the Gene page to show related artists and categories.
 */
export const GeneRelatedLinks: React.FC<{ gene: GeneRelatedLinks_gene }> = ({
  gene,
}) => {
  return (
    <>
      {gene.similar && (
        <Box className="related-genes related-links bisected-header-cell-section is-fade-in">
          <h2>Related Categories</h2>
          <div className="related-genes-links">
            {gene.similar.edges.map(({ node: similarGene }, index) => {
              const separator =
                index < gene.similar.edges.length - 1 ? ", " : ""
              return (
                <React.Fragment key={similarGene.name}>
                  <a href={similarGene.href}>{similarGene.name}</a>
                  {separator}
                </React.Fragment>
              )
            })}
          </div>
        </Box>
      )}
      {gene.artists && (
        <Box className="related-artists related-links bisected-header-cell-section is-fade-in">
          <h2>Related Artists</h2>
          <div className="artists">
            {gene.artists.edges.map(({ node: artist }, index) => {
              const separator =
                index < gene.artists.edges.length - 1 ? ", " : ""
              return (
                <React.Fragment key={artist.name}>
                  <a href={artist.href}>{artist.name}</a>
                  {separator}
                </React.Fragment>
              )
            })}
          </div>
        </Box>
      )}
    </>
  )
}

export const GeneRelatedLinksFragmentContainer = createFragmentContainer(
  GeneRelatedLinks,
  {
    gene: graphql`
      fragment GeneRelatedLinks_gene on Gene {
        similar(first: 10) {
          edges {
            node {
              href
              name
            }
          }
        }
        artists: artistsConnection(first: 10) {
          edges {
            node {
              href
              name
            }
          }
        }
      }
    `,
  }
)

export interface GeneRelatedLinksQueryRendererProps {
  geneID: string
}

export const GeneRelatedLinksQueryRenderer: React.FC<GeneRelatedLinksQueryRendererProps> = ({
  geneID,
}) => {
  const { relayEnvironment } = useSystemContext()

  return (
    <QueryRenderer<GeneRelatedLinksQuery>
      environment={relayEnvironment}
      variables={{ geneID }}
      render={renderWithLoadProgress(GeneRelatedLinksFragmentContainer)}
      query={graphql`
        query GeneRelatedLinksQuery($geneID: String!) {
          gene(id: $geneID) {
            ...GeneRelatedLinks_gene
          }
        }
      `}
    />
  )
}

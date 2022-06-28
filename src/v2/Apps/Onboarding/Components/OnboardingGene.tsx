import { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { SystemQueryRenderer } from "v2/System/Relay/SystemQueryRenderer"
import { OnboardingGene_gene } from "v2/__generated__/OnboardingGene_gene.graphql"
import { OnboardingGeneQuery } from "v2/__generated__/OnboardingGeneQuery.graphql"
import { OnboardingLoadingCollection } from "v2/Apps/Onboarding/Components/OnboardingLoadingCollection"
import { ArtworkGridItemFragmentContainer } from "v2/Components/Artwork/GridItem"

import { Masonry } from "v2/Components/Masonry"
import { extractNodes } from "v2/Utils/extractNodes"

interface OnboardingGeneProps {
  gene: OnboardingGene_gene
}

const OnboardingGene: FC<OnboardingGeneProps> = ({ gene }) => {
  const artworks = extractNodes(gene.artworks)

  return (
    <>
      <Masonry>
        {artworks.map((artwork, index) => {
          return (
            <ArtworkGridItemFragmentContainer artwork={artwork} key={index} />
          )
        })}
      </Masonry>
    </>
  )
}

export const OnboardingGeneFragmentContainer = createFragmentContainer(
  OnboardingGene,
  {
    gene: graphql`
      fragment OnboardingGene_gene on Gene {
        name
        artworks: filterArtworksConnection(first: 10) {
          counts {
            total
          }
          edges {
            node {
              ...GridItem_artwork
            }
          }
        }
      }
    `,
  }
)

interface OnboardingGeneQueryRendererProps {
  id: string
}

export const OnboardingGeneQueryRenderer: FC<OnboardingGeneQueryRendererProps> = ({
  id,
}) => {
  return (
    <SystemQueryRenderer<OnboardingGeneQuery>
      query={graphql`
        query OnboardingGeneQuery($id: String!) {
          gene(id: $id) {
            ...OnboardingGene_gene
          }
        }
      `}
      variables={{ id }}
      render={({ error, props }) => {
        if (error) {
          console.error(error)
          return null
        }

        if (!props?.gene) {
          return <OnboardingLoadingCollection />
        }

        return <OnboardingGeneFragmentContainer gene={props.gene} />
      }}
      placeholder={<OnboardingLoadingCollection />}
    />
  )
}

import { FC, Fragment } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { SystemQueryRenderer } from "v2/System/Relay/SystemQueryRenderer"
import { OnboardingGene_gene } from "v2/__generated__/OnboardingGene_gene.graphql"
import { OnboardingGeneQuery } from "v2/__generated__/OnboardingGeneQuery.graphql"
import { OnboardingLoadingCollection } from "v2/Apps/Onboarding/Components/OnboardingLoadingCollection"
import { ArtworkGridItemFragmentContainer } from "v2/Components/Artwork/GridItem"
import { Masonry } from "v2/Components/Masonry"
import { extractNodes } from "v2/Utils/extractNodes"
import { Box, Column, GridColumns, Spacer, Text } from "@artsy/palette"
import { FollowGeneButtonFragmentContainer } from "v2/Components/FollowButton/FollowGeneButton"

interface OnboardingGeneProps {
  gene: OnboardingGene_gene
  description: JSX.Element
}

const OnboardingGene: FC<OnboardingGeneProps> = ({ gene, description }) => {
  const artworks = extractNodes(gene.artworks)

  return (
    <Box padding={6}>
      <GridColumns>
        <Column span={10}>
          <Text variant="xl" color="black100">
            {gene.name}
          </Text>
        </Column>

        <Column span={2}>
          <FollowGeneButtonFragmentContainer gene={gene} />
        </Column>
      </GridColumns>

      <Text variant="sm-display" color="black60" mt={2}>
        {description}
      </Text>

      <Spacer mb={4} />

      <Masonry columnCount={[2, 3]}>
        {artworks.map(artwork => {
          return (
            <Fragment key={artwork.internalID}>
              <ArtworkGridItemFragmentContainer artwork={artwork} />

              <Spacer mb={2} />
            </Fragment>
          )
        })}
      </Masonry>
    </Box>
  )
}

export const OnboardingGeneFragmentContainer = createFragmentContainer(
  OnboardingGene,
  {
    gene: graphql`
      fragment OnboardingGene_gene on Gene {
        name
        artworks: filterArtworksConnection(first: 100) {
          edges {
            node {
              internalID
              ...GridItem_artwork
            }
          }
        }
        ...FollowGeneButton_gene
      }
    `,
  }
)

interface OnboardingGeneQueryRendererProps {
  id: string
  description: JSX.Element
}

export const OnboardingGeneQueryRenderer: FC<OnboardingGeneQueryRendererProps> = ({
  id,
  description,
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

        return (
          <OnboardingGeneFragmentContainer
            gene={props.gene}
            description={description}
          />
        )
      }}
      placeholder={<OnboardingLoadingCollection />}
    />
  )
}

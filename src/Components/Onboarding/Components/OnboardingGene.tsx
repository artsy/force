import { FC, Fragment, useEffect } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { OnboardingGene_gene } from "__generated__/OnboardingGene_gene.graphql"
import { OnboardingGeneQuery } from "__generated__/OnboardingGeneQuery.graphql"
import { ArtworkGridItemFragmentContainer } from "Components/Artwork/GridItem"
import { Masonry } from "Components/Masonry"
import { extractNodes } from "Utils/extractNodes"
import { Box, Flex, Message, Spacer, Text } from "@artsy/palette"
import { FollowGeneButtonFragmentContainer } from "Components/FollowButton/FollowGeneButton"
import { useOnboardingContext } from "../Hooks/useOnboardingContext"
import { OnboardingThankYou } from "../Views/OnboardingThankYou"

interface OnboardingGeneProps {
  gene: OnboardingGene_gene
  description: JSX.Element
}

const OnboardingGene: FC<OnboardingGeneProps> = ({ gene, description }) => {
  const artworks = extractNodes(gene.artworks)

  return (
    <Box px={[2, 4]} py={6}>
      <Flex justifyContent="space-between">
        <Box>
          <Text variant="xl">{gene.name}</Text>

          <Text variant={["sm", "md"]} color="black60" mt={2}>
            {description}
          </Text>
        </Box>

        <FollowGeneButtonFragmentContainer
          gene={gene}
          display={["none", "block"]}
        />
      </Flex>

      <FollowGeneButtonFragmentContainer
        gene={gene}
        mt={2}
        display={["block", "none"]}
        size="small"
      />

      <Spacer mb={4} />

      {artworks.length === 0 ? (
        <Message title="No results found" />
      ) : (
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
      )}
    </Box>
  )
}

export const OnboardingGeneFragmentContainer = createFragmentContainer(
  OnboardingGene,
  {
    gene: graphql`
      fragment OnboardingGene_gene on Gene {
        name
        artworks: filterArtworksConnection(
          first: 50
          page: 1
          sort: "-decayed_merch"
          height: "*-*"
          width: "*-*"
          priceRange: "*-*"
          marketable: true
          offerable: true
          inquireableOnly: true
          forSale: true
        ) {
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
  const { onComplete } = useOnboardingContext()

  // If a user has arrived to the gene artwork grid page, they've completed a
  // path within the artwork flow.
  useEffect(() => {
    onComplete()
  }, [onComplete])

  const ThankYouMessage = (
    <>
      Great choice
      <br />
      We’re finding a collection for you
    </>
  )

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
          return <OnboardingThankYou message={ThankYouMessage} />
        }

        return (
          <OnboardingGeneFragmentContainer
            gene={props.gene}
            description={description}
          />
        )
      }}
      placeholder={<OnboardingThankYou message={ThankYouMessage} />}
    />
  )
}

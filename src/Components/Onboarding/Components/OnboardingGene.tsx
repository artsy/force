import { FC, Fragment, useEffect } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { OnboardingGene_gene$data } from "__generated__/OnboardingGene_gene.graphql"
import { OnboardingGeneQuery } from "__generated__/OnboardingGeneQuery.graphql"
import { ArtworkGridItemFragmentContainer } from "Components/Artwork/GridItem"
import { Masonry } from "Components/Masonry"
import { extractNodes } from "Utils/extractNodes"
import { Box, Flex, Message, Spacer, Text } from "@artsy/palette"
import { FollowGeneButtonQueryRenderer } from "Components/FollowButton/FollowGeneButton"
import { useOnboardingContext } from "Components/Onboarding/Hooks/useOnboardingContext"
import { OnboardingThankYou } from "Components/Onboarding/Views/OnboardingThankYou"
import { ContextModule } from "@artsy/cohesion"
import { useOnboardingTracking } from "Components/Onboarding/Hooks/useOnboardingTracking"

interface OnboardingGeneProps {
  gene: OnboardingGene_gene$data
  description: JSX.Element
}

const OnboardingGene: FC<OnboardingGeneProps> = ({ gene, description }) => {
  const artworks = extractNodes(gene.artworks)
  const { onClose } = useOnboardingContext()
  const tracking = useOnboardingTracking()

  useEffect(() => {
    return () => {
      if (onClose) {
        tracking.userCompletedOnboarding()
        onClose()
      }
    }
  }, [onClose, tracking])

  return (
    <Box px={[2, 4]} py={6}>
      <Flex justifyContent="space-between">
        <Box>
          <Text variant="xl">{gene.name}</Text>

          <Text variant={["sm", "md"]} color="black60" mt={2}>
            {description}
          </Text>
        </Box>

        <FollowGeneButtonQueryRenderer
          id={gene.internalID}
          display={["none", "block"]}
          contextModule={ContextModule.onboardingFlow}
        />
      </Flex>

      <FollowGeneButtonQueryRenderer
        id={gene.internalID}
        mt={2}
        display={["block", "none"]}
        size="small"
        contextModule={ContextModule.onboardingFlow}
      />

      <Spacer mb={4} />

      {artworks.length === 0 ? (
        <Message title="No results found" />
      ) : (
        <Masonry columnCount={[2, 3]}>
          {artworks.map(artwork => {
            return (
              <Fragment key={artwork.internalID}>
                {/* @ts-ignore RELAY UPGRADE 13 */}
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
        internalID
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
            // @ts-ignore RELAY UPGRADE 13
            gene={props.gene}
            description={description}
          />
        )
      }}
      placeholder={<OnboardingThankYou message={ThankYouMessage} />}
    />
  )
}

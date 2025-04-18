import { Box, Flex, Message, Spacer, Text } from "@artsy/palette"
import { ArtworkGridItemFragmentContainer } from "Components/Artwork/GridItem"
import { Masonry } from "Components/Masonry"
import { useOnboardingContext } from "Components/Onboarding/Hooks/useOnboardingContext"
import { OnboardingThankYou } from "Components/Onboarding/Views/OnboardingThankYou"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { extractNodes } from "Utils/extractNodes"
import type { OnboardingMarketingCollectionQuery } from "__generated__/OnboardingMarketingCollectionQuery.graphql"
import type { OnboardingMarketingCollection_marketingCollection$data } from "__generated__/OnboardingMarketingCollection_marketingCollection.graphql"
import { type FC, Fragment, useEffect } from "react"
import { createFragmentContainer, graphql } from "react-relay"

interface OnboardingMarketingCollectionProps {
  marketingCollection: OnboardingMarketingCollection_marketingCollection$data
  description: JSX.Element
}

const OnboardingMarketingCollection: FC<
  React.PropsWithChildren<OnboardingMarketingCollectionProps>
> = ({ marketingCollection, description }) => {
  const artworks = extractNodes(marketingCollection.artworks)

  return (
    <Box px={[2, 4]} py={6}>
      <Flex justifyContent="space-between">
        <Box>
          <Text variant="xl">{marketingCollection.title}</Text>

          <Text variant={["sm", "md"]} color="mono60" mt={2}>
            {description}
          </Text>
        </Box>
      </Flex>

      <Spacer y={4} />

      {artworks.length === 0 ? (
        <Message title="No results found" />
      ) : (
        <Masonry columnCount={[2, 3]}>
          {artworks.map(artwork => {
            return (
              <Fragment key={artwork.internalID}>
                <ArtworkGridItemFragmentContainer artwork={artwork} />

                <Spacer y={2} />
              </Fragment>
            )
          })}
        </Masonry>
      )}
    </Box>
  )
}

export const OnboardingMarketingCollectionFragmentContainer =
  createFragmentContainer(OnboardingMarketingCollection, {
    marketingCollection: graphql`
      fragment OnboardingMarketingCollection_marketingCollection on MarketingCollection {
        title
        artworks: artworksConnection(
          first: 50
          page: 1
          sort: "-decayed_merch"
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
  })

interface OnboardingMarketingCollectionQueryRendererProps {
  slug: string
  description: JSX.Element
}

export const OnboardingMarketingCollectionQueryRenderer: FC<
  React.PropsWithChildren<OnboardingMarketingCollectionQueryRendererProps>
> = ({ slug, description }) => {
  const { onComplete } = useOnboardingContext()

  // If a user has arrived to the marketing collection artwork grid page,
  // they've completed a path within the artwork flow.
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
    <SystemQueryRenderer<OnboardingMarketingCollectionQuery>
      query={graphql`
        query OnboardingMarketingCollectionQuery($slug: String!) {
          marketingCollection(slug: $slug) {
            ...OnboardingMarketingCollection_marketingCollection
          }
        }
      `}
      variables={{ slug }}
      render={({ error, props }) => {
        if (error) {
          console.error(error)
          return null
        }

        if (!props?.marketingCollection) {
          return <OnboardingThankYou message={ThankYouMessage} />
        }

        return (
          <OnboardingMarketingCollectionFragmentContainer
            marketingCollection={props.marketingCollection}
            description={description}
          />
        )
      }}
      placeholder={<OnboardingThankYou message={ThankYouMessage} />}
    />
  )
}

import { ContextModule } from "@artsy/cohesion"
import { Join, Separator } from "@artsy/palette"
import { EntityHeaderArtistFragmentContainer } from "Components/EntityHeaders/EntityHeaderArtist"
import { EntityHeaderPartnerFragmentContainer } from "Components/EntityHeaders/EntityHeaderPartner"
import { EntityHeaderPlaceholder } from "Components/EntityHeaders/EntityHeaderPlaceholder"
import { FollowArtistButtonQueryRenderer } from "Components/FollowButton/FollowArtistButton"
import { FollowProfileButtonQueryRenderer } from "Components/FollowButton/FollowProfileButton"
import { useOnboardingContext } from "Components/Onboarding/Hooks/useOnboardingContext"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { extractNodes } from "Utils/extractNodes"
import type { OnboardingOrderedSetQuery } from "__generated__/OnboardingOrderedSetQuery.graphql"
import type { OnboardingOrderedSet_orderedSet$data } from "__generated__/OnboardingOrderedSet_orderedSet.graphql"
import type { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"

interface OnboardingOrderedSetProps {
  orderedSet: OnboardingOrderedSet_orderedSet$data
}

export const OnboardingOrderedSet: FC<
  React.PropsWithChildren<OnboardingOrderedSetProps>
> = ({ orderedSet }) => {
  const { dispatch } = useOnboardingContext()
  const nodes = extractNodes(orderedSet.orderedItemsConnection)

  return (
    <>
      <Join separator={<Separator my={2} />}>
        {nodes.map(node => {
          switch (node.__typename) {
            case "Artist":
              return (
                <EntityHeaderArtistFragmentContainer
                  key={node.internalID}
                  artist={node}
                  displayLink={false}
                  FollowButton={
                    <FollowArtistButtonQueryRenderer
                      id={node.internalID}
                      contextModule={ContextModule.onboardingFlow}
                      size="small"
                      onFollow={() => {
                        dispatch({ type: "FOLLOW", payload: node.internalID })
                      }}
                    />
                  }
                />
              )

            case "Profile": {
              const partner = node.owner

              if (!partner || partner.__typename !== "Partner") return null

              return (
                <EntityHeaderPartnerFragmentContainer
                  key={node.internalID}
                  partner={partner}
                  FollowButton={
                    <FollowProfileButtonQueryRenderer
                      id={node.internalID}
                      contextModule={ContextModule.onboardingFlow}
                      size="small"
                      onFollow={() => {
                        dispatch({ type: "FOLLOW", payload: node.internalID })
                      }}
                    />
                  }
                />
              )
            }
          }
        })}
      </Join>
    </>
  )
}

export const OnboardingOrderedSetFragmentContainer = createFragmentContainer(
  OnboardingOrderedSet,
  {
    orderedSet: graphql`
      fragment OnboardingOrderedSet_orderedSet on OrderedSet {
        orderedItemsConnection(first: 50) {
          edges {
            node {
              __typename
              ... on Artist {
                internalID
                ...EntityHeaderArtist_artist
              }
              ... on Profile {
                internalID
                owner {
                  __typename
                  ... on Partner {
                    ...EntityHeaderPartner_partner
                  }
                }
              }
            }
          }
        }
      }
    `,
  },
)

const PLACEHOLDER = (
  <Join separator={<Separator my={2} />}>
    <EntityHeaderPlaceholder />
    <EntityHeaderPlaceholder />
    <EntityHeaderPlaceholder />
    <EntityHeaderPlaceholder />
  </Join>
)

interface OnboardingOrderedSetQueryRendererProps {
  id: string
}

export const OnboardingOrderedSetQueryRenderer: FC<
  React.PropsWithChildren<OnboardingOrderedSetQueryRendererProps>
> = ({ id }) => {
  return (
    <SystemQueryRenderer<OnboardingOrderedSetQuery>
      query={graphql`
        query OnboardingOrderedSetQuery($key: String!) {
          orderedSets(key: $key) {
            ...OnboardingOrderedSet_orderedSet
          }
        }
      `}
      placeholder={PLACEHOLDER}
      variables={{ key: id }}
      render={({ error, props }) => {
        if (error) {
          console.error(error)
          return null
        }

        if (!props?.orderedSets) {
          return PLACEHOLDER
        }

        const [orderedSet] = props.orderedSets

        if (!orderedSet) return null

        return <OnboardingOrderedSetFragmentContainer orderedSet={orderedSet} />
      }}
    />
  )
}

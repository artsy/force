import { Join, Separator } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { SystemQueryRenderer } from "v2/System/Relay/SystemQueryRenderer"
import { OnboardingOrderedSet_orderedSet } from "v2/__generated__/OnboardingOrderedSet_orderedSet.graphql"
import { OnboardingOrderedSetQuery } from "v2/__generated__/OnboardingOrderedSetQuery.graphql"
import { FC } from "react"
import { EntityHeaderArtistFragmentContainer } from "v2/Components/EntityHeaders/EntityHeaderArtist"
import { extractNodes } from "v2/Utils/extractNodes"
import { useOnboardingContext } from "../Hooks/useOnboardingContext"
import { EntityHeaderPartnerFragmentContainer } from "v2/Components/EntityHeaders/EntityHeaderPartner"
import { EntityHeaderPlaceholder } from "v2/Components/EntityHeaders/EntityHeaderPlaceholder"

interface OnboardingOrderedSetProps {
  orderedSet: OnboardingOrderedSet_orderedSet
}

export const OnboardingOrderedSet: FC<OnboardingOrderedSetProps> = ({
  orderedSet,
}) => {
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
                  onFollow={() => {
                    dispatch({ type: "FOLLOW", payload: node.internalID! })
                  }}
                />
              )

            case "Profile": {
              const partner = node.owner

              if (!partner || partner.__typename !== "Partner") return null

              return (
                <EntityHeaderPartnerFragmentContainer
                  key={node.internalID}
                  partner={partner}
                  onFollow={() => {
                    dispatch({ type: "FOLLOW", payload: node.internalID! })
                  }}
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
  }
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

export const OnboardingOrderedSetQueryRenderer: FC<OnboardingOrderedSetQueryRendererProps> = ({
  id,
}) => {
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

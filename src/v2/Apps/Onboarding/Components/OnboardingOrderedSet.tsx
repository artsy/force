import { Join, Separator } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { SystemQueryRenderer } from "v2/System/Relay/SystemQueryRenderer"
import { OnboardingOrderedSet_orderedSet } from "v2/__generated__/OnboardingOrderedSet_orderedSet.graphql"
import { OnboardingOrderedSetQuery } from "v2/__generated__/OnboardingOrderedSetQuery.graphql"
import { FC } from "react"
import { EntityHeaderArtistFragmentContainer } from "v2/Components/EntityHeaders/EntityHeaderArtist"
import { extractNodes } from "v2/Utils/extractNodes"
import { useOnboardingContext } from "../useOnboardingContext"

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
          if (!node || !node.name) return null

          return (
            <EntityHeaderArtistFragmentContainer
              artist={node}
              key={node.internalID}
              // TODO: Switch this to `onFollow`
              onClick={() => {
                dispatch({ type: "FOLLOW", payload: node.internalID! })
              }}
            />
          )
        })}
      </Join>
    </>
  )
}

const OnboardingOrderedSetFragmentContainer = createFragmentContainer(
  OnboardingOrderedSet,
  {
    orderedSet: graphql`
      fragment OnboardingOrderedSet_orderedSet on OrderedSet {
        orderedItemsConnection(first: 50) {
          edges {
            node {
              ... on Artist {
                ...EntityHeaderArtist_artist
                name
                internalID
              }
            }
          }
        }
      }
    `,
  }
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
      variables={{ key: id }}
      render={({ error, props }) => {
        if (error) {
          console.error(error)
          return null
        }

        if (!props?.orderedSets) {
          return null
        }

        const [orderedSet] = props.orderedSets

        if (!orderedSet) return null

        return <OnboardingOrderedSetFragmentContainer orderedSet={orderedSet} />
      }}
    />
  )
}

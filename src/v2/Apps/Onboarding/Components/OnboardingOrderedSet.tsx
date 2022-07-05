import { Column, GridColumns, Box } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { SystemQueryRenderer } from "v2/System/Relay/SystemQueryRenderer"
import { OnboardingLoadingCollection } from "./OnboardingLoadingCollection"
import { OnboardingOrderedSet_orderedSet } from "v2/__generated__/OnboardingOrderedSet_orderedSet.graphql"
import { OnboardingOrderedSetQuery } from "v2/__generated__/OnboardingOrderedSetQuery.graphql"
import { FC } from "react"
// import { EntityHeaderArtistFragmentContainer } from "v2/Components/EntityHeaders/EntityHeaderArtist"
// import { extractNodes } from "v2/Utils/extractNodes"

interface OnboardingOrderedSetProps {
  orderedSet: OnboardingOrderedSet_orderedSet
}

export const OnboardingOrderedSet: FC<OnboardingOrderedSetProps> = ({
  orderedSet,
}) => {
  // const artists = extractNodes(orderedSet)
  // TODO: artists is currently an empty array will fix

  return (
    <>
      <GridColumns>
        <Column span={6}>
          <Box
            color="black100"
            border="1px solid"
            width="100%"
            height="100%"
          ></Box>
        </Column>
        <Column span={6}>
          {/* {artists.map(artist => {
            if (!artist || artist.name) return null

            return (
              <EntityHeaderArtistFragmentContainer
                artist={artist}
                key={artist.internalID}
              />
            )
          })} */}
        </Column>
      </GridColumns>
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
                name
                slug
                internalID
                image {
                  imageURL
                  internalID
                }
                formattedNationalityAndBirthday
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
      placeholder={<OnboardingLoadingCollection />}
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
          return <OnboardingLoadingCollection />
        }

        const [orderedSet] = props.orderedSets

        if (!orderedSet) return null

        return <OnboardingOrderedSetFragmentContainer orderedSet={orderedSet} />
      }}
    />
  )
}

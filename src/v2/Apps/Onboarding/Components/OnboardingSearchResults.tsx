import { Join, Separator } from "@artsy/palette"
import { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { EntityHeaderArtistFragmentContainer } from "v2/Components/EntityHeaders/EntityHeaderArtist"
import { EntityHeaderPartnerFragmentContainer } from "v2/Components/EntityHeaders/EntityHeaderPartner"
import { SystemQueryRenderer } from "v2/System/Relay/SystemQueryRenderer"
import { extractNodes } from "v2/Utils/extractNodes"
import { useOnboardingContext } from "../useOnboardingContext"
import { OnboardingSearchResults_viewer } from "v2/__generated__/OnboardingSearchResults_viewer.graphql"
import { OnboardingSearchResultsQuery } from "v2/__generated__/OnboardingSearchResultsQuery.graphql"

interface OnboardingSearchResultsProps {
  viewer: OnboardingSearchResults_viewer
}

const OnboardingSearchResults: FC<OnboardingSearchResultsProps> = ({
  viewer,
}) => {
  const { dispatch } = useOnboardingContext()
  const nodes = extractNodes(viewer.matchConnection)

  return (
    <>
      <Join separator={<Separator my={2} />}>
        {nodes.map(node => {
          switch (node.__typename) {
            case "Artist":
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

            case "Profile": {
              const partner = node.owner

              if (!partner || partner.__typename !== "Partner") return null

              return (
                <EntityHeaderPartnerFragmentContainer
                  partner={partner}
                  key={node.internalID}
                  // TODO: Switch this to `onFollow`
                  onClick={() => {
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

export const OnboardingSearchResultsFragmentContainer = createFragmentContainer(
  OnboardingSearchResults,
  {
    viewer: graphql`
      fragment OnboardingSearchResults_viewer on Viewer
        @argumentDefinitions(
          term: { type: "String!", defaultValue: "" }
          entities: { type: "[SearchEntity!]!", defaultValue: [] }
        ) {
        matchConnection(
          term: $term
          entities: $entities
          first: 10
          mode: AUTOSUGGEST
        ) {
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

interface OnboardingOrderedSetQueryRendererProps {
  term: string
  entities: "ARTIST" | "GALLERY"
}

export const OnboardingSearchResultsQueryRenderer: FC<OnboardingOrderedSetQueryRendererProps> = ({
  term,
  entities,
}) => {
  return (
    <SystemQueryRenderer<OnboardingSearchResultsQuery>
      query={graphql`
        query OnboardingSearchResultsQuery(
          $term: String!
          $entities: [SearchEntity!]!
        ) {
          viewer {
            ...OnboardingSearchResults_viewer
              @arguments(term: $term, entities: $entities)
          }
        }
      `}
      variables={{ term: term, entities: [entities] }}
      render={({ error, props }) => {
        if (error) {
          console.error(error)
          return null
        }
        if (!props?.viewer) {
          return null
        }
        return (
          <OnboardingSearchResultsFragmentContainer viewer={props.viewer} />
        )
      }}
    />
  )
}

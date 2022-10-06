import { Join, Message, Separator } from "@artsy/palette"
import { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { EntityHeaderArtistFragmentContainer } from "Components/EntityHeaders/EntityHeaderArtist"
import { EntityHeaderPartnerFragmentContainer } from "Components/EntityHeaders/EntityHeaderPartner"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { extractNodes } from "Utils/extractNodes"
import { useOnboardingContext } from "Components/Onboarding/Hooks/useOnboardingContext"
import { OnboardingSearchResults_viewer$data } from "__generated__/OnboardingSearchResults_viewer.graphql"
import { OnboardingSearchResultsQuery } from "__generated__/OnboardingSearchResultsQuery.graphql"
import { EntityHeaderPlaceholder } from "Components/EntityHeaders/EntityHeaderPlaceholder"
import { ContextModule } from "@artsy/cohesion"
import { FollowProfileButtonQueryRenderer } from "Components/FollowButton/FollowProfileButton"
import { FollowArtistButtonQueryRenderer } from "Components/FollowButton/FollowArtistButton"

interface OnboardingSearchResultsProps {
  viewer: OnboardingSearchResults_viewer$data
  term: string
}

const OnboardingSearchResults: FC<OnboardingSearchResultsProps> = ({
  term,
  viewer,
}) => {
  const { dispatch } = useOnboardingContext()
  const nodes = extractNodes(viewer.matchConnection)

  if (nodes.length === 0) {
    return (
      <Message
        title={`Sorry, we couldn’t find anything for "${term}". Please try searching again with a different spelling.`}
      />
    )
  }

  return (
    <Join separator={<Separator my={2} />}>
      {nodes.map(node => {
        switch (node.__typename) {
          case "Artist":
            return (
              <EntityHeaderArtistFragmentContainer
                key={node.internalID}
                artist={node}
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

            if (partner?.__typename !== "Partner") return null

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
  entities: "ARTIST" | "PROFILE"
}

const PLACEHOLDER = (
  <Join separator={<Separator my={2} />}>
    <EntityHeaderPlaceholder />
    <EntityHeaderPlaceholder />
    <EntityHeaderPlaceholder />
    <EntityHeaderPlaceholder />
  </Join>
)

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
      placeholder={PLACEHOLDER}
      render={({ error, props }) => {
        if (error) {
          console.error(error)
          return null
        }
        if (!props?.viewer) {
          return PLACEHOLDER
        }
        return (
          <OnboardingSearchResultsFragmentContainer
            term={term}
            viewer={props.viewer}
          />
        )
      }}
    />
  )
}

import { Join, Separator } from "@artsy/palette"
import { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { EntityHeaderArtistFragmentContainer } from "v2/Components/EntityHeaders/EntityHeaderArtist"
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

export const OnboardingSearchResultsFragmentContainer = createFragmentContainer(
  OnboardingSearchResults,
  {
    viewer: graphql`
      fragment OnboardingSearchResults_viewer on Viewer
        @argumentDefinitions(term: { type: "String!", defaultValue: "" }) {
        matchConnection(
          term: $term
          entities: [ARTIST]
          first: 10
          mode: AUTOSUGGEST
        ) {
          edges {
            node {
              ... on Artist {
                name
                internalID
                ...EntityHeaderArtist_artist
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
}

export const OnboardingSearchResultsQueryRenderer: FC<OnboardingOrderedSetQueryRendererProps> = ({
  term,
}) => {
  return (
    <SystemQueryRenderer<OnboardingSearchResultsQuery>
      query={graphql`
        query OnboardingSearchResultsQuery($term: String!) {
          viewer {
            ...OnboardingSearchResults_viewer @arguments(term: $term)
          }
        }
      `}
      variables={{ term: term }}
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

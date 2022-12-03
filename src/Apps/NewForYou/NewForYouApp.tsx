import React, { FC } from "react"
import { MetaTags } from "Components/MetaTags"
import { Message, Spacer, Text } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { NewForYouApp_viewer$data } from "__generated__/NewForYouApp_viewer.graphql"
import { NewForYouArtworksGridFragmentContainer } from "Apps/NewForYou/Components/NewForYouArtworksGrid"
import { RouterLink } from "System/Router/RouterLink"
import { useSystemContext } from "System"
import { useRouter } from "System/Router/useRouter"

interface NewForYouAppProps {
  viewer: NewForYouApp_viewer$data
}

export const NewForYouApp: FC<NewForYouAppProps> = ({ viewer }) => {
  const { isLoggedIn } = useSystemContext()
  const { route } = useRouter()

  return (
    <>
      <Spacer y={2} />
      <MetaTags title="New For You" />
      <Text variant="xl" mt={4}>
        New Works for You
      </Text>
      <Spacer y={4} />
      {!isLoggedIn && (
        <>
          <Message variant="warning">
            <RouterLink to={`/login?redirectTo=${route.path}`}>
              Log in
            </RouterLink>{" "}
            to see your personalized recommendations.
          </Message>
          <Spacer y={4} />
        </>
      )}

      {viewer && <NewForYouArtworksGridFragmentContainer viewer={viewer} />}
    </>
  )
}

export const NewForYouAppFragmentContainer = createFragmentContainer(
  NewForYouApp,
  {
    viewer: graphql`
      fragment NewForYouApp_viewer on Viewer
        @argumentDefinitions(
          first: { type: "Int" }
          includeBackfill: { type: "Boolean!" }
          version: { type: "String" }
          maxWorksPerArtist: { type: "Int" }
        ) {
        ...NewForYouArtworksGrid_viewer
          @arguments(
            first: $first
            includeBackfill: $includeBackfill
            version: $version
            maxWorksPerArtist: $maxWorksPerArtist
          )
      }
    `,
  }
)

import { LogInPrompt } from "Apps/Components/LogInPrompt"
import { NewForYouArtworksGridFragmentContainer } from "Apps/NewForYou/Components/NewForYouArtworksGrid"
import { MetaTags } from "Components/MetaTags"
import { type AuthContextModule, ContextModule } from "@artsy/cohesion"
import { Spacer, Text } from "@artsy/palette"
import type { NewForYouApp_viewer$data } from "__generated__/NewForYouApp_viewer.graphql"
import type { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"

interface NewForYouAppProps {
  viewer: NewForYouApp_viewer$data
}

export const NewForYouApp: FC<React.PropsWithChildren<NewForYouAppProps>> = ({
  viewer,
}) => {
  return (
    <>
      <MetaTags title="New For You" />

      <Spacer y={4} />

      <Text variant="xl">New Works for You</Text>

      <Spacer y={4} />

      <LogInPrompt
        contextModule={ContextModule.newWorksForYouRail as AuthContextModule}
      />

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

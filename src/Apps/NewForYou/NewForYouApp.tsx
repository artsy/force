import React, { FC } from "react"
import { MetaTags } from "Components/MetaTags"
import { Clickable, Message, Spacer, Text } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { NewForYouApp_viewer$data } from "__generated__/NewForYouApp_viewer.graphql"
import { NewForYouArtworksGridFragmentContainer } from "Apps/NewForYou/Components/NewForYouArtworksGrid"
import { useSystemContext } from "System/useSystemContext"
import { useAuthDialog } from "Components/AuthDialog"
import { AuthContextModule, ContextModule } from "@artsy/cohesion"

interface NewForYouAppProps {
  viewer: NewForYouApp_viewer$data
}

export const NewForYouApp: FC<NewForYouAppProps> = ({ viewer }) => {
  const { isLoggedIn } = useSystemContext()

  const { showAuthDialog } = useAuthDialog()

  const handleClick = () => {
    showAuthDialog({
      mode: "Login",
      options: {
        title: mode => {
          const action = mode === "Login" ? "Log in" : "Sign up"
          return `${action} to see your personalized recommendations`
        },
      },
      analytics: {
        contextModule: ContextModule.newWorksForYouRail as AuthContextModule,
      },
    })
  }

  return (
    <>
      <MetaTags title="New For You" />

      <Spacer y={4} />

      <Text variant="xl">New Works for You</Text>

      <Spacer y={4} />

      {!isLoggedIn && (
        <>
          <Message variant="warning">
            <Clickable onClick={handleClick} textDecoration="underline">
              Log in
            </Clickable>{" "}
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

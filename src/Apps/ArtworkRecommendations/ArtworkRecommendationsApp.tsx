import { type AuthContextModule, ContextModule } from "@artsy/cohesion"
import { Spacer, Text } from "@artsy/palette"
import { LogInPrompt } from "Apps/Components/LogInPrompt"
import { ArtworkRecommendationsArtworksGridFragmentContainer } from "Apps/ArtworkRecommendations/Components/ArtworkRecommendationsArtworksGrid"
import { MetaTags } from "Components/MetaTags"
import type { ArtworkRecommendationsApp_me$data } from "__generated__/ArtworkRecommendationsApp_me.graphql"
import type { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"

interface ArtworkRecommendationsAppProps {
  me: ArtworkRecommendationsApp_me$data
}

export const ArtworkRecommendationsApp: FC<
  React.PropsWithChildren<ArtworkRecommendationsAppProps>
> = ({ me }) => {
  return (
    <>
      <MetaTags title="We Think You'll Love" />

      <Spacer y={4} />

      <Text variant="xl">We Think You'll Love</Text>

      <Spacer y={4} />

      <LogInPrompt
        contextModule={
          ContextModule.artworkRecommendationsRail as AuthContextModule
        }
      />

      {me && <ArtworkRecommendationsArtworksGridFragmentContainer me={me} />}
    </>
  )
}

export const ArtworkRecommendationsAppFragmentContainer =
  createFragmentContainer(ArtworkRecommendationsApp, {
    me: graphql`
      fragment ArtworkRecommendationsApp_me on Me
      @argumentDefinitions(first: { type: "Int" }) {
        ...ArtworkRecommendationsArtworksGrid_me @arguments(first: $first)
      }
    `,
  })

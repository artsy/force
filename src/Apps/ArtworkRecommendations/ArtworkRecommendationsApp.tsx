import { ArtworkRecommendationsArtworksGrid } from "Apps/ArtworkRecommendations/Components/ArtworkRecommendationsArtworksGrid"
import { LogInPrompt } from "Apps/Components/LogInPrompt"
import { MetaTags } from "Components/MetaTags"
import { type AuthContextModule, ContextModule } from "@artsy/cohesion"
import { Spacer, Text } from "@artsy/palette"
import type { ArtworkRecommendationsApp_me$key } from "__generated__/ArtworkRecommendationsApp_me.graphql"
import type { FC } from "react"
import { graphql, useFragment } from "react-relay"

interface ArtworkRecommendationsAppProps {
  me: ArtworkRecommendationsApp_me$key
}

export const ArtworkRecommendationsApp: FC<
  React.PropsWithChildren<ArtworkRecommendationsAppProps>
> = ({ me }) => {
  const data = useFragment(FRAGMENT, me)

  return (
    <>
      <MetaTags title="We Think You’ll Love" />

      <Spacer y={4} />

      <Text variant="xl">We Think You’ll Love</Text>

      <Spacer y={4} />

      <LogInPrompt
        contextModule={
          ContextModule.artworkRecommendationsRail as AuthContextModule
        }
      />

      {data && <ArtworkRecommendationsArtworksGrid me={data} />}
    </>
  )
}

const FRAGMENT = graphql`
  fragment ArtworkRecommendationsApp_me on Me
  @argumentDefinitions(first: { type: "Int" }, after: { type: "String" }) {
    ...ArtworkRecommendationsArtworksGrid_me
      @arguments(first: $first, after: $after)
  }
`

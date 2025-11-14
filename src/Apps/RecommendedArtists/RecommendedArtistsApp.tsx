import { LogInPrompt } from "Apps/Components/LogInPrompt"
import { RecommendedArtistsGrid } from "Apps/RecommendedArtists/Components/RecommendedArtistsGrid"
import { MetaTags } from "Components/MetaTags"
import { type AuthContextModule, ContextModule } from "@artsy/cohesion"
import { Spacer, Text } from "@artsy/palette"
import type { RecommendedArtistsApp_me$key } from "__generated__/RecommendedArtistsApp_me.graphql"
import type { FC } from "react"
import { graphql, useFragment } from "react-relay"

interface RecommendedArtistsAppProps {
  me: RecommendedArtistsApp_me$key
}

export const RecommendedArtistsApp: FC<
  React.PropsWithChildren<RecommendedArtistsAppProps>
> = ({ me }) => {
  const data = useFragment(FRAGMENT, me)

  return (
    <>
      <MetaTags title="Recommended Artists" />

      <Spacer y={4} />

      <Text variant="xl">Recommended Artists</Text>

      <Spacer y={4} />

      <LogInPrompt
        contextModule={
          ContextModule.recommendedArtistsRail as AuthContextModule
        }
      />

      {data && <RecommendedArtistsGrid me={data} />}
    </>
  )
}

const FRAGMENT = graphql`
  fragment RecommendedArtistsApp_me on Me
  @argumentDefinitions(first: { type: "Int" }, after: { type: "String" }) {
    ...RecommendedArtistsGrid_me @arguments(first: $first, after: $after)
  }
`

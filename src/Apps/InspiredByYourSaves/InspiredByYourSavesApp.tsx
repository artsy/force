import { type AuthContextModule, ContextModule } from "@artsy/cohesion"
import { Spacer, Text } from "@artsy/palette"
import { InspiredByYourSavesArtworksGrid } from "Apps/InspiredByYourSaves/Components/InspiredByYourSavesArtworksGrid"
import { LogInPrompt } from "Apps/Components/LogInPrompt"
import { MetaTags } from "Components/MetaTags"
import { BASED_ON_YOUR_RECENT_SAVES_TITLE } from "Apps/Home/Components/HomeBasedOnYourRecentSavesRail"
import type { InspiredByYourSavesApp_me$key } from "__generated__/InspiredByYourSavesApp_me.graphql"
import type { FC } from "react"
import { graphql, useFragment } from "react-relay"

interface InspiredByYourSavesAppProps {
  me: InspiredByYourSavesApp_me$key
}

export const InspiredByYourSavesApp: FC<
  React.PropsWithChildren<InspiredByYourSavesAppProps>
> = ({ me }) => {
  const data = useFragment(FRAGMENT, me)

  return (
    <>
      <MetaTags title={BASED_ON_YOUR_RECENT_SAVES_TITLE} />

      <Spacer y={4} />

      <Text variant="xl">{BASED_ON_YOUR_RECENT_SAVES_TITLE}</Text>

      <Spacer y={4} />

      <LogInPrompt
        contextModule={
          ContextModule.basedOnYourRecentSavesRail as AuthContextModule
        }
      />

      {data && <InspiredByYourSavesArtworksGrid me={data} />}
    </>
  )
}

const FRAGMENT = graphql`
  fragment InspiredByYourSavesApp_me on Me
  @argumentDefinitions(first: { type: "Int" }, after: { type: "String" }) {
    ...InspiredByYourSavesArtworksGrid_me
      @arguments(first: $first, after: $after)
  }
`

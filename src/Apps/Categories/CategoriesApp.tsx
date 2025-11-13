import { AppContainer } from "Apps/Components/AppContainer"
import { MetaTags } from "Components/MetaTags"
import { Sticky } from "Components/Sticky"
import { FullBleed, Spacer, useTheme } from "@artsy/palette"
import type { CategoriesApp_geneFamiliesConnection$data } from "__generated__/CategoriesApp_geneFamiliesConnection.graphql"
import type * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { CategoriesIntro } from "./Components/CategoriesIntro"
import { GeneFamiliesFragmentContainer } from "./Components/GeneFamilies"
import { StickyNavFragmentContainer } from "./Components/StickyNav"

interface CategoriesAppProps {
  geneFamiliesConnection: CategoriesApp_geneFamiliesConnection$data
}

const CategoriesApp: React.FC<React.PropsWithChildren<CategoriesAppProps>> = ({
  geneFamiliesConnection,
}) => {
  const { theme } = useTheme()

  return (
    <>
      <MetaTags pathname="categories" />

      <Spacer y={[2, 4]} />

      <CategoriesIntro />

      <Spacer y={6} />

      <Sticky>
        {({ stuck }) => {
          return (
            <FullBleed
              backgroundColor="mono0"
              style={
                stuck ? { boxShadow: theme.effects.dropShadow } : undefined
              }
            >
              <AppContainer maxWidth="none">
                <Spacer y={1} />

                <StickyNavFragmentContainer
                  geneFamiliesConnection={geneFamiliesConnection}
                />

                <Spacer y={1} />
              </AppContainer>
            </FullBleed>
          )
        }}
      </Sticky>

      <Spacer y={6} />

      <GeneFamiliesFragmentContainer
        geneFamiliesConnection={geneFamiliesConnection}
      />
    </>
  )
}

export const CategoriesAppFragmentContainer = createFragmentContainer(
  CategoriesApp,
  {
    geneFamiliesConnection: graphql`
      fragment CategoriesApp_geneFamiliesConnection on GeneFamilyConnection {
        ...StickyNav_geneFamiliesConnection
        ...GeneFamilies_geneFamiliesConnection
      }
    `,
  }
)

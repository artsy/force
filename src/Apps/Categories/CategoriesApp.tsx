import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { MetaTags } from "Components/MetaTags"
import { CategoriesIntro } from "./Components/CategoriesIntro"
import { GeneFamiliesFragmentContainer } from "./Components/GeneFamilies"
import { CategoriesApp_geneFamiliesConnection$data } from "__generated__/CategoriesApp_geneFamiliesConnection.graphql"
import { StickyNavFragmentContainer } from "./Components/StickyNav"
import { DROP_SHADOW, FullBleed, Spacer } from "@artsy/palette"
import { Sticky } from "Components/Sticky"
import { AppContainer } from "Apps/Components/AppContainer"

interface CategoriesAppProps {
  geneFamiliesConnection: CategoriesApp_geneFamiliesConnection$data
}

const CategoriesApp: React.FC<CategoriesAppProps> = ({
  geneFamiliesConnection,
}) => {
  return (
    <>
      <MetaTags pathname="categories" />

      <Spacer mt={[2, 4]} />

      <CategoriesIntro />

      <Spacer mt={6} />

      <Sticky>
        {({ stuck }) => {
          return (
            <FullBleed
              backgroundColor="white100"
              style={stuck ? { boxShadow: DROP_SHADOW } : undefined}
            >
              <AppContainer maxWidth="none">
                <Spacer mt={1} />

                <StickyNavFragmentContainer
                  geneFamiliesConnection={geneFamiliesConnection}
                />

                <Spacer mt={1} />
              </AppContainer>
            </FullBleed>
          )
        }}
      </Sticky>

      <Spacer mt={6} />

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

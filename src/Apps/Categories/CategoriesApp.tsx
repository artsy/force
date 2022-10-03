import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { MetaTags } from "Components/MetaTags"
import { CategoriesIntro } from "./Components/CategoriesIntro"
import { GeneFamiliesFragmentContainer } from "./Components/GeneFamilies"
import { CategoriesApp_geneFamiliesConnection$data } from "__generated__/CategoriesApp_geneFamiliesConnection.graphql"
import { StickyNavFragmentContainer } from "./Components/StickyNav"
import { DROP_SHADOW, FullBleed, Spacer } from "@artsy/palette"
import { StickyProvider, Sticky } from "Components/Sticky"
import { AppContainer } from "../Components/AppContainer"
import { useNavBarHeight } from "Components/NavBar/useNavBarHeight"
import { Media } from "Utils/Responsive"

interface CategoriesAppProps {
  geneFamiliesConnection: CategoriesApp_geneFamiliesConnection$data
}

const CategoriesApp: React.FC<CategoriesAppProps> = props => {
  const { geneFamiliesConnection } = props
  const { mobile, desktop } = useNavBarHeight()

  return (
    <>
      <MetaTags pathname="categories" />
      <Spacer mt={[2, 4]} />
      <CategoriesIntro />
      <Spacer mt={6} />
      <StickyProvider>
        <Sticky>
          {({ stuck }) => {
            return (
              <FullBleed
                backgroundColor="white100"
                style={stuck ? { boxShadow: DROP_SHADOW } : undefined}
              >
                <AppContainer maxWidth="none">
                  <Spacer pb={1} />
                  <Media at="xs">
                    <StickyNavFragmentContainer
                      navBarHeight={mobile}
                      // @ts-ignore RELAY UPGRADE 13
                      geneFamiliesConnection={geneFamiliesConnection}
                    />
                  </Media>
                  <Media greaterThan="xs">
                    <StickyNavFragmentContainer
                      navBarHeight={desktop}
                      // @ts-ignore RELAY UPGRADE 13
                      geneFamiliesConnection={geneFamiliesConnection}
                    />
                  </Media>
                  <Spacer pb={1} />
                </AppContainer>
              </FullBleed>
            )
          }}
        </Sticky>
      </StickyProvider>
      <Spacer mt={6} />
      <GeneFamiliesFragmentContainer
        // @ts-ignore RELAY UPGRADE 13
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

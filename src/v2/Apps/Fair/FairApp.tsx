import React from "react"
import { AppContainer } from "v2/Apps/Components/AppContainer"
import { createFragmentContainer, graphql } from "react-relay"
import { FairApp_fair } from "v2/__generated__/FairApp_fair.graphql"
import { Box, CSSGrid, Separator, Text } from "@artsy/palette"
import { HorizontalPadding } from "v2/Apps/Components/HorizontalPadding"
import { Footer } from "v2/Components/Footer"
import { ErrorPage } from "v2/Components/ErrorPage"
import { FairEditorialFragmentContainer as FairEditorial } from "./Components/FairEditorial"
import { FairHeaderFragmentContainer as FairHeader } from "./Components/FairHeader"
import { RouteTab, RouteTabs } from "v2/Components/RouteTabs"
import { FairMetaFragmentContainer as FairMeta } from "./Components/FairMeta"
import { FairCollectionsFragmentContainer as FairCollections } from "./Components/FairCollections"

interface FairAppProps {
  fair: FairApp_fair
}

const FairApp: React.FC<FairAppProps> = ({ children, fair }) => {
  if (!fair) return <ErrorPage code={404} />

  const hasArticles = fair.articles.edges.length > 0
  const hasCollections = fair.marketingCollections.length > 0
  const columnCount = hasArticles && hasCollections ? 2 : 1

  return (
    <>
      <FairMeta fair={fair} />

      <AppContainer>
        <HorizontalPadding>
          <FairHeader mt={2} fair={fair} />

          {hasArticles && (
            <Box my={3} pt={3} borderTop="1px solid" borderColor="black10">
              <Text variant="subtitle" as="h3" mb={2}>
                Related articles
              </Text>

              <CSSGrid
                gridAutoFlow="row"
                gridColumnGap={3}
                gridRowGap={2}
                gridTemplateColumns={[
                  "repeat(1, 1fr)",
                  `repeat(${columnCount}, 1fr)`,
                ]}
              >
                <FairEditorial fair={fair} />
              </CSSGrid>
            </Box>
          )}

          {hasCollections && (
            <Box my={3} pt={3} borderTop="1px solid" borderColor="black10">
              <Text variant="subtitle" as="h3" mb={2}>
                Curated highlights
              </Text>

              <FairCollections fair={fair} />
            </Box>
          )}

          <RouteTabs>
            <RouteTab to={`/fair2/${fair.slug}`} exact>
              Exhibitors
            </RouteTab>

            <RouteTab to={`/fair2/${fair.slug}/artworks`} exact>
              Artworks
            </RouteTab>
          </RouteTabs>

          {children}

          <Separator as="hr" my={3} />

          <Footer />
        </HorizontalPadding>
      </AppContainer>
    </>
  )
}

// Top-level route needs to be exported for bundle splitting in the router
export default createFragmentContainer(FairApp, {
  fair: graphql`
    fragment FairApp_fair on Fair {
      slug
      ...FairMeta_fair
      ...FairHeader_fair
      ...FairEditorial_fair
      ...FairCollections_fair
      articles: articlesConnection(first: 5, sort: PUBLISHED_AT_DESC) {
        edges {
          __typename
        }
      }
      marketingCollections(size: 4) {
        __typename
      }
    }
  `,
})

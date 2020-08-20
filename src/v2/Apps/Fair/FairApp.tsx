import React from "react"
import { AppContainer } from "v2/Apps/Components/AppContainer"
import { createFragmentContainer, graphql } from "react-relay"
import { FairApp_fair } from "v2/__generated__/FairApp_fair.graphql"
import { Col, Grid, Row, Separator, Text } from "@artsy/palette"
import { HorizontalPadding } from "v2/Apps/Components/HorizontalPadding"
import { Footer } from "v2/Components/Footer"
import { ErrorPage } from "v2/Components/ErrorPage"
import { FairEditorialFragmentContainer as FairEditorial } from "./Components/FairEditorial"
import { FairHeaderFragmentContainer as FairHeader } from "./Components/FairHeader"
import { RouteTab, RouteTabs } from "v2/Components/RouteTabs"

interface FairAppProps {
  fair: FairApp_fair
}

const FairApp: React.FC<FairAppProps> = ({ children, fair }) => {
  if (!fair) return <ErrorPage code={404} />

  return (
    <>
      <AppContainer>
        <HorizontalPadding>
          <FairHeader mt={2} fair={fair} />

          {fair.articles.edges.length > 0 && (
            <Grid mt={3} pt={3} borderTop="1px solid" borderColor="black10">
              <Row>
                <Col sm="6" mx="auto">
                  <Text variant="subtitle" as="h3" mb={2}>
                    Related articles
                  </Text>

                  <FairEditorial fair={fair} />
                </Col>
              </Row>
            </Grid>
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
      ...FairHeader_fair
      ...FairEditorial_fair
      articles: articlesConnection(first: 5, sort: PUBLISHED_AT_DESC) {
        edges {
          __typename
        }
      }
    }
  `,
})

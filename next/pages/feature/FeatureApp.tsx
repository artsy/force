import React from "react"
import { AppContainer } from "../../components/AppContainer"
import { createFragmentContainer, graphql } from "react-relay"
import FeatureMetaFragmentContainer from "./Components/FeatureMeta"
import FeatureHeader from "./Components/FeatureHeader/FeatureHeader"
// import { FeatureApp_feature } from "v2/__generated__/FeatureApp_feature.graphql"
import {
  Box,
  Col,
  Grid,
  HTML,
  Join,
  Row,
  Separator,
  Spacer,
} from "@artsy/palette"
import { HorizontalPadding } from "../../components/HorizontalPadding"
import FeatureSet from "./Components/FeatureSet/FeatureSet"
import { Footer } from "../../components/Footer"
import { NAV_BAR_HEIGHT, NavBar } from "../../components/NavBar"

interface FeatureAppProps {
  feature: any
}

const FeatureApp: React.FC<FeatureAppProps> = ({ feature }) => {
  if (!feature) return null

  return (
    <>
      {/* <FeatureMeta feature={feature} /> */}

      <Box pb={NAV_BAR_HEIGHT}>
        <Box left={0} position="fixed" width="100%" zIndex={100}>
          <NavBar />
        </Box>
      </Box>

      <FeatureHeader feature={feature} />

      <AppContainer>
        <HorizontalPadding>
          {(feature.description || feature.callout) && (
            <Grid my={3} px={3}>
              <Row>
                <Col sm={8} mx="auto">
                  <Join separator={<Spacer my={3} />}>
                    {feature.description && (
                      <HTML variant="text" html={feature.description} />
                    )}

                    {feature.callout && (
                      <HTML variant="title" html={feature.callout} />
                    )}
                  </Join>
                </Col>
              </Row>
            </Grid>
          )}

          {feature.sets.edges.length > 0 &&
            feature.sets.edges.map(
              ({ node: set }) => set && <FeatureSet key={set.id} set={set} />
            )}

          <Separator my={3} />

          <Footer />
        </HorizontalPadding>
      </AppContainer>
    </>
  )
}

// Top-level route needs to be exported for bundle splitting in the router
export default createFragmentContainer(FeatureApp, {
  feature: graphql`
    fragment FeatureApp_feature on Feature {
      ...FeatureMeta_feature
      ...FeatureHeader_feature
      description(format: HTML)
      callout(format: HTML)
      sets: setsConnection(first: 20) {
        edges {
          node {
            id
            ...FeatureSet_set
          }
        }
      }
    }
  `,
})

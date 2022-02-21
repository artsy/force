import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { FeatureMetaFragmentContainer as FeatureMeta } from "./Components/FeatureMeta"
import { FeatureHeaderFragmentContainer as FeatureHeader } from "./Components/FeatureHeader"
import { FeatureApp_feature$data } from "v2/__generated__/FeatureApp_feature.graphql"
import { Join, Spacer, HTML } from "@artsy/palette"
import { FeatureSetFragmentContainer as FeatureSet } from "./Components/FeatureSet"

interface FeatureAppProps {
  feature: FeatureApp_feature$data
}

const FeatureApp: React.FC<FeatureAppProps> = ({ feature }) => {
  if (!feature) return null

  return (
    <>
      <FeatureMeta feature={feature} />
      <FeatureHeader feature={feature} />

      {(feature.description || feature.callout) && (
        <>
          <Spacer my={2} />
          <Join separator={<Spacer my={2} />}>
            {feature.description && (
              <HTML variant={["md", "lg"]} html={feature.description} />
            )}

            {feature.callout && (
              <HTML variant={["xs", "md"]} html={feature.callout} />
            )}
          </Join>
        </>
      )}
      <Spacer mb={12} />
      {feature.sets?.edges &&
        feature.sets.edges.length > 0 &&
        feature.sets.edges.map(
          edge =>
            edge?.node && <FeatureSet key={edge.node.id} set={edge.node} />
        )}
    </>
  )
}

// Top-level route needs to be exported for bundle splitting in the router
export const FeatureAppFragmentContainer = createFragmentContainer(FeatureApp, {
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

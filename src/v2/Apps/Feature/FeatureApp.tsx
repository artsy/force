import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { FeatureMetaFragmentContainer as FeatureMeta } from "./Components/FeatureMeta"
import { FeatureHeaderFragmentContainer as FeatureHeader } from "./Components/FeatureHeader"
import { FeatureApp_feature } from "v2/__generated__/FeatureApp_feature.graphql"
import { Text, Join, Spacer } from "@artsy/palette"
import { FeatureSetFragmentContainer as FeatureSet } from "./Components/FeatureSet"

interface FeatureAppProps {
  feature: FeatureApp_feature
}

const FeatureApp: React.FC<FeatureAppProps> = ({ feature }) => {
  if (!feature) return null

  return (
    <>
      <FeatureMeta feature={feature} />
      <Spacer mt={4} />
      <FeatureHeader feature={feature} />

      {(feature.description || feature.callout) && (
        <Join separator={<Spacer my={3} />}>
          {feature.description && (
            <Text variant={["md", "lg"]}>{feature.description}</Text>
          )}

          {feature.callout && <Text variant="lg">{feature.callout}</Text>}
        </Join>
      )}
      <Spacer mb={12} />
      {/* @ts-expect-error STRICT_NULL_CHECK */}
      {feature.sets.edges.length > 0 &&
        // @ts-expect-error STRICT_NULL_CHECK
        feature.sets.edges.map(
          // @ts-expect-error STRICT_NULL_CHECK
          ({ node: set }) => set && <FeatureSet key={set.id} set={set} />
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
      description
      callout
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

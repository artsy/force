import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
// import { FeatureHeader_feature } from "v2/__generated__/FeatureHeader_feature.graphql"
import FeatureHeaderFull from "./FeatureHeaderFull"
import FeatureHeaderDefault from "./FeatureHeaderDefault"

export interface FeatureHeaderProps {
  feature: any
}

export const FeatureHeader: React.FC<FeatureHeaderProps> = ({ feature }) => {
  if (!feature) {
    return null
  }

  if (feature.layout === "FULL") {
    return <FeatureHeaderFull feature={feature} />
  }

  return <FeatureHeaderDefault feature={feature} />
}

export default createFragmentContainer(FeatureHeader, {
  feature: graphql`
    fragment FeatureHeader_feature on Feature {
      ...FeatureHeaderDefault_feature
      ...FeatureHeaderFull_feature
      layout
    }
  `,
})

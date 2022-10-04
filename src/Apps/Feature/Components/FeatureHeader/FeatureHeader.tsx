import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { FeatureHeader_feature$data } from "__generated__/FeatureHeader_feature.graphql"
import { FeatureHeaderFullFragmentContainer as FeatureHeaderFull } from "./FeatureHeaderFull"
import { FeatureHeaderDefaultFragmentContainer as FeatureHeaderDefault } from "./FeatureHeaderDefault"

export interface FeatureHeaderProps {
  feature: FeatureHeader_feature$data
}

export const FeatureHeader: React.FC<FeatureHeaderProps> = ({ feature }) => {
  if (feature.layout === "FULL") {
    return <FeatureHeaderFull feature={feature} />
  }

  return <FeatureHeaderDefault feature={feature} />
}

export const FeatureHeaderFragmentContainer = createFragmentContainer(
  FeatureHeader,
  {
    feature: graphql`
      fragment FeatureHeader_feature on Feature {
        ...FeatureHeaderDefault_feature
        ...FeatureHeaderFull_feature
        layout
      }
    `,
  }
)

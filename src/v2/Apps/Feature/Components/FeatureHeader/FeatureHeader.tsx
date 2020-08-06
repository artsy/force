import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { FeatureHeader_feature } from "v2/__generated__/FeatureHeader_feature.graphql"
import { FeatureHeaderFullFragmentContainer as FeatureHeaderFull } from "./FeatureHeaderFull"
import { FeatureHeaderDefaultFragmentContainer as FeatureHeaderDefault } from "./FeatureHeaderDefault"

export interface FeatureHeaderProps {
  feature: FeatureHeader_feature
  layout: "default" | "full"
}

export const FeatureHeader: React.FC<FeatureHeaderProps> = ({
  feature,
  layout = "default",
}) => {
  if (layout === "full") {
    return <FeatureHeaderFull feature={feature} layout={layout} />
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
      }
    `,
  }
)

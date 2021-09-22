import React from "react"
import { Text } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { FeatureHeaderDefault_feature } from "v2/__generated__/FeatureHeaderDefault_feature.graphql"

export interface FeatureHeaderDefaultProps {
  feature: FeatureHeaderDefault_feature
}

export const FeatureHeaderDefault: React.FC<FeatureHeaderDefaultProps> = ({
  feature: { name },
}) => {
  return (
    <Text as="h1" variant={["xl", "xxl"]} mb={1}>
      {name}
    </Text>
  )
}

export const FeatureHeaderDefaultFragmentContainer = createFragmentContainer(
  FeatureHeaderDefault,
  {
    feature: graphql`
      fragment FeatureHeaderDefault_feature on Feature {
        name
      }
    `,
  }
)

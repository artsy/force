import type { FeatureHeader_feature$data } from "__generated__/FeatureHeader_feature.graphql"
import type * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { FeatureHeaderDefaultFragmentContainer } from "./FeatureHeaderDefault"
import { FeatureHeaderFullFragmentContainer } from "./FeatureHeaderFull"

export interface FeatureHeaderProps {
  feature: FeatureHeader_feature$data
}

export const FeatureHeader: React.FC<
  React.PropsWithChildren<FeatureHeaderProps>
> = ({ feature }) => {
  if (feature.layout === "FULL") {
    return <FeatureHeaderFullFragmentContainer feature={feature} />
  }

  return <FeatureHeaderDefaultFragmentContainer feature={feature} />
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
  },
)

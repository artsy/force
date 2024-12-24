import { MetaTags } from "Components/MetaTags"
import type { FeatureMeta_feature$data } from "__generated__/FeatureMeta_feature.graphql"
import type * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"

interface FeatureMetaProps {
  feature: FeatureMeta_feature$data
}

const FeatureMeta: React.FC<React.PropsWithChildren<FeatureMetaProps>> = ({
  feature: {
    meta: { description, name, image },
    slug,
  },
}) => {
  return (
    <MetaTags
      title={name}
      description={description}
      imageURL={image}
      pathname={`/feature/${slug}`}
    />
  )
}

export const FeatureMetaFragmentContainer = createFragmentContainer(
  FeatureMeta,
  {
    feature: graphql`
      fragment FeatureMeta_feature on Feature {
        slug
        meta {
          name
          description
          image
        }
      }
    `,
  },
)

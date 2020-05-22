import React from "react"
import { Link, Meta, Title } from "react-head"
import { createFragmentContainer, graphql } from "react-relay"
import { FeatureMeta_feature } from "v2/__generated__/FeatureMeta_feature.graphql"
import { getENV } from "v2/Utils/getENV"

interface FeatureMetaProps {
  feature: FeatureMeta_feature
}

const FeatureMeta: React.FC<FeatureMetaProps> = ({
  feature: { image, metaDescription: description, name, slug },
}) => {
  const href = `${getENV("APP_URL")}/feature/${slug}`
  const imageURL = image?.url

  return (
    <>
      <Title>{name}</Title>
      <Meta property="og:title" content={name} />
      <Meta name="description" content={description} />
      <Meta property="og:description" content={description} />
      <Meta property="twitter:description" content={description} />
      <Link rel="canonical" href={href} />
      <Meta property="og:url" content={href} />
      <Meta property="og:type" content="website" />
      <Meta property="twitter:card" content="summary" />
      <Meta name="fragment" content="!" />
      {imageURL && <Meta property="og:image" content={imageURL} />}
    </>
  )
}

export const FeatureMetaFragmentContainer = createFragmentContainer(
  FeatureMeta,
  {
    feature: graphql`
      fragment FeatureMeta_feature on Feature {
        name
        slug
        metaDescription: description(format: PLAIN)
        image {
          url(version: "large_rectangle")
        }
      }
    `,
  }
)

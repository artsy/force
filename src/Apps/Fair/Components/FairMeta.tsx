import * as React from "react"
import { Link, Meta, Title } from "react-head"
import { createFragmentContainer, graphql } from "react-relay"
import { FairMeta_fair$data } from "__generated__/FairMeta_fair.graphql"
import { getENV } from "Utils/getENV"

interface FairMetaProps {
  fair: FairMeta_fair$data
}

const FairMeta: React.FC<FairMetaProps> = ({
  fair: { name, slug, metaDescription, metaImage },
}) => {
  const title = `${name} | Artsy`
  const href = `${getENV("APP_URL")}/fair/${slug}`

  return (
    <>
      <Title>{title}</Title>
      <Meta property="og:title" content={title} />
      {metaDescription && (
        <>
          <Meta name="description" content={metaDescription} />
          <Meta property="og:description" content={metaDescription} />
          <Meta property="twitter:description" content={metaDescription} />
        </>
      )}
      <Link rel="canonical" href={href} />
      <Meta property="og:url" content={href} />
      <Meta property="og:type" content="website" />
      <Meta property="twitter:card" content="summary" />
      {metaImage && <Meta property="og:image" content={metaImage.src} />}
    </>
  )
}

export const FairMetaFragmentContainer = createFragmentContainer(FairMeta, {
  fair: graphql`
    fragment FairMeta_fair on Fair {
      name
      slug
      metaDescription: summary
      metaImage: image {
        src: url(version: "large_rectangle")
      }
    }
  `,
})

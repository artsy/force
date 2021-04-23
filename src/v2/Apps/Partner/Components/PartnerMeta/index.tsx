import React from "react"
import { Link, Meta, Title } from "react-head"
import { createFragmentContainer, graphql } from "react-relay"
import { PartnerMeta_partner } from "v2/__generated__/PartnerMeta_partner.graphql"
import { getENV } from "v2/Utils/getENV"
import { useRouter } from "v2/Artsy/Router/useRouter"

interface PartnerMetaProps {
  partner: PartnerMeta_partner
}

const PartnerMeta: React.FC<PartnerMetaProps> = ({
  partner: {
    slug,
    type,
    meta: { description, image, title },
  },
}) => {
  const {
    match: {
      params: { artistId },
      location: { pathname },
    },
  } = useRouter()

  const href = `${getENV("APP_URL")}${pathname}`
  const canonicalHref = artistId
    ? `${getENV("APP_URL")}/partner2/${slug}/artists/${artistId}`
    : `${getENV("APP_URL")}/partner2/${slug}`

  return (
    <>
      <Title>{title}</Title>
      <Meta name="description" content={description} />

      <Meta property="og:title" content={title} />
      <Meta property="og:description" content={description} />
      <Meta property="og:url" content={href} />
      <Meta property="og:type" content="profile" />

      <Meta property="twitter:description" content={description} />
      <Meta property="twitter:card" content="summary" />

      <Meta property="profile:type" content={type} />
      <Meta property="profile:username" content={slug} />

      <Link rel="canonical" href={canonicalHref} />

      {image && <Meta property="og:image" content={image} />}
      {image && <Meta name="thumbnail" content={image} />}

      {getENV("INCLUDE_ESCAPED_FRAGMENT") && (
        <Meta name="fragment" content="!" />
      )}
    </>
  )
}

export const PartnerMetaFragmentContainer = createFragmentContainer(
  PartnerMeta,
  {
    partner: graphql`
      fragment PartnerMeta_partner on Partner {
        slug
        type
        meta {
          image
          title
          description
        }
      }
    `,
  }
)

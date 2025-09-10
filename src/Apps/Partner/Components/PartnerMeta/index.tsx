import { PartnerMetaStructuredData } from "Apps/Partner/Components/PartnerMeta/PartnerMetaStructuredData"
import { useRouter } from "System/Hooks/useRouter"
import { getENV } from "Utils/getENV"
import type { PartnerMeta_partner$data } from "__generated__/PartnerMeta_partner.graphql"
import type * as React from "react"
import { Link, Meta, Title } from "react-head"
import { createFragmentContainer, graphql } from "react-relay"

interface PartnerMetaProps {
  partner: PartnerMeta_partner$data
}

const PartnerMeta: React.FC<React.PropsWithChildren<PartnerMetaProps>> = ({
  partner,
}) => {
  const {
    match: {
      params: { artistId },
      location: { pathname },
    },
  } = useRouter()

  const { meta, slug } = partner

  const href = `${getENV("APP_URL")}${pathname}`
  const canonicalHref = artistId
    ? `${getENV("APP_URL")}/artist/${artistId}`
    : `${getENV("APP_URL")}/partner/${slug}`

  return (
    <>
      <Title>{meta?.title}</Title>
      {meta?.description && <Meta name="description" content={meta.description} />}

      {meta?.title && <Meta property="og:title" content={meta.title} />}
      {meta?.description && <Meta property="og:description" content={meta.description} />}
      <Meta property="og:url" content={href} />
      <Meta property="og:type" content="profile" />

      {meta?.description && <Meta property="twitter:description" content={meta.description} />}
      <Meta property="twitter:card" content="summary" />

      <Link rel="canonical" href={canonicalHref} />

      {meta?.image && <Meta property="og:image" content={meta?.image} />}
      {meta?.image && <Meta name="thumbnail" content={meta?.image} />}

      <PartnerMetaStructuredData partner={partner} />
    </>
  )
}

export const PartnerMetaFragmentContainer = createFragmentContainer(
  PartnerMeta,
  {
    partner: graphql`
      fragment PartnerMeta_partner on Partner {
        ...PartnerMetaStructuredData_partner
        meta {
          image
          title
          description
        }
        slug
      }
    `,
  },
)

import { PartnerMetaStructuredData } from "Apps/Partner/Components/PartnerMeta/PartnerMetaStructuredData"
import { useRouter } from "System/Hooks/useRouter"
import { getENV } from "Utils/getENV"
import { getPageNumber } from "Utils/url"
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
    match,
    match: {
      location: { pathname },
    },
  } = useRouter()

  const { meta } = partner

  const page = getPageNumber(match.location)
  const canonicalPath = page > 1 ? `${pathname}?page=${page}` : pathname

  const href = `${getENV("APP_URL")}${canonicalPath}`

  return (
    <>
      <Title>{meta?.title}</Title>
      <Meta name="description" content={meta?.description} />

      <Meta property="og:title" content={meta?.title} />
      <Meta property="og:description" content={meta?.description} />
      <Meta property="og:url" content={href} />
      <Meta property="og:type" content="profile" />

      <Meta property="twitter:description" content={meta?.description} />
      <Meta property="twitter:card" content="summary" />

      <Link rel="canonical" href={href} />

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
      }
    `,
  },
)

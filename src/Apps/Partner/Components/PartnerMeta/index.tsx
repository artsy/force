import { LocalBusiness } from "Components/Seo/LocalBusiness"
import { useRouter } from "System/Hooks/useRouter"
import { extractNodes } from "Utils/extractNodes"
import { getENV } from "Utils/getENV"
import type { PartnerMeta_partner$data } from "__generated__/PartnerMeta_partner.graphql"
import type * as React from "react"
import { Link, Meta, Title } from "react-head"
import { createFragmentContainer, graphql } from "react-relay"

interface PartnerMetaProps {
  partner: PartnerMeta_partner$data
}

const PartnerMeta: React.FC<React.PropsWithChildren<PartnerMetaProps>> = ({
  partner: { locationsConnection, meta, name, slug },
}) => {
  const {
    match: {
      params: { artistId },
      location: { pathname },
    },
  } = useRouter()

  const href = `${getENV("APP_URL")}${pathname}`
  const canonicalHref = artistId
    ? `${getENV("APP_URL")}/partner/${slug}/artists/${artistId}`
    : `${getENV("APP_URL")}/partner/${slug}`

  const partnerLocation = extractNodes(locationsConnection)[0]

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

      <Link rel="canonical" href={canonicalHref} />

      {meta?.image && <Meta property="og:image" content={meta?.image} />}
      {meta?.image && <Meta name="thumbnail" content={meta?.image} />}
      <LocalBusiness partnerLocation={partnerLocation} partnerName={name} />
    </>
  )
}

export const PartnerMetaFragmentContainer = createFragmentContainer(
  PartnerMeta,
  {
    partner: graphql`
      fragment PartnerMeta_partner on Partner {
        locationsConnection(first: 1) {
          edges {
            node {
              address
              address2
              city
              coordinates {
                lat
                lng
              }
              country
              phone
              postalCode
              state
            }
          }
        }
        meta {
          image
          title
          description
        }
        name
        slug
      }
    `,
  },
)

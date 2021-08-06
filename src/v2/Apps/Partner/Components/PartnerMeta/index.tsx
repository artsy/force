import React from "react"
import { Link, Meta, Title } from "react-head"
import { createFragmentContainer, graphql } from "react-relay"
import { PartnerMeta_partner } from "v2/__generated__/PartnerMeta_partner.graphql"
import { getENV } from "v2/Utils/getENV"
import { useRouter } from "v2/System/Router/useRouter"
import { LocalBusiness } from "v2/Components/Seo/LocalBusiness"
import { extractNodes } from "v2/Utils/extractNodes"

interface PartnerMetaProps {
  partner: PartnerMeta_partner
}

const PartnerMeta: React.FC<PartnerMetaProps> = ({
  partner: {
    locationsConnection,
    // @ts-expect-error STRICT_NULL_CHECK
    meta: { description, image, title },
    name,
    slug,
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
    ? `${getENV("APP_URL")}/partner/${slug}/artists/${artistId}`
    : `${getENV("APP_URL")}/partner/${slug}`

  const partnerLocation = extractNodes(locationsConnection)[0]

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

      <Link rel="canonical" href={canonicalHref} />

      {image && <Meta property="og:image" content={image} />}
      {image && <Meta name="thumbnail" content={image} />}
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
  }
)

import * as React from "react"
import { Link, Meta, Title } from "react-head"
import { createFragmentContainer, graphql } from "react-relay"
import { ShowMeta_show } from "v2/__generated__/ShowMeta_show.graphql"
import { getENV } from "v2/Utils/getENV"

interface ShowMetaProps {
  show: ShowMeta_show
}

const ShowMeta: React.FC<ShowMetaProps> = ({
  show: {
    name,
    slug,
    metaDescription,
    metaImage,
    partner,
    formattedStartAt,
    formattedEndAt,
  },
}) => {
  const title = `${name} | Artsy`
  const href = `${getENV("APP_URL")}/show/${slug}`

  // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
  const fallbackDescription = `Explore ${name} from ${partner.name} on Artsy. ${formattedStartAt} - ${formattedEndAt}.`
  const description = metaDescription || fallbackDescription
  return (
    <>
      <Title>{title}</Title>
      <Meta property="og:title" content={title} />
      <Meta name="description" content={description} />
      <Meta property="og:description" content={description} />
      <Meta property="twitter:description" content={description} />
      <Link rel="canonical" href={href} />
      <Meta property="og:url" content={href} />
      <Meta property="og:type" content="website" />
      <Meta property="twitter:card" content="summary" />
      {metaImage && <Meta property="og:image" content={metaImage.src} />}
    </>
  )
}

export const ShowMetaFragmentContainer = createFragmentContainer(ShowMeta, {
  show: graphql`
    fragment ShowMeta_show on Show {
      name
      slug
      metaDescription: description
      metaImage {
        src: url(version: "large")
      }
      partner {
        ... on Partner {
          name
        }
      }
      formattedStartAt: startAt(format: "MMMM D")
      formattedEndAt: endAt(format: "MMMM D, YYYY")
    }
  `,
})

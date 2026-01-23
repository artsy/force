import { useRouter } from "System/Hooks/useRouter"
import { getENV } from "Utils/getENV"
import { getPageNumber } from "Utils/url"
import type { FairMeta_fair$data } from "__generated__/FairMeta_fair.graphql"
import type * as React from "react"
import { Link, Meta, Title } from "react-head"
import { createFragmentContainer, graphql } from "react-relay"

interface FairMetaProps {
  fair: FairMeta_fair$data
}

const FairMeta: React.FC<React.PropsWithChildren<FairMetaProps>> = ({
  fair,
}) => {
  const {
    match,
    match: {
      location: { pathname },
    },
  } = useRouter()

  const { name, metaDescription, metaDescriptionFallback, metaImage } = fair

  const page = getPageNumber(match.location)
  const canonicalPath = page > 1 ? `${pathname}?page=${page}` : pathname

  const href = `${getENV("APP_URL")}${canonicalPath}`

  return (
    <>
      <Title>{`${name} | Artsy`}</Title>
      <Meta
        name="description"
        content={metaDescription || metaDescriptionFallback}
      />

      <Meta property="og:title" content={`${name} | Artsy`} />
      <Meta
        property="og:description"
        content={metaDescription || metaDescriptionFallback}
      />
      <Meta property="og:url" content={href} />
      <Meta property="og:type" content="website" />

      <Meta
        property="twitter:description"
        content={metaDescription || metaDescriptionFallback}
      />
      <Meta property="twitter:card" content="summary" />

      <Link rel="canonical" href={href} />

      {metaImage?.src && <Meta property="og:image" content={metaImage.src} />}
      {metaImage?.src && <Meta name="thumbnail" content={metaImage.src} />}
    </>
  )
}

export const FairMetaFragmentContainer = createFragmentContainer(FairMeta, {
  fair: graphql`
    fragment FairMeta_fair on Fair {
      name
      metaDescription: summary
      metaDescriptionFallback: about(format: PLAIN)
      metaImage: image {
        src: url(version: "large_rectangle")
      }
    }
  `,
})

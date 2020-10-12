import React from "react"
import { Link, Meta, Title } from "react-head"
import { createFragmentContainer, graphql } from "react-relay"
import { ShowMeta_show } from "v2/__generated__/ShowMeta_show.graphql"
import { getENV } from "v2/Utils/getENV"

interface ShowMetaProps {
  show: ShowMeta_show
}

const ShowMeta: React.FC<ShowMetaProps> = ({
  show: { name, slug, metaDescription, metaImage },
}) => {
  const title = `${name} | Artsy`
  const href = `${getENV("APP_URL")}/show/${slug}`

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

export const ShowMetaFragmentContainer = createFragmentContainer(ShowMeta, {
  show: graphql`
    fragment ShowMeta_show on Show {
      name
      slug
      metaDescription: description
      metaImage {
        src: url(version: "large")
      }
    }
  `,
})

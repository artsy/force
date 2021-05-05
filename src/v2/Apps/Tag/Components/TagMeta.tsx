import React from "react"
import { Link, Meta, Title } from "react-head"
import { createFragmentContainer, graphql } from "react-relay"
import { TagMeta_tag } from "v2/__generated__/TagMeta_tag.graphql"
import { getENV } from "v2/Utils/getENV"

interface GeneMetaProps {
  tag: TagMeta_tag
}

const TagMeta: React.FC<GeneMetaProps> = ({ tag }) => {
  const title = `${tag.name} | Artsy`
  const description = tag.description
  const href = `${getENV("APP_URL")}/${tag.href}`
  const image = tag.image?.cropped?.src

  return (
    <>
      <Title>{title}</Title>
      <Meta property="og:title" content={title} />
      {description && (
        <>
          <Meta name="description" content={description} />
          <Meta property="og:description" content={description} />
          <Meta property="twitter:description" content={description} />
        </>
      )}
      <Link rel="canonical" href={href} />
      <Meta property="og:url" content={href} />
      <Meta property="og:type" content="website" />
      <Meta property="twitter:card" content="summary" />
      {image && <Meta property="og:image" content={image} />}
    </>
  )
}

export const TagMetaFragmentContainer = createFragmentContainer(TagMeta, {
  tag: graphql`
    fragment TagMeta_tag on Tag {
      name
      href
      description
      image {
        cropped(width: 1200, height: 630) {
          src
        }
      }
    }
  `,
})

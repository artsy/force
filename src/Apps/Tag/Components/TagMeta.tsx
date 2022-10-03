import * as React from "react"
import { Link, Meta, Title } from "react-head"
import { createFragmentContainer, graphql } from "react-relay"
import { TagMeta_tag$data } from "__generated__/TagMeta_tag.graphql"
import { getENV } from "Utils/getENV"

interface GeneMetaProps {
  tag: TagMeta_tag$data
}

const TagMeta: React.FC<GeneMetaProps> = ({ tag }) => {
  const title = `${tag.name} | Artsy`

  const fallbackDescription = `Browse all artworks with the ${tag.name} tag on Artsy. Artsy has the largest collection of art on the Web; browse art by subject matter, medium, size and price.`
  const description = tag.description || fallbackDescription

  const href = `${getENV("APP_URL")}/${tag.href}`
  const image = tag.image?.cropped?.src

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

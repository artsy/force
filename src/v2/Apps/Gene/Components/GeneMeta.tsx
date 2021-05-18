import React from "react"
import { Link, Meta, Title } from "react-head"
import { createFragmentContainer, graphql } from "react-relay"
import { GeneMeta_gene } from "v2/__generated__/GeneMeta_gene.graphql"
import { getENV } from "v2/Utils/getENV"

interface GeneMetaProps {
  gene: GeneMeta_gene
}

const GeneMeta: React.FC<GeneMetaProps> = ({ gene }) => {
  const title = `${gene.name} | Artsy`
  const description = gene.meta.description
  const href = `${getENV("APP_URL")}${gene.href}`
  const image = gene.image?.cropped?.src

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

export const GeneMetaFragmentContainer = createFragmentContainer(GeneMeta, {
  gene: graphql`
    fragment GeneMeta_gene on Gene {
      name
      href
      meta {
        description
      }
      image {
        cropped(width: 1200, height: 630) {
          src
        }
      }
    }
  `,
})

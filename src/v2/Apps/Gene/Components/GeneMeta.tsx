import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { GeneMeta_gene } from "v2/__generated__/GeneMeta_gene.graphql"
import { MetaTags } from "v2/Components/MetaTags"

interface GeneMetaProps {
  gene: GeneMeta_gene
}

const GeneMeta: React.FC<GeneMetaProps> = ({ gene }) => {
  const fallbackDescription = `Explore ${gene.name} art on Artsy. Browse works by size, price, and medium.`

  return (
    <MetaTags
      title={`${gene.name} | Artsy`}
      description={gene.meta.description || fallbackDescription}
      pathname={gene.href}
      imageURL={gene.image?.cropped?.src}
    />
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

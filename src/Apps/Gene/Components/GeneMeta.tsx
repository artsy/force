import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { GeneMeta_gene$data } from "__generated__/GeneMeta_gene.graphql"
import { MetaTags } from "Components/MetaTags"

interface GeneMetaProps {
  gene: GeneMeta_gene$data
}

const GeneMeta: React.FC<GeneMetaProps> = ({ gene }) => {
  const fallbackDescription = `Explore ${gene.name} art on Artsy. Browse works by size, price, and medium.`
  const title = `${gene.displayName || gene.name} | Artsy`

  return (
    <MetaTags
      title={title}
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
      displayName
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

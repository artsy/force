import { MetaTags } from "Components/MetaTags"
import type { GeneMeta_gene$data } from "__generated__/GeneMeta_gene.graphql"
import type * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"

interface GeneMetaProps {
  gene: GeneMeta_gene$data
}

const GeneMeta: React.FC<React.PropsWithChildren<GeneMetaProps>> = ({
  gene,
}) => {
  if (!gene) return null

  const fallbackDescription = `Explore ${gene.name} art on Artsy. Browse works by size, price, and medium.`
  const title = `${gene.displayName || gene.name} | Artsy`

  return (
    <MetaTags
      title={title}
      description={gene.meta.description || fallbackDescription}
      pathname={gene.href || `/gene/${gene.slug}`}
      imageURL={gene.image?.cropped?.src}
    />
  )
}

export const GeneMetaFragmentContainer = createFragmentContainer(GeneMeta, {
  gene: graphql`
    fragment GeneMeta_gene on Gene {
      name
      displayName
      slug
      href @required(action: NONE)
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

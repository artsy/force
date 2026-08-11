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
  const title = buildTitle(gene)
  const description = buildDescription(gene)

  return (
    <MetaTags
      title={title}
      description={description}
      pathname={gene.href}
      imageURL={gene.image?.cropped?.src}
    />
  )
}

function buildTitle(gene: GeneMeta_gene$data): string {
  return `${gene.displayName || gene.name} - Art & Prints for Sale | Artsy`
}

function buildDescription(gene: GeneMeta_gene$data): string {
  const description = [
    gene.meta.description,
    `Browse ${gene.name} art on Artsy.`,
  ]
    .filter(Boolean)
    .join(" ")

  return description
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

import { MetaTags } from "Components/MetaTags"
import type { SaleMeta_sale$data } from "__generated__/SaleMeta_sale.graphql"
import truncate from "lodash/truncate"
import { createFragmentContainer, graphql } from "react-relay"

interface SaleMetaProps {
  sale: SaleMeta_sale$data
}

export const SaleMeta: React.FC<
  React.PropsWithChildren<SaleMetaProps>
> = props => {
  const { sale } = props
  const title = `${sale.name} | Artsy`
  const description = truncate(sale.description ?? "", {
    length: 160,
    separator: " ",
  })

  return (
    <MetaTags
      title={title}
      description={description}
      pathname={`/sale/${sale.slug}`}
      imageURL={sale.coverImage?.url}
    />
  )
}

export const SaleMetaFragmentContainer = createFragmentContainer(SaleMeta, {
  sale: graphql`
    fragment SaleMeta_sale on Sale {
      name
      description(format: HTML)
      slug
      coverImage {
        url(version: ["wide", "source", "large_rectangle"])
      }
    }
  `,
})

import { createFragmentContainer, graphql } from "react-relay"
import { AuctionMeta_sale } from "v2/__generated__/AuctionMeta_sale.graphql"
import { truncate } from "lodash"
import { MetaTags } from "v2/Components/MetaTags"

interface AuctionMetaProps {
  sale: AuctionMeta_sale
}

const AuctionMeta: React.FC<AuctionMetaProps> = props => {
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
      pathname={`/auction/${sale.slug}`}
    />
  )
}

export const AuctionMetaFragmentContainer = createFragmentContainer(
  AuctionMeta,
  {
    sale: graphql`
      fragment AuctionMeta_sale on Sale {
        name
        description(format: HTML)
        slug
      }
    `,
  }
)

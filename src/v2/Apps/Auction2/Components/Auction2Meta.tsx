import { createFragmentContainer, graphql } from "react-relay"
import { Auction2Meta_sale$data } from "v2/__generated__/Auction2Meta_sale.graphql"
import { truncate } from "lodash"
import { MetaTags } from "v2/Components/MetaTags"

interface Auction2MetaProps {
  sale: Auction2Meta_sale$data
}

const Auction2Meta: React.FC<Auction2MetaProps> = props => {
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
      pathname={`/auction2/${sale.slug}`}
    />
  )
}

export const Auction2MetaFragmentContainer = createFragmentContainer(
  Auction2Meta,
  {
    sale: graphql`
      fragment Auction2Meta_sale on Sale {
        name
        description(format: HTML)
        slug
      }
    `,
  }
)

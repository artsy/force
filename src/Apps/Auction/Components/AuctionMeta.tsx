import { MetaTags } from "Components/MetaTags"
import type { AuctionMeta_sale$data } from "__generated__/AuctionMeta_sale.graphql"
import { truncateText } from "Utils/truncateText"
import { createFragmentContainer, graphql } from "react-relay"

interface AuctionMetaProps {
  sale: AuctionMeta_sale$data
}

const AuctionMeta: React.FC<
  React.PropsWithChildren<AuctionMetaProps>
> = props => {
  const { sale } = props
  const title = `${sale.name} | Artsy`
  const description = truncateText(sale.description ?? "", {
    length: 160,
    separator: " ",
  })

  return (
    <MetaTags
      title={title}
      description={description}
      pathname={`/auction/${sale.slug}`}
      imageURL={sale.coverImage?.url}
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
        coverImage {
          url(version: ["wide", "source", "large_rectangle"])
        }
      }
    `,
  },
)

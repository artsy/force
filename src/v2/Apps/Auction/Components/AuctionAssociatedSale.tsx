import { Box, Image, Text } from "@artsy/palette"
import { startCase } from "lodash"
import { createFragmentContainer, graphql } from "react-relay"
import { RouterLink } from "v2/System/Router/RouterLink"
import { AuctionAssociatedSale_sale } from "v2/__generated__/AuctionAssociatedSale_sale.graphql"

interface AuctionAssociatedSaleProps {
  sale: AuctionAssociatedSale_sale
}

const AuctionAssociatedSale: React.FC<AuctionAssociatedSaleProps> = ({
  sale,
}) => {
  if (!sale.associatedSale) {
    return null
  }

  return (
    <Box maxWidth={400}>
      <RouterLink to={sale.associatedSale.href} textDecoration="none">
        {sale.associatedSale?.coverImage && (
          <Image
            src={sale.associatedSale?.coverImage.cropped?.src}
            srcSet={sale.associatedSale?.coverImage.cropped?.srcSet}
          />
        )}

        <Text variant="sm">{sale.associatedSale.name}</Text>
        <Text variant="sm" color="black60">
          {startCase(sale.associatedSale.displayTimelyAt!)
            .replace("By", "by")
            .replace(" In", " in")
            .replace(" Am", "am")
            .replace(" Pm", "pm")}
        </Text>
      </RouterLink>
    </Box>
  )
}

export const AuctionAssociatedSaleFragmentContainer = createFragmentContainer(
  AuctionAssociatedSale,
  {
    sale: graphql`
      fragment AuctionAssociatedSale_sale on Sale {
        associatedSale {
          coverImage {
            cropped(width: 260, height: 110) {
              src
              srcSet
              width
              height
            }
          }
          displayTimelyAt
          href
          slug
          name
        }
      }
    `,
  }
)

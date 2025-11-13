import { RouterLink } from "System/Components/RouterLink"
import { Column, GridColumns, Image, ResponsiveBox, Text } from "@artsy/palette"
import type { AuctionAssociatedSale_sale$data } from "__generated__/AuctionAssociatedSale_sale.graphql"
import { createFragmentContainer, graphql } from "react-relay"

interface AuctionAssociatedSaleProps {
  sale: AuctionAssociatedSale_sale$data
}

const AuctionAssociatedSale: React.FC<
  React.PropsWithChildren<AuctionAssociatedSaleProps>
> = ({ sale }) => {
  if (!sale.associatedSale) {
    return null
  }

  const image = sale.associatedSale?.coverImage?.cropped

  return (
    <GridColumns>
      <Column span={[12, 4, 3]}>
        <RouterLink
          to={sale.associatedSale.href}
          display="block"
          textDecoration="none"
        >
          <ResponsiveBox
            aspectWidth={16}
            aspectHeight={9}
            maxWidth="100%"
            bg="mono10"
          >
            {image && (
              <Image
                src={image.src}
                srcSet={image.srcSet}
                width="100%"
                height="100%"
                alt=""
                lazyLoad
                style={{ display: "block" }}
              />
            )}
          </ResponsiveBox>

          <Text variant="sm" mt={1}>
            {sale.associatedSale.name}{" "}
          </Text>
          <Text variant="sm" color="mono60">
            {sale.associatedSale.displayTimelyAt!}
          </Text>
        </RouterLink>
      </Column>
    </GridColumns>
  )
}

export const AuctionAssociatedSaleFragmentContainer = createFragmentContainer(
  AuctionAssociatedSale,
  {
    sale: graphql`
      fragment AuctionAssociatedSale_sale on Sale {
        associatedSale {
          coverImage {
            cropped(width: 445, height: 250) {
              src
              srcSet
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

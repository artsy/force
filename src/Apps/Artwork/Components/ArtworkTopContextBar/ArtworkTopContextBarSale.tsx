import { Box, Stack } from "@artsy/palette"
import { RegistrationAuctionTimerFragmentContainer } from "Apps/Artwork/Components/ArtworkTopContextBar/RegistrationAuctionTimer"
import { TopContextBar } from "Components/TopContextBar"
import type { ArtworkTopContextBarSaleQuery } from "__generated__/ArtworkTopContextBarSaleQuery.graphql"
import type * as React from "react"
import { graphql, useLazyLoadQuery } from "react-relay"

interface ArtworkTopContextBarSaleProps {
  id: string
}

export const ArtworkTopContextBarSale: React.FC<
  ArtworkTopContextBarSaleProps
> = ({ id }) => {
  const data = useLazyLoadQuery<ArtworkTopContextBarSaleQuery>(
    graphql`
      query ArtworkTopContextBarSaleQuery($id: String!) {
        sale(id: $id) {
          ...RegistrationAuctionTimer_sale
          name
          href
          isAuction
          isBenefit
          isGalleryAuction
          coverImage {
            url
          }
          partner {
            name
          }
        }
      }
    `,
    { id },
    { fetchPolicy: "store-or-network" },
  )

  if (!data.sale) return null

  const { sale } = data
  const { isAuction, isBenefit, isGalleryAuction } = sale

  const title = isAuction
    ? isBenefit
      ? "Benefit Auction"
      : isGalleryAuction
        ? "Gallery Auction"
        : "Auction"
    : "Sale"

  return (
    <TopContextBar
      href={sale.href}
      src={sale.coverImage?.url}
      displayBackArrow
      preferHistoryBack
      rightContent={<RegistrationAuctionTimerFragmentContainer sale={sale} />}
    >
      <Stack gap={1} flexDirection="row">
        {sale.name}
        <Box as="span" color="mono60">
          {sale.partner?.name ? `${title} by ${sale.partner.name}` : title}
        </Box>
      </Stack>
    </TopContextBar>
  )
}

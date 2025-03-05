import { Box, Stack } from "@artsy/palette"
import { RegistrationAuctionTimerFragmentContainer } from "Apps/Artwork/Components/ArtworkTopContextBar/RegistrationAuctionTimer"
import { TopContextBar } from "Components/TopContextBar"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import type { ArtworkTopContextBarSaleQuery } from "__generated__/ArtworkTopContextBarSaleQuery.graphql"
import type { ArtworkTopContextBarSale_sale$data } from "__generated__/ArtworkTopContextBarSale_sale.graphql"
import type * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"

interface ArtworkTopContextBarSaleProps {
  sale: ArtworkTopContextBarSale_sale$data
}

export const ArtworkTopContextBarSale: React.FC<
  ArtworkTopContextBarSaleProps
> = ({ sale }) => {
  return (
    <TopContextBar
      href={sale.href}
      src={sale.coverImage?.url}
      rightContent={<RegistrationAuctionTimerFragmentContainer sale={sale} />}
      displayBackArrow
      preferHistoryBack
    >
      <Stack gap={1} flexDirection="row">
        {sale.name}{" "}
        {sale.isBenefit || sale.isGalleryAuction || !sale.isAuction
          ? null
          : `- ${sale.partner?.name}`}{" "}
        <Box as="span" color="black60">
          {sale.isAuction ? "In auction" : "In sale"}
        </Box>
      </Stack>
    </TopContextBar>
  )
}

export const ArtworkTopContextBarSaleFragmentContainer =
  createFragmentContainer(ArtworkTopContextBarSale, {
    sale: graphql`
      fragment ArtworkTopContextBarSale_sale on Sale {
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
    `,
  })

interface ArtworkTopContextBarSaleQueryRendererProps {
  id: string
  children: React.ReactNode
}

export const ArtworkTopContextBarSaleQueryRenderer: React.FC<
  ArtworkTopContextBarSaleQueryRendererProps
> = ({ id, children }) => {
  return (
    <SystemQueryRenderer<ArtworkTopContextBarSaleQuery>
      query={graphql`
        query ArtworkTopContextBarSaleQuery($id: String!) {
          sale(id: $id) {
            ...ArtworkTopContextBarSale_sale
          }
        }
      `}
      variables={{ id }}
      placeholder={<>{children}</>}
      render={({ props, error }) => {
        if (error) {
          console.error(error)
          return <>{children}</>
        }

        if (!props?.sale) {
          return <>{children}</>
        }

        return <ArtworkTopContextBarSaleFragmentContainer sale={props.sale} />
      }}
    />
  )
}

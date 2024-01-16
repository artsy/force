import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { SaleApp_sale$data } from "__generated__/SaleApp_sale.graphql"
import { Box, Separator, Text } from "@artsy/palette"
import { SaleMetaFragmentContainer } from "Apps/Sale/Components/SaleMeta"

export interface SaleAppProps {
  sale: SaleApp_sale$data
}

const SaleApp: React.FC<SaleAppProps> = ({ sale, children }) => {
  const { name } = sale

  return (
    <>
      <SaleMetaFragmentContainer sale={sale} />

      <Text my={2}>Sale name: {name}</Text>

      <Separator />

      <Box my={2}>{children}</Box>
    </>
  )
}

export const SaleAppFragmentContainer = createFragmentContainer(SaleApp, {
  sale: graphql`
    fragment SaleApp_sale on Sale {
      ...SaleMeta_sale

      name
    }
  `,
})

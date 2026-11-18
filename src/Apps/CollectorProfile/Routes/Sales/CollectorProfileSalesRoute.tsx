import { Column, GridColumns, Spacer } from "@artsy/palette"
import { SalesSellerAccount } from "Apps/CollectorProfile/Routes/Sales/Components/SalesSellerAccount"
import { MetaTags } from "Components/MetaTags"

export const CollectorProfileSalesRoute: React.FC = () => {
  return (
    <>
      <MetaTags title="Sales | Artsy" />

      <GridColumns>
        <Column span={[12, 8, 6]}>
          <SalesSellerAccount />
        </Column>
      </GridColumns>

      <Spacer y={4} />
    </>
  )
}

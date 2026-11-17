import { Column, GridColumns, Spacer } from "@artsy/palette"
import { SalesStripeOnboarding } from "Apps/CollectorProfile/Routes/Sales/Components/SalesStripeOnboarding"
import { MetaTags } from "Components/MetaTags"

export const CollectorProfileSalesRoute: React.FC = () => {
  return (
    <>
      <MetaTags title="Sales | Artsy" />

      <GridColumns>
        <Column span={[12, 8, 6]}>
          <SalesStripeOnboarding />
        </Column>
      </GridColumns>

      <Spacer y={4} />
    </>
  )
}

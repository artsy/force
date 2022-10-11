import { MetaTags } from "Components/MetaTags"
import { ConfirmationScreenComponent } from "Components/ConfirmationScreenComponent"

export const PriceEstimateConfirmation = () => {
  return (
    <>
      <MetaTags title="Request a Price Estimate | Artsy" />
      <ConfirmationScreenComponent
        title="Price Estimate Request Sent"
        subtitle="An Artsy Specialist will evaluate your artwork and contact you with a
      free price estimate."
        buttonTitle="Back to My Collection"
        routerLink="/settings/my-collection"
      />
    </>
  )
}

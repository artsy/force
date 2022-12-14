import { Button, Spacer } from "@artsy/palette"
import { RouterLink } from "System/Router/RouterLink"
import { ConfirmationScreenComponent } from "Components/ConfirmationScreenComponent"

export const ConsignmentInquiryConfirmation: React.FC = () => {
  return (
    <>
      <ConfirmationScreenComponent
        title="Your message has been sent"
        subtitle="An Artsy specialist will be in touch to find out more about how we can assist you."
      />
      <Spacer y={4} />

      <RouterLink to="/sell">
        <Button
          width={["100%", "33%"]}
          data-test-id="back-to-sell-with-artsy-button"
          size="large"
          variant="primaryBlack"
        >
          Back to Sell With Artsy
        </Button>
      </RouterLink>
      <Spacer y={6} />
    </>
  )
}

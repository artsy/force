import { Button, Spacer } from "@artsy/palette"
import { ConfirmationScreenComponent } from "Components/ConfirmationScreenComponent"
import { useRouter } from "System/Hooks/useRouter"

export const ConsignmentInquiryConfirmation: React.FC = () => {
  const { router } = useRouter()
  return (
    <>
      <ConfirmationScreenComponent
        title="Your message has been sent"
        subtitle="An Artsy specialist will be in touch to find out more about how we can assist you."
      />
      <Spacer y={4} />

      <Button
        width={["100%", "20%"]}
        data-test-id="back-to-sell-with-artsy-button"
        size="large"
        variant="primaryBlack"
        onClick={() => {
          router.go(-2)
        }}
      >
        Back to Sell With Artsy
      </Button>
      <Spacer y={6} />
    </>
  )
}

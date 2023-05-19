import { ConfirmationScreenComponent } from "Components/ConfirmationScreenComponent"

export const ThankYouWhenFromMyCollection: React.FC = () => {
  return (
    <ConfirmationScreenComponent
      title="Your artwork has been submitted"
      subtitle="We will email you within 3-5 days to confirm if your artwork has been
    accepted or not. In the meantime, you can track the progress of your
    submission in My Collection."
      buttonText="Back to My Collection"
      routerLink={"/collector-profile/my-collection"}
    />
  )
}

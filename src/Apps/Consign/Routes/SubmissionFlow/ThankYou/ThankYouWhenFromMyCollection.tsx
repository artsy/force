import { ConfirmationScreenComponent } from "Components/ConfirmationScreenComponent"

export const ThankYouWhenFromMyCollection: React.FC = () => {
  return (
    <ConfirmationScreenComponent
      title="Your artwork has been submitted"
      subtitle="We will email you within 1-3 days to confirm if your artwork has been
    accepted or not. In the meantime, you can track the progress of your
    submission in My Collection."
      buttonTitle="Back to My Collection"
      routerLink="/settings/my-collection"
    />
  )
}

import { ConfirmationScreenComponent } from "Components/ConfirmationScreenComponent"
import { useFeatureFlag } from "System/useFeatureFlag"

export const ThankYouWhenFromMyCollection: React.FC = () => {
  const isCollectorProfileEnabled = useFeatureFlag("cx-collector-profile")

  return (
    <ConfirmationScreenComponent
      title="Your artwork has been submitted"
      subtitle="We will email you within 1-3 days to confirm if your artwork has been
    accepted or not. In the meantime, you can track the progress of your
    submission in My Collection."
      buttonText="Back to My Collection"
      routerLink={
        isCollectorProfileEnabled
          ? "/collector-profile/my-collection"
          : "/settings/my-collection"
      }
    />
  )
}
